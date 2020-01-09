exports.seed = async knex => {
  // * Before we used /  await knex("zoos").truncate()
  // ! We cant do truncate before we seed because it has to be done in a certain order because we are using foreign keys, we cant create a table with foreign key before that table exists.
  await knex("zoos").insert([
    { name: "San Diego Zoo", address: "2920 Zoo Dr, San Diego, CA 92101" },
    { name: "St. Louis Zoo", address: "Government Dr, St. Louis, MO 63110" }
  ]);
};

// ! We have to run seeds and cleanup in a certain order. look in cleanup.js
