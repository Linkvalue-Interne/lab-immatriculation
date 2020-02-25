const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: "localhost",
    database: "pi",
    user: "pi",
    password: "raspberry"
  }
});

knex.schema
  .createTable("users", function(table) {
    table.increments("id");
    table.string("last_name");
    table.string("first_name");
  })
  .createTable("license_plates", function(table) {
    table.increments("id");
    table.string("license_plate");
    table
      .integer("user_id")
      .unsigned()
      .references("users.id");
  })
  .createTable("fails", function(table) {
    table.increments("id");
    table.string("detected_license_plate");
    table
      .integer("license_plate_id")
      .unsigned()
      .references("license_plates.id");
  })
  .then(() => {
    console.log("done");
    process.exit(0);
  })
  .catch(err => console.error(err));
