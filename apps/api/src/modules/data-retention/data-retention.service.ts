import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, LessThan } from 'typeorm'
import { User } from '../../entities/user.entity'
import { StravaAccount } from '../../entities/strava-account.entity'
import { Cron, CronExpression } from '@nestjs/schedule'

export interface RetentionPolicy {
  inactiveUserDays: number
  unverifiedUserDays: number
  stravaAccountInactiveDays: number
  softDeleteGracePeriodDays: number
  hardDeleteGracePeriodDays: number
}

@Injectable()
export class DataRetentionService {
  private readonly logger = new Logger(DataRetentionService.name)
  private readonly defaultRetentionPolicy: RetentionPolicy = {
    inactiveUserDays: 365, // 1 year
    unverifiedUserDays: 30, // 30 days
    stravaAccountInactiveDays: 180, // 6 months
    softDeleteGracePeriodDays: 30, // 30 days grace period
    hardDeleteGracePeriodDays: 90, // 90 days before permanent deletion
  }

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(StravaAccount)
    private stravaAccountsRepository: Repository<StravaAccount>
  ) {}

  /**
   * Get retention policy from environment or use defaults
   */
  private getRetentionPolicy(): RetentionPolicy {
    return {
      inactiveUserDays: parseInt(
        process.env.DATA_RETENTION_INACTIVE_USER_DAYS || '365'
      ),
      unverifiedUserDays: parseInt(
        process.env.DATA_RETENTION_UNVERIFIED_USER_DAYS || '30'
      ),
      stravaAccountInactiveDays: parseInt(
        process.env.DATA_RETENTION_STRAVA_INACTIVE_DAYS || '180'
      ),
      softDeleteGracePeriodDays: parseInt(
        process.env.DATA_RETENTION_SOFT_DELETE_GRACE_DAYS || '30'
      ),
      hardDeleteGracePeriodDays: parseInt(
        process.env.DATA_RETENTION_HARD_DELETE_GRACE_DAYS || '90'
      ),
    }
  }

  /**
   * Mark inactive users for deletion
   */
  async markInactiveUsersForDeletion(): Promise<number> {
    const policy = this.getRetentionPolicy()
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - policy.inactiveUserDays)

    const result = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.lastLoginAt < :cutoffDate', { cutoffDate })
      .andWhere('user.isMarkedForDeletion = :isMarked', { isMarked: false })
      .andWhere('user.role != :adminRole', { adminRole: 'SUPER_ADMIN' })
      .update(User)
      .set({
        isMarkedForDeletion: true,
        markedForDeletionAt: new Date(),
        dataRetentionExpiresAt: new Date(
          Date.now() + policy.softDeleteGracePeriodDays * 24 * 60 * 60 * 1000
        ),
      })
      .execute()

    this.logger.log(`Marked ${result.affected} inactive users for deletion`)
    return result.affected || 0
  }

  /**
   * Mark unverified users for deletion
   */
  async markUnverifiedUsersForDeletion(): Promise<number> {
    const policy = this.getRetentionPolicy()
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - policy.unverifiedUserDays)

    const result = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.isEmailVerified = :verified', { verified: false })
      .andWhere('user.createdAt < :cutoffDate', { cutoffDate })
      .andWhere('user.isMarkedForDeletion = :isMarked', { isMarked: false })
      .update(User)
      .set({
        isMarkedForDeletion: true,
        markedForDeletionAt: new Date(),
        dataRetentionExpiresAt: new Date(
          Date.now() + policy.softDeleteGracePeriodDays * 24 * 60 * 60 * 1000
        ),
      })
      .execute()

    this.logger.log(`Marked ${result.affected} unverified users for deletion`)
    return result.affected || 0
  }

  /**
   * Mark inactive Strava accounts for deletion
   */
  async markInactiveStravaAccountsForDeletion(): Promise<number> {
    const policy = this.getRetentionPolicy()
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - policy.stravaAccountInactiveDays)

    const result = await this.stravaAccountsRepository
      .createQueryBuilder('account')
      .where('account.lastSyncAt < :cutoffDate', { cutoffDate })
      .andWhere('account.isMarkedForDeletion = :isMarked', { isMarked: false })
      .update(StravaAccount)
      .set({
        isMarkedForDeletion: true,
        markedForDeletionAt: new Date(),
        dataRetentionExpiresAt: new Date(
          Date.now() + policy.softDeleteGracePeriodDays * 24 * 60 * 60 * 1000
        ),
      })
      .execute()

    this.logger.log(
      `Marked ${result.affected} inactive Strava accounts for deletion`
    )
    return result.affected || 0
  }

  /**
   * Permanently delete users that have exceeded the grace period
   */
  async permanentlyDeleteUsers(): Promise<number> {
    const policy = this.getRetentionPolicy()
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - policy.hardDeleteGracePeriodDays)

    const usersToDelete = await this.usersRepository.find({
      where: {
        isMarkedForDeletion: true,
        markedForDeletionAt: LessThan(cutoffDate),
      },
    })

    let deletedCount = 0
    for (const user of usersToDelete) {
      try {
        await this.usersRepository.remove(user)
        deletedCount++
        this.logger.log(`Permanently deleted user: ${user.email}`)
      } catch (error) {
        this.logger.error(`Failed to delete user ${user.email}:`, error)
      }
    }

    this.logger.log(`Permanently deleted ${deletedCount} users`)
    return deletedCount
  }

  /**
   * Permanently delete Strava accounts that have exceeded the grace period
   */
  async permanentlyDeleteStravaAccounts(): Promise<number> {
    const policy = this.getRetentionPolicy()
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - policy.hardDeleteGracePeriodDays)

    const accountsToDelete = await this.stravaAccountsRepository.find({
      where: {
        isMarkedForDeletion: true,
        markedForDeletionAt: LessThan(cutoffDate),
      },
    })

    let deletedCount = 0
    for (const account of accountsToDelete) {
      try {
        await this.stravaAccountsRepository.remove(account)
        deletedCount++
        this.logger.log(
          `Permanently deleted Strava account: ${account.athleteId}`
        )
      } catch (error) {
        this.logger.error(
          `Failed to delete Strava account ${account.athleteId}:`,
          error
        )
      }
    }

    this.logger.log(`Permanently deleted ${deletedCount} Strava accounts`)
    return deletedCount
  }

  /**
   * Update user's last login timestamp
   */
  async updateUserLastLogin(userId: string): Promise<void> {
    await this.usersRepository.update(userId, {
      lastLoginAt: new Date(),
      isMarkedForDeletion: false,
      markedForDeletionAt: null,
      dataRetentionExpiresAt: null,
    })
  }

  /**
   * Update Strava account's last sync timestamp
   */
  async updateStravaAccountLastSync(accountId: string): Promise<void> {
    await this.stravaAccountsRepository.update(accountId, {
      lastSyncAt: new Date(),
      isMarkedForDeletion: false,
      markedForDeletionAt: null,
      dataRetentionExpiresAt: null,
    })
  }

  /**
   * Get retention statistics
   */
  async getRetentionStats() {
    const policy = this.getRetentionPolicy()
    const now = new Date()

    const inactiveUserCutoff = new Date(
      now.getTime() - policy.inactiveUserDays * 24 * 60 * 60 * 1000
    )
    const unverifiedUserCutoff = new Date(
      now.getTime() - policy.unverifiedUserDays * 24 * 60 * 60 * 1000
    )
    const stravaInactiveCutoff = new Date(
      now.getTime() - policy.stravaAccountInactiveDays * 24 * 60 * 60 * 1000
    )

    const [
      totalUsers,
      inactiveUsers,
      unverifiedUsers,
      markedForDeletionUsers,
      totalStravaAccounts,
      inactiveStravaAccounts,
      markedForDeletionStravaAccounts,
    ] = await Promise.all([
      this.usersRepository.count(),
      this.usersRepository.count({
        where: { lastLoginAt: LessThan(inactiveUserCutoff) },
      }),
      this.usersRepository.count({
        where: {
          isEmailVerified: false,
          createdAt: LessThan(unverifiedUserCutoff),
        },
      }),
      this.usersRepository.count({ where: { isMarkedForDeletion: true } }),
      this.stravaAccountsRepository.count(),
      this.stravaAccountsRepository.count({
        where: { lastSyncAt: LessThan(stravaInactiveCutoff) },
      }),
      this.stravaAccountsRepository.count({
        where: { isMarkedForDeletion: true },
      }),
    ])

    return {
      totalUsers,
      inactiveUsers,
      unverifiedUsers,
      markedForDeletionUsers,
      totalStravaAccounts,
      inactiveStravaAccounts,
      markedForDeletionStravaAccounts,
      retentionPolicy: policy,
    }
  }

  /**
   * Manual cleanup - can be called via admin endpoint
   */
  async performManualCleanup(): Promise<{
    markedUsers: number
    markedStravaAccounts: number
    deletedUsers: number
    deletedStravaAccounts: number
  }> {
    this.logger.log('Starting manual data retention cleanup...')

    const markedUsers = await this.markInactiveUsersForDeletion()
    const markedUnverifiedUsers = await this.markUnverifiedUsersForDeletion()
    const markedStravaAccounts =
      await this.markInactiveStravaAccountsForDeletion()
    const deletedUsers = await this.permanentlyDeleteUsers()
    const deletedStravaAccounts = await this.permanentlyDeleteStravaAccounts()

    this.logger.log('Manual data retention cleanup completed')

    return {
      markedUsers: markedUsers + markedUnverifiedUsers,
      markedStravaAccounts,
      deletedUsers,
      deletedStravaAccounts,
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  async performScheduledCleanup(): Promise<void> {
    this.logger.log('Starting scheduled data retention cleanup...')

    try {
      await this.performManualCleanup()
      this.logger.log('Scheduled data retention cleanup completed successfully')
    } catch (error) {
      this.logger.error('Scheduled data retention cleanup failed:', error)
    }
  }

  /**
   * Restore user from deletion (admin function)
   */
  async restoreUserFromDeletion(userId: string): Promise<void> {
    await this.usersRepository.update(userId, {
      isMarkedForDeletion: false,
      markedForDeletionAt: null,
      dataRetentionExpiresAt: null,
    })
    this.logger.log(`Restored user ${userId} from deletion`)
  }

  /**
   * Restore Strava account from deletion (admin function)
   */
  async restoreStravaAccountFromDeletion(accountId: string): Promise<void> {
    await this.stravaAccountsRepository.update(accountId, {
      isMarkedForDeletion: false,
      markedForDeletionAt: null,
      dataRetentionExpiresAt: null,
    })
    this.logger.log(`Restored Strava account ${accountId} from deletion`)
  }
}
