import { MigrationInterface, QueryRunner } from "typeorm";

export class RecipeToIngredientRelation1672978033512 implements MigrationInterface {
    name = 'RecipeToIngredientRelation1672978033512'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "recipe_to_ingredient" ("id" SERIAL NOT NULL, "global" boolean NOT NULL DEFAULT false, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "recipeId" integer NOT NULL, "ingredientId" integer NOT NULL, "quantity" numeric NOT NULL DEFAULT 0, "unitId" integer, CONSTRAINT "PK_a3c7feb2a7ae9147fc9acb9495c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "recipe_to_ingredient" ADD CONSTRAINT "FK_6539736d6a30093de1f7642d68d" FOREIGN KEY ("unitId") REFERENCES "unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_to_ingredient" ADD CONSTRAINT "FK_d50e03f33068964764d494ffae1" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_to_ingredient" ADD CONSTRAINT "FK_4591c4ddff35a3b2f6fe4b4a883" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe_to_ingredient" DROP CONSTRAINT "FK_4591c4ddff35a3b2f6fe4b4a883"`);
        await queryRunner.query(`ALTER TABLE "recipe_to_ingredient" DROP CONSTRAINT "FK_d50e03f33068964764d494ffae1"`);
        await queryRunner.query(`ALTER TABLE "recipe_to_ingredient" DROP CONSTRAINT "FK_6539736d6a30093de1f7642d68d"`);
        await queryRunner.query(`DROP TABLE "recipe_to_ingredient"`);
    }

}
