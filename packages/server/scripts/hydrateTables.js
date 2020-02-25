const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: "localhost",
    database: "pi",
    user: "pi",
    password: "raspberry"
  }
});

knex("users")
  .insert([
    {
      last_name: "Lacagette",
      first_name: "Alexandre"
    },
    {
      last_name: "Bender",
      first_name: "Lars"
    },
    {
      last_name: "Olas",
      first_name: "Jean-MiMi"
    },
    {
      last_name: "Gezaal",
      first_name: "Rachid"
    }
  ])
  .then(() =>
    knex("license_plates").insert([
      {
        license_plate: "AN154TS",
        user_id: 1
      },
      {
        license_plate: "PL123AK",
        user_id: 2
      },
      {
        license_plate: "ZH522802",
        user_id: 3
      },
      {
        license_plate: "6324ZG77",
        user_id: 4
      }
    ])
  )
  .then(() => {
    console.log("done");
    process.exit(0);
  })
  .catch(err => console.error(err));
