exports.up = async function(knex) {
  // * Create first table Zoos and make it async

  await knex.schema.createTable("zoos", table => {
    // Table column names
    table.increments("id"); // auto increment the ID Primary KEY
    table.string("name").notNullable();
    table.string("address").notNullable();
  });

  await knex.schema.createTable("species", table => {
    table.increments("id"); // Primary Key for Species
    table.string("name").notNullable();
  });

  // ! We create animals after species so that the foreign key will exists.
  // ! Otherwise if we do this table first(before species), we are creating a foreign key for a table that does not exists yet.
  await knex.schema.createTable("animals", table => {
    table.increments("id"); // Primary Key for Species
    table.string("name").notNullable();

    // Creating Foreign Key Make data type the same as primary key, we know this is integer.
    table
      .integer("species_id")
      .notNullable()
      // This defines what the foreign key is LINKED to (.references (species id primary key)) and which column (inTable)
      .references("id")
      .inTable("species")

      // * Allows foreign keys to be deleted. ("CASCADE") Delete any rows that reference the deleted rows. And onUpdate, will update changes in all the tables that are related.
      // ! However we are not finished, this will error, you need to add this also to the Join table, because it references the animal as well. So cover all tables referencing the foreign keys.
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });

  // * This is our Join table (Covention to name it the two tables its joining?)
  await knex.schema.createTable("zoos_animals", table => {
    table

      // Create our foreign key
      .integer("zoo_id")
      .notNullable()
      // Where the foreign key is referencing (the Id in table Zoos)
      .references("id")
      .inTable("zoos")
      // * Dont forget here as well since it references foreign key
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      // Same as above creating foreign key to link to animals table
      .integer("animal_id")
      .notNullable()
      .references("id")
      .inTable("animals")
      // * And here Dont forget here as well since it references foreign key
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    // dates of when the animal was at the zoo
    table.date("from");
    table.date("to");
    // create a primary key as a combination of columns
    // ! Here is where we create primary key for this table. We give it an array, and combine two foerign keys.
    table.primary(["zoo_id", "animal_id"]);
  });
};

// * Drop tables in reverse order of creation.
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("zoos_animals");
  await knex.schema.dropTableIfExists("animals");
  await knex.schema.dropTableIfExists("species");
  await knex.schema.dropTableIfExists("zoos");
};
