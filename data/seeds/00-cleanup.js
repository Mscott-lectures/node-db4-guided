exports.seed = async knex => {
  // * Again create cleanup in reverse order of tables creation
  await knex("zoos_animals").truncate();
  await knex("animals").truncate();
  await knex("species").truncate();
  await knex("zoos").truncate();
};
