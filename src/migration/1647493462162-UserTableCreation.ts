import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTableCreation1647493462162 implements MigrationInterface {
  name = 'UserTableCreation1647493462162';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create user table
    await queryRunner.query(`CREATE TABLE "user"
                             (
                                 "id"        SERIAL            NOT NULL,
                                 "email"     character varying NOT NULL,
                                 "password"  character varying NOT NULL,
                                 "salt"      character varying NOT NULL,
                                 "isActive"  boolean           NOT NULL DEFAULT true,
                                 "deletedAt" TIMESTAMP,
                                 "updatedAt" TIMESTAMP         NOT NULL DEFAULT now(),
                                 "createdAt" TIMESTAMP         NOT NULL DEFAULT now(),
                                 CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
                             )`);
    // Create bootstrap user
    // Login: `parker@hamiltonproperty.group`
    // Password: `password`
    await queryRunner.query(`INSERT INTO public.user (id, email, password, salt)
                             VALUES (DEFAULT, 'parker@hamiltonproperty.group',
                                     '349d9d90ea62556d5df416fb91fac3d7dbc9461163f1e4df13a0f5d31e61e0abf39d8c36965d8498436967d3f89bcce6bb4bfca6e3679a9f62881bc6e18e2b5c',
                                     '23da02753f114cdd5099dc1d16df7a84b07bc28bb5d5ce8998b8e3cf51a05d10')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
