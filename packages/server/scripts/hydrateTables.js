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
  }).then(() => {
    knex('license_plates')
      .insert({
        license_plate: "AN154TS",
        user_id: 1
      });
  }).then(() => {
    knex('users')
      .insert({
        last_name: "Bender",
        first_name: "Lars"
      });
  }).then(() => {
    knex('license_plates')
      .insert({
        license_plate: "PL123AK",
        user_id: 2
      });
  }).then(() => {
    knex('users')
      .insert({
        last_name: "Olas",
        first_name: "Jean-MiMi"
      });
  }).then(() => {
    knex('license_plates')
      .insert({
        license_plate: "ZH522802",
        user_id: 3
      });
  }).then(() => {
    knex('users')
      .insert({
        last_name: "Gezaal",
        first_name: "Rachid"
      });
  }).then(() => {
    knex('license_plates')
      .insert({
        license_plate: "6324ZG77",
        user_id: 4
      });
  });

