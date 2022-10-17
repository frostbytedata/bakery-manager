import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRoleUserRelation1648529599278 implements MigrationInterface {
  name = 'CreateRoleUserRelation1648529599278';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create table structures
    await queryRunner.query(
      `CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_roles_role" ("userId" integer NOT NULL, "roleId" integer NOT NULL, CONSTRAINT "PK_b47cd6c84ee205ac5a713718292" PRIMARY KEY ("userId", "roleId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5f9286e6c25594c6b88c108db7" ON "user_roles_role" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4be2f7adf862634f5f803d246b" ON "user_roles_role" ("roleId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_5f9286e6c25594c6b88c108db77" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_4be2f7adf862634f5f803d246b8" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    // Create initial roles
    await queryRunner.query(
      `INSERT INTO public.role (id, name, description) VALUES (DEFAULT, 'superadmin', 'super administrators')`,
    );
    await queryRunner.query(
      `INSERT INTO public.role (id, name, description) VALUES (DEFAULT, 'admin', 'administrators')`,
    );
    await queryRunner.query(
      `INSERT INTO public.role (id, name, description) VALUES (DEFAULT, 'owner', 'property owner')`,
    );
    await queryRunner.query(
      `INSERT INTO public.role (id, name, description) VALUES (DEFAULT, 'tenant', 'property tenant')`,
    );
    await queryRunner.query(
      `INSERT INTO public.role (id, name, description) VALUES (DEFAULT, 'guest', 'guest account')`,
    );
    // Setting our bootstrap user to be a super admin
    await queryRunner.query(
      `INSERT INTO public.user_roles_role ("userId", "roleId") VALUES (1, 1)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove initial roles and relations
    await queryRunner.query(
      `DELETE FROM public.user_roles_role WHERE "userId" = 1 AND "roleId" = 1`,
    );
    await queryRunner.query(
      `DELETE FROM public.role WHERE name = 'superadmin'`,
    );
    await queryRunner.query(`DELETE FROM public.role WHERE name = 'admin'`);
    await queryRunner.query(`DELETE FROM public.role WHERE name = 'owner'`);
    await queryRunner.query(`DELETE FROM public.role WHERE name = 'tenant'`);
    await queryRunner.query(`DELETE FROM public.role WHERE name = 'guest'`);
    // Remove table structures
    await queryRunner.query(
      `ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_4be2f7adf862634f5f803d246b8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_5f9286e6c25594c6b88c108db77"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4be2f7adf862634f5f803d246b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5f9286e6c25594c6b88c108db7"`,
    );
    await queryRunner.query(`DROP TABLE "user_roles_role"`);
    await queryRunner.query(`DROP TABLE "role"`);
  }
}
