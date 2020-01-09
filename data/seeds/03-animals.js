exports.seed = async knex => {
  await knex("animals").insert([
    { name: "Snuffles", species_id: 1 },
    { name: "Cornelius", species_id: 2 },
    { name: "Athena", species_id: 3 },
    { name: "Ares", species_id: 3 },
    { name: "Snelby", species_id: 4 },
    { name: "Gwendolyn", species_id: 5 },
    { name: "Archebald", species_id: 6 },
    { name: "Polonius", species_id: 1 },
    { name: "Augusta", species_id: 4 },
    { name: "Stephen", species_id: 7 },
    { name: "Rocky", species_id: 8 }
    // ! Problem with this line below. There is no ID 19 in species, look in species Seed file, only goes to ID 10, but in SQLite it will run. Go into Kenxfile to fix
    // { name: "Bellatrix", species_id: 19 }
  ]);
};
