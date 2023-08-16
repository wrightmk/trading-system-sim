import knex from "../../utils/db";

export default async function globalTeardown() {
  try {
    await knex.migrate.rollback();
    await knex.destroy();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
