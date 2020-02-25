const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host : 'localhost',
    database: 'pi',
    user:     'pi',
    password: 'raspberry'
  }
});

knex('users')
  .insert({
    last_name: "Lacagette",
    first_name: "Alexandre"
  });
knex('license_plates')
  .insert({
    license_plate: "AN154TS",
    user_id: 1
  });

knex('users')
  .insert({
    last_name: "Bender",
    first_name: "Lars"
  });
knex('license_plates')
  .insert({
    license_plate: "PL123AK",
    user_id: 2
  });

knex('users')
  .insert({
    last_name: "Olas",
    first_name: "Jean-MiMi"
  });
knex('license_plates')
  .insert({
    license_plate: "ZH522802",
    user_id: 3
  });

knex('users')
  .insert({
    last_name: "Gezaal",
    first_name: "Rachid"
  });
knex('license_plates')
  .insert({
    license_plate: "6324ZG77",
    user_id: 4
  });