exports.up = function (knex) {
  return knex.schema.createTable("transactions", (table) => {
    table.increments("id").primary();
    table
      .integer("sender_id")
      .references("id")
      .inTable("users")
      .notNullable()
      .onDelete("CASCADE");
    table
      .integer("receiver_id")
      .references("id")
      .inTable("users")
      .notNullable()
      .onDelete("CASCADE");
    table.decimal("amount", 20, 2).notNullable();
    table.timestamp("timestamp").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("transactions");
};
