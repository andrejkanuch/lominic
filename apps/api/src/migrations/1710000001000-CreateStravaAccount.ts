import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStravaAccount1710000001000 implements MigrationInterface {
  name = "CreateStravaAccount1710000001000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "strava_accounts" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "userId" uuid NOT NULL,
        "accessToken" character varying NOT NULL,
        "refreshToken" character varying NOT NULL,
        "expiresAt" integer NOT NULL,
        "athleteId" integer NOT NULL,
        CONSTRAINT "PK_strava_accounts_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_strava_accounts_userId" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "strava_accounts"`);
  }
}
