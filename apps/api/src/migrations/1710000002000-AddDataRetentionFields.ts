import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddDataRetentionFields1710000002000 implements MigrationInterface {
  name = 'AddDataRetentionFields1710000002000'

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add retention fields to users table
    await queryRunner.query(`
      ALTER TABLE "users" 
      ADD COLUMN "lastLoginAt" TIMESTAMP,
      ADD COLUMN "dataRetentionExpiresAt" TIMESTAMP,
      ADD COLUMN "isMarkedForDeletion" BOOLEAN NOT NULL DEFAULT false,
      ADD COLUMN "markedForDeletionAt" TIMESTAMP
    `)

    // Add retention fields to strava_accounts table
    await queryRunner.query(`
      ALTER TABLE "strava_accounts" 
      ADD COLUMN "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
      ADD COLUMN "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
      ADD COLUMN "lastSyncAt" TIMESTAMP,
      ADD COLUMN "dataRetentionExpiresAt" TIMESTAMP,
      ADD COLUMN "isMarkedForDeletion" BOOLEAN NOT NULL DEFAULT false,
      ADD COLUMN "markedForDeletionAt" TIMESTAMP
    `)

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
