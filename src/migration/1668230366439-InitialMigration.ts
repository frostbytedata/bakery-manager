import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1668230366439 implements MigrationInterface {
    name = 'InitialMigration1668230366439'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."unit_type_enum" AS ENUM('volume', 'weight')`);
        await queryRunner.query(`CREATE TABLE "unit" ("id" SERIAL NOT NULL, "global" boolean NOT NULL DEFAULT false, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" character varying, "type" "public"."unit_type_enum" NOT NULL DEFAULT 'volume', "abbr" character varying NOT NULL, CONSTRAINT "PK_4252c4be609041e559f0c80f58a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "global" boolean NOT NULL DEFAULT false, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "global" boolean NOT NULL DEFAULT false, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "email" character varying NOT NULL, "password" character varying NOT NULL, "salt" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ingredient" ("id" SERIAL NOT NULL, "global" boolean NOT NULL DEFAULT false, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" character varying, "userId" integer, "defaultUnitId" integer, CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "conversion" ("id" SERIAL NOT NULL, "global" boolean NOT NULL DEFAULT false, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer, "rate" integer NOT NULL, "ingredientId" integer, CONSTRAINT "PK_47d350fae88ddb04db6de706bc8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_roles_role" ("userId" integer NOT NULL, "roleId" integer NOT NULL, CONSTRAINT "PK_b47cd6c84ee205ac5a713718292" PRIMARY KEY ("userId", "roleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5f9286e6c25594c6b88c108db7" ON "user_roles_role" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4be2f7adf862634f5f803d246b" ON "user_roles_role" ("roleId") `);
        await queryRunner.query(`CREATE TABLE "conversion_unit1_unit" ("conversionId" integer NOT NULL, "unitId" integer NOT NULL, CONSTRAINT "PK_05ce7ace2084f6e44483d90368d" PRIMARY KEY ("conversionId", "unitId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1cdb764c75ef0ab11ccabbf756" ON "conversion_unit1_unit" ("conversionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d8b939633badd32e278bc1763e" ON "conversion_unit1_unit" ("unitId") `);
        await queryRunner.query(`CREATE TABLE "conversion_unit2_unit" ("conversionId" integer NOT NULL, "unitId" integer NOT NULL, CONSTRAINT "PK_a94912dd9075d01abfc11ec881e" PRIMARY KEY ("conversionId", "unitId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2888db831a3dcafbe01f6e7cdd" ON "conversion_unit2_unit" ("conversionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_51c87b6385fa3650f35cc1a13d" ON "conversion_unit2_unit" ("unitId") `);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD CONSTRAINT "FK_d621784b59b05016938180fb3bb" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD CONSTRAINT "FK_11a0f49f7c7b2153e122a306609" FOREIGN KEY ("defaultUnitId") REFERENCES "unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "conversion" ADD CONSTRAINT "FK_2d7bfe2757cf9e1640b2c123143" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "conversion" ADD CONSTRAINT "FK_be00820b90081a2788a27563586" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_5f9286e6c25594c6b88c108db77" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_4be2f7adf862634f5f803d246b8" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "conversion_unit1_unit" ADD CONSTRAINT "FK_1cdb764c75ef0ab11ccabbf7562" FOREIGN KEY ("conversionId") REFERENCES "conversion"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "conversion_unit1_unit" ADD CONSTRAINT "FK_d8b939633badd32e278bc1763e3" FOREIGN KEY ("unitId") REFERENCES "unit"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "conversion_unit2_unit" ADD CONSTRAINT "FK_2888db831a3dcafbe01f6e7cddb" FOREIGN KEY ("conversionId") REFERENCES "conversion"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "conversion_unit2_unit" ADD CONSTRAINT "FK_51c87b6385fa3650f35cc1a13d4" FOREIGN KEY ("unitId") REFERENCES "unit"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop table constraints so we can delete seed data
        await queryRunner.query(`ALTER TABLE "conversion_unit2_unit" DROP CONSTRAINT "FK_51c87b6385fa3650f35cc1a13d4"`);
        await queryRunner.query(`ALTER TABLE "conversion_unit2_unit" DROP CONSTRAINT "FK_2888db831a3dcafbe01f6e7cddb"`);
        await queryRunner.query(`ALTER TABLE "conversion_unit1_unit" DROP CONSTRAINT "FK_d8b939633badd32e278bc1763e3"`);
        await queryRunner.query(`ALTER TABLE "conversion_unit1_unit" DROP CONSTRAINT "FK_1cdb764c75ef0ab11ccabbf7562"`);
        await queryRunner.query(`ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_4be2f7adf862634f5f803d246b8"`);
        await queryRunner.query(`ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_5f9286e6c25594c6b88c108db77"`);
        await queryRunner.query(`ALTER TABLE "conversion" DROP CONSTRAINT "FK_be00820b90081a2788a27563586"`);
        await queryRunner.query(`ALTER TABLE "conversion" DROP CONSTRAINT "FK_2d7bfe2757cf9e1640b2c123143"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP CONSTRAINT "FK_11a0f49f7c7b2153e122a306609"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP CONSTRAINT "FK_d621784b59b05016938180fb3bb"`);
        // Drop indexes and tables
        await queryRunner.query(`DROP INDEX "public"."IDX_51c87b6385fa3650f35cc1a13d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2888db831a3dcafbe01f6e7cdd"`);
        await queryRunner.query(`DROP TABLE "conversion_unit2_unit"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d8b939633badd32e278bc1763e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1cdb764c75ef0ab11ccabbf756"`);
        await queryRunner.query(`DROP TABLE "conversion_unit1_unit"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4be2f7adf862634f5f803d246b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5f9286e6c25594c6b88c108db7"`);
        await queryRunner.query(`DROP TABLE "user_roles_role"`);
        await queryRunner.query(`DROP TABLE "conversion"`);
        await queryRunner.query(`DROP TABLE "ingredient"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "unit"`);
        await queryRunner.query(`DROP TYPE "public"."unit_type_enum" AS ENUM('volume', 'weight')`);
    }

}
