const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host : '192.168.16.150',
    database: 'pi',
    user:     'pi',
    password: 'raspberry'
  }
});

knex.schema
  .createTable('users', function(table) {
    table.increments('id');
    table.string('last_name');
    table.string('first_name');
    table.time('created_at');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
  .createTable('license_plates', function(table) {
    table.increments('id');
    table.string('license_plate');
    table
      .integer('user_id')
      .unsigned()
      .references('users.id');
    table.time('created_at');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
  .createTable('fails', function(table) {
    table.increments('id');
    table.string('detected_license_plate');
    table
      .integer('license_plate_id')
      .unsigned()
      .references('license_plates.id');
    table.time('created_at');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });