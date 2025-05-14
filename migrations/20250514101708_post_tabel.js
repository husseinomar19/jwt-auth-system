/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('posts', table => {
    table.increments('id').primary();
    table.string('title');
    table.text('description');
    table.string('image');  // Hier kan een URL of bestandsnaam voor de afbeelding worden opgeslagen
    table.integer('user_id').unsigned().references('id').inTable('users');  // Link naar de gebruiker die de post maakte
    table.timestamps(true, true);  // created_at en updated_at
  });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
