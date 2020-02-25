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

app.get("/take/picture", async function(req, res) {
  const time = new Date().getTime();
  execSync(`raspistill -o /tmp/analyze/${time}.jpg -t 300`);

  const commandResult = execSync(
    `alpr -c eu --json -n 1 /home/pi/Nouvelle_immatriculation_des_véhicules_de_la_police_française.jpg`,
    { encoding: "utf8" }
  );
  const { results } = JSON.parse(commandResult);
  const result = results[0];

  if (result) {
    const users = await knex("users")
      .select("users.*")
      .join("license_plates", "license_plates.user_id", "=", "users.id")
      .where({ license_plate: result.plate });

    res.json({ users });
  }

  res.json({ users: [] });
});

app.get("/plate/:id", function(req, res) {
  res.send(
    knex.select("license_plates").where("license_plate", "=", req.params.id)
  );
});

app.get("/plates", function(req, res) {
  res.send(knex.select("license_plates"));
});

app.listen(3000, function() {
  console.log("Server listening on port 3000!");
});
