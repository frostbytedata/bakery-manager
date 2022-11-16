import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCostToIngredient1668577332281 implements MigrationInterface {
    name = 'AddCostToIngredient1668577332281'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "cost" numeric NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "cost"`);
    }

}
