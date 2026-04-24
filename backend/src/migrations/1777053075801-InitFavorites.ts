import { MigrationInterface, QueryRunner } from "typeorm";

export class InitFavorites1777053075801 implements MigrationInterface {
    name = 'InitFavorites1777053075801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "favorite_events" ("id" SERIAL NOT NULL, "type" character varying(100) NOT NULL, "payload" jsonb NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_69c04f4b78928ea324644fe269b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bdc0fb10c705c49790e570bb8c" ON "favorite_events" ("type") `);
        await queryRunner.query(`CREATE INDEX "IDX_cad4f86f0dd4b481d522540678" ON "favorite_events" ("created_at") `);
        await queryRunner.query(`CREATE TABLE "favorites" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "url" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_939c23a5e656ea58619c04d323" ON "favorites" ("created_at") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_939c23a5e656ea58619c04d323"`);
        await queryRunner.query(`DROP TABLE "favorites"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cad4f86f0dd4b481d522540678"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bdc0fb10c705c49790e570bb8c"`);
        await queryRunner.query(`DROP TABLE "favorite_events"`);
    }

}
