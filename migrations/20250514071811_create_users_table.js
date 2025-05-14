/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('users', tabel => {
        tabel.increments('id').primary();
        tabel.string('name', 255).notNullable();
        tabel.string('email', 255).notNullable().unique();
        tabel.string('password', 255).notNullable();
        tabel.string('rol', 20);
        tabel.timestamps(true , true);

    })


  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
