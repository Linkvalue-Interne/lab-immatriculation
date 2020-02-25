const { execSync } = require("child_process");
const express = require('express');
const app = express();
const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host : 'localhost',
    database: 'pi',
    user:     'pi',
    password: 'raspberry'
  }
});

app.get('/take/picture', function (req, res) {
  const time = new Date().getTime();
  execSync(`raspistill -o /tmp/analyze/${time}.jpg -t 300`);
  let scan_picture = execSync(`alpr /tmp/analyze/${time}.jpg -c eu --json`);

  res.send(scan_picture.stdout.toString());
});

app.get('/plate/:id', function (req, res) {
  res.send(
    knex
      .select('license_plates')
      .where('license_plate', '=', req.params.id)
  );
});

app.listen(3000, function () {
  console.log('Server listening on port 3000!')
});