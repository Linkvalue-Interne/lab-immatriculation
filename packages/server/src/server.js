const { execSync } = require("child_process");
const express = require("express");
const cors = require("cors");

const CONFIDENCE_MINIMAL_VALUE = 75;

const app = express();

const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: "localhost",
    database: "pi",
    user: "pi",
    password: "raspberry"
  }
});

app.use(cors());

app.get("/take/picture", function(req, res) {
  const time = new Date().getTime();
  execSync(`raspistill -o /tmp/analyze/${time}.jpg -t 300`);

  const commandResult = execSync(
    `alpr -c eu --json -n 1 /home/pi/Nouvelle_immatriculation_des_véhicules_de_la_police_française.jpg`,
    { encoding: "utf8" }
  );
  const { results } = JSON.parse(commandResult);
  const firstResult = results[0] || {};

  res.json(firstResult);
});

app.get("/plate/:id", function(req, res) {
  res.send(
    knex.select("license_plates").where("license_plate", "=", req.params.id)
  );
});

app.listen(3000, function() {
  console.log("Server listening on port 3000!");
});
