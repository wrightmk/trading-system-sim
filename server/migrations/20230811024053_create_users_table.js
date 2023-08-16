exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("username").notNullable().unique();
    table.string("password_hash").notNullable();
    table.decimal("balance", 20, 2).defaultTo(1000);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
