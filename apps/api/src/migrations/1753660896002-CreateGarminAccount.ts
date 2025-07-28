import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGarminAccount1753660896002 implements MigrationInterface {
    name = 'CreateGarminAccount1753660896002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "garmin_accounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "accessToken" character varying NOT NULL, "refreshToken" character varying NOT NULL, "expiresAt" TIMESTAMP NOT NULL, "refreshTokenExpiresAt" TIMESTAMP NOT NULL, "scope" json NOT NULL, "garminUserId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "lastSyncAt" TIMESTAMP, "dataRetentionExpiresAt" TIMESTAMP, "isMarkedForDeletion" boolean NOT NULL DEFAULT false, "markedForDeletionAt" TIMESTAMP, CONSTRAINT "PK_71074439141c5a12f5ab3563dc1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "garmin_accounts" ADD CONSTRAINT "FK_9b052c5e3ed568c709e6f5ef222" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "garmin_accounts" DROP CONSTRAINT "FK_9b052c5e3ed568c709e6f5ef222"`);
        await queryRunner.query(`DROP TABLE "garmin_accounts"`);
    }

}
