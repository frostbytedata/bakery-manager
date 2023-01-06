import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRecipesEntity1668668086501 implements MigrationInterface {
  name = 'AddRecipesEntity1668668086501'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "recipe" ("id" SERIAL NOT NULL, "global" boolean NOT NULL DEFAULT false, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" character varying, "userId" integer, "retailPrice" numeric NOT NULL DEFAULT 0, "wholesalePrice" numeric NOT NULL DEFAULT 0, CONSTRAINT "PK_e365a2fedf57238d970e07825ca" PRIMARY KEY ("id"))`);
    await queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "FK_fe30fdc515f6c94d39cd4bbfa76" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "FK_fe30fdc515f6c94d39cd4bbfa76"`);
    await queryRunner.query(`DROP TABLE "recipe"`);
  }
}
