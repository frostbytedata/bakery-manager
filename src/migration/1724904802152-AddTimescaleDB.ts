import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTimescaleDB1724904802152 implements MigrationInterface {
    name = 'AddTimescaleDB1724904802152'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION timescaledb CASCADE;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP EXTENSION timescaledb CASCADE;`);
    }

}
