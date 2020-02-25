const { spawn } = require("child_process");
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
  let child = spawn('raspistill',['-o', `/tmp/analyze/${time}.jpg`, '-t', 300]);

  child.stdout.on('data', (data) => {
    res.send(`child stdout:\n${data}`);
  });
  
  child.stderr.on('data', (data) => {
    res.send(`child stderr:\n${data}`);
  });
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