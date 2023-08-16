import knex from "../../utils/db";

export default async function globalSetup() {
  try {
    await knex.migrate.latest();
  } catch (error: any) {
    throw new Error(error);
  }
}
