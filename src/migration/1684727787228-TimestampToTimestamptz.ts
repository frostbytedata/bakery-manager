import { MigrationInterface, QueryRunner } from "typeorm";

export class GenericMigration1684727787228 implements MigrationInterface {
    name = 'GenericMigration1684727787228'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`SET timezone = 'UTC'`);
        await queryRunner.query(`ALTER TABLE "unit" ALTER "updatedAt" TYPE timestamptz`);
        await queryRunner.query(`ALTER TABLE "unit" ALTER "createdAt" TYPE timestamptz`);
        await queryRunner.query(`ALTER TABLE "unit" ALTER "deletedAt" TYPE timestamptz`);
        await queryRunner.query(`ALTER TABLE "role" ALTER "updatedAt" TYPE timestamptz`);
        await queryRunner.query(`ALTER TABLE "role" ALTER "createdAt" TYPE timestamptz`);
        await queryRunner.query(`ALTER TABLE "role" ALTER "deletedAt" TYPE timestamptz`);
        await queryRunner.query(`ALTER TABLE "user" ALTER "updatedAt" TYPE timestamptz`);
        await queryRunner.query(`ALTER TABLE "user" ALTER "createdAt" TYPE timestamptz`);
        await queryRunner.query(`ALTER TABLE "user" ALTER "deletedAt" TYPE timestamptz`);
        await queryRunner.query(`ALTER TABLE "recipe" ALTER "updatedAt" TYPE timestamptz`);
        await queryRunner.query(`ALTER TABLE "recipe" ALTER "createdAt" TYPE timestamptz`);
        await queryRunner.query(`ALTER TABLE "recipe" ALTER "deletedAt" TYPE timestamptz`);
        await queryRunner.query(`ALTER TABLE "recipe_to_ingredient" ALTER "updatedAt" TYPE timestamptz`);
        await queryRunner.query(`ALTER TABLE "recipe_to_ingredient" ALTER "createdAt" TYPE timestamptz`);
        await queryRunner.query(`ALTER TABLE "recipe_to_ingredient" ALTER "deletedAt" TYPE timestamptz`);
        await queryRunner.query(`ALTER TABLE "ingredient" ALTER "updatedAt" TYPE timestamptz`);
        await queryRunner.query(`ALTER TABLE "ingredient" ALTER "createdAt" TYPE timestamptz`);
        await queryRunner.query(`ALTER TABLE "ingredient" ALTER "deletedAt" TYPE timestamptz`);
        await queryRunner.query(`ALTER TABLE "conversion" ALTER "updatedAt" TYPE timestamptz`);
        await queryRunner.query(`ALTER TABLE "conversion" ALTER "createdAt" TYPE timestamptz`);
        await queryRunner.query(`ALTER TABLE "conversion" ALTER "deletedAt" TYPE timestamptz`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`SET timezone = 'UTC'`);
      await queryRunner.query(`ALTER TABLE "unit" ALTER "updatedAt" TYPE timestamp`);
      await queryRunner.query(`ALTER TABLE "unit" ALTER "createdAt" TYPE timestamp`);
      await queryRunner.query(`ALTER TABLE "unit" ALTER "deletedAt" TYPE timestamp`);
      await queryRunner.query(`ALTER TABLE "role" ALTER "updatedAt" TYPE timestamp`);
      await queryRunner.query(`ALTER TABLE "role" ALTER "createdAt" TYPE timestamp`);
      await queryRunner.query(`ALTER TABLE "role" ALTER "deletedAt" TYPE timestamp`);
      await queryRunner.query(`ALTER TABLE "user" ALTER "updatedAt" TYPE timestamp`);
      await queryRunner.query(`ALTER TABLE "user" ALTER "createdAt" TYPE timestamp`);
      await queryRunner.query(`ALTER TABLE "user" ALTER "deletedAt" TYPE timestamp`);
      await queryRunner.query(`ALTER TABLE "recipe" ALTER "updatedAt" TYPE timestamp`);
      await queryRunner.query(`ALTER TABLE "recipe" ALTER "createdAt" TYPE timestamp`);
      await queryRunner.query(`ALTER TABLE "recipe" ALTER "deletedAt" TYPE timestamp`);
      await queryRunner.query(`ALTER TABLE "recipe_to_ingredient" ALTER "updatedAt" TYPE timestamp`);
      await queryRunner.query(`ALTER TABLE "recipe_to_ingredient" ALTER "createdAt" TYPE timestamp`);
      await queryRunner.query(`ALTER TABLE "recipe_to_ingredient" ALTER "deletedAt" TYPE timestamp`);
      await queryRunner.query(`ALTER TABLE "ingredient" ALTER "updatedAt" TYPE timestamp`);
      await queryRunner.query(`ALTER TABLE "ingredient" ALTER "createdAt" TYPE timestamp`);
      await queryRunner.query(`ALTER TABLE "ingredient" ALTER "deletedAt" TYPE timestamp`);
      await queryRunner.query(`ALTER TABLE "conversion" ALTER "updatedAt" TYPE timestamp`);
      await queryRunner.query(`ALTER TABLE "conversion" ALTER "createdAt" TYPE timestamp`);
      await queryRunner.query(`ALTER TABLE "conversion" ALTER "deletedAt" TYPE timestamp`);
    }

}
