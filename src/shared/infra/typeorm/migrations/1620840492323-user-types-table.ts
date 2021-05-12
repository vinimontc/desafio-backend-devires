import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class userTypesTable1620840492323 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user_types",
        columns: [
          {
            name: "id",
            type: "integer",
            generationStrategy: "increment",
            isPrimary: true,
          },
          {
            name: "title",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user_types");
  }
}
