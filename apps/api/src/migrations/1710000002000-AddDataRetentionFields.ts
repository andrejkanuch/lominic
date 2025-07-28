import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddDataRetentionFields1710000002000 implements MigrationInterface {
  name = 'AddDataRetentionFields1710000002000'

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add retention fields to users table (check if columns exist first)
    const userTable = await queryRunner.getTable('users')
    const userColumns = userTable.columns.map(col => col.name)

    if (!userColumns.includes('lastLoginAt')) {
      await queryRunner.query(
        `ALTER TABLE "users" ADD COLUMN "lastLoginAt" TIMESTAMP`
      )
    }
    if (!userColumns.includes('dataRetentionExpiresAt')) {
      await queryRunner.query(
        `ALTER TABLE "users" ADD COLUMN "dataRetentionExpiresAt" TIMESTAMP`
      )
    }
    if (!userColumns.includes('isMarkedForDeletion')) {
      await queryRunner.query(
        `ALTER TABLE "users" ADD COLUMN "isMarkedForDeletion" BOOLEAN NOT NULL DEFAULT false`
      )
    }
    if (!userColumns.includes('markedForDeletionAt')) {
      await queryRunner.query(
        `ALTER TABLE "users" ADD COLUMN "markedForDeletionAt" TIMESTAMP`
      )
    }

    // Add retention fields to strava_accounts table (check if columns exist first)
    const stravaTable = await queryRunner.getTable('strava_accounts')
    const stravaColumns = stravaTable.columns.map(col => col.name)

    if (!stravaColumns.includes('createdAt')) {
      await queryRunner.query(
        `ALTER TABLE "strava_accounts" ADD COLUMN "createdAt" TIMESTAMP NOT NULL DEFAULT now()`
      )
    }
    if (!stravaColumns.includes('updatedAt')) {
      await queryRunner.query(
        `ALTER TABLE "strava_accounts" ADD COLUMN "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`
      )
    }
    if (!stravaColumns.includes('lastSyncAt')) {
      await queryRunner.query(
        `ALTER TABLE "strava_accounts" ADD COLUMN "lastSyncAt" TIMESTAMP`
      )
    }
    if (!stravaColumns.includes('dataRetentionExpiresAt')) {
      await queryRunner.query(
        `ALTER TABLE "strava_accounts" ADD COLUMN "dataRetentionExpiresAt" TIMESTAMP`
      )
    }
    if (!stravaColumns.includes('isMarkedForDeletion')) {
      await queryRunner.query(
        `ALTER TABLE "strava_accounts" ADD COLUMN "isMarkedForDeletion" BOOLEAN NOT NULL DEFAULT false`
      )
    }
    if (!stravaColumns.includes('markedForDeletionAt')) {
      await queryRunner.query(
        `ALTER TABLE "strava_accounts" ADD COLUMN "markedForDeletionAt" TIMESTAMP`
      )
    }

    // Create indexes for better performance on retention queries
    await queryRunner.query(`
      CREATE INDEX "IDX_users_lastLoginAt" ON "users" ("lastLoginAt")
    `)

    await queryRunner.query(`
      CREATE INDEX "IDX_users_isMarkedForDeletion" ON "users" ("isMarkedForDeletion")
    `)

    await queryRunner.query(`
      CREATE INDEX "IDX_users_markedForDeletionAt" ON "users" ("markedForDeletionAt")
    `)

    await queryRunner.query(`
      CREATE INDEX "IDX_strava_accounts_lastSyncAt" ON "strava_accounts" ("lastSyncAt")
    `)

    await queryRunner.query(`
      CREATE INDEX "IDX_strava_accounts_isMarkedForDeletion" ON "strava_accounts" ("isMarkedForDeletion")
    `)

    await queryRunner.query(`
      CREATE INDEX "IDX_strava_accounts_markedForDeletionAt" ON "strava_accounts" ("markedForDeletionAt")
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop indexes
    await queryRunner.query(
      `DROP INDEX "IDX_strava_accounts_markedForDeletionAt"`
    )
    await queryRunner.query(
      `DROP INDEX "IDX_strava_accounts_isMarkedForDeletion"`
    )
    await queryRunner.query(`DROP INDEX "IDX_strava_accounts_lastSyncAt"`)
    await queryRunner.query(`DROP INDEX "IDX_users_markedForDeletionAt"`)
    await queryRunner.query(`DROP INDEX "IDX_users_isMarkedForDeletion"`)
    await queryRunner.query(`DROP INDEX "IDX_users_lastLoginAt"`)

    // Remove retention fields from strava_accounts table
    await queryRunner.query(`
      ALTER TABLE "strava_accounts" 
      DROP COLUMN "markedForDeletionAt",
      DROP COLUMN "isMarkedForDeletion",
      DROP COLUMN "dataRetentionExpiresAt",
      DROP COLUMN "lastSyncAt",
      DROP COLUMN "updatedAt",
      DROP COLUMN "createdAt"
    `)

    // Remove retention fields from users table
    await queryRunner.query(`
      ALTER TABLE "users" 
      DROP COLUMN "markedForDeletionAt",
      DROP COLUMN "isMarkedForDeletion",
      DROP COLUMN "dataRetentionExpiresAt",
      DROP COLUMN "lastLoginAt"
    `)
  }
}
