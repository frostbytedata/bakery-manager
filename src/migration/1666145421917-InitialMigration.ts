import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1666145421917 implements MigrationInterface {
    name = 'InitialMigration1666145421917'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "base_entity" ("id" SERIAL NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_03e6c58047b7a4b3f6de0bfa8d7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "nameable_entity" ("id" SERIAL NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_f0ce7a26daa87b6713ef13f7a21" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "email" character varying NOT NULL, "password" character varying NOT NULL, "salt" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_roles_role" ("userId" integer NOT NULL, "roleId" integer NOT NULL, CONSTRAINT "PK_b47cd6c84ee205ac5a713718292" PRIMARY KEY ("userId", "roleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5f9286e6c25594c6b88c108db7" ON "user_roles_role" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4be2f7adf862634f5f803d246b" ON "user_roles_role" ("roleId") `);
        await queryRunner.query(`ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_5f9286e6c25594c6b88c108db77" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_4be2f7adf862634f5f803d246b8" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);

        // Create bootstrap user
        // Login: `parker@hamiltonproperty.group`
        // Password: `password`
        await queryRunner.query(`INSERT INTO public.user (id, email, password, salt)
                             VALUES (DEFAULT, 'parker@hamiltonproperty.group',
                                     '349d9d90ea62556d5df416fb91fac3d7dbc9461163f1e4df13a0f5d31e61e0abf39d8c36965d8498436967d3f89bcce6bb4bfca6e3679a9f62881bc6e18e2b5c',
                                     '23da02753f114cdd5099dc1d16df7a84b07bc28bb5d5ce8998b8e3cf51a05d10')`);

        // Create initial roles
        await queryRunner.query(`INSERT INTO public.role (id, name, description) VALUES (DEFAULT, 'superadmin', 'super administrators')`);
        await queryRunner.query(`INSERT INTO public.role (id, name, description) VALUES (DEFAULT, 'admin', 'administrators')`);
        await queryRunner.query(`INSERT INTO public.role (id, name, description) VALUES (DEFAULT, 'guest', 'guest account')`);

        // Setting our bootstrap user to be a super admin
        await queryRunner.query(
          `INSERT INTO public.user_roles_role ("userId", "roleId") VALUES (1, 1)`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove initial roles and relations
        await queryRunner.query(`DELETE FROM public.user_roles_role WHERE "userId" = 1 AND "roleId" = 1`);
        await queryRunner.query(`DELETE FROM public.role WHERE name = 'superadmin'`);
        await queryRunner.query(`DELETE FROM public.role WHERE name = 'admin'`);
        await queryRunner.query(`DELETE FROM public.role WHERE name = 'guest'`);

        await queryRunner.query(`ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_4be2f7adf862634f5f803d246b8"`);
        await queryRunner.query(`ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_5f9286e6c25594c6b88c108db77"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4be2f7adf862634f5f803d246b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5f9286e6c25594c6b88c108db7"`);
        await queryRunner.query(`DROP TABLE "user_roles_role"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "nameable_entity"`);
        await queryRunner.query(`DROP TABLE "base_entity"`);
    }

}
