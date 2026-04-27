import { MigrationInterface, QueryRunner } from "typeorm";

export class InitFavorites1777249599459 implements MigrationInterface {
    name = 'InitFavorites1777249599459'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorites" ADD "isFavorite" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorites" DROP COLUMN "isFavorite"`);
    }

}
