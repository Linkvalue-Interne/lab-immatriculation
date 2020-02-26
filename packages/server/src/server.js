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
app.use(express.json());

app.get("/take/picture", async function(req, res, next) {
  const time = new Date().getTime();
  execSync(`raspistill -o /tmp/analyze/${time}.jpg -t 300`);

  const commandResult = execSync(
    `alpr -c eu --json -n 1 /home/pi/Nouvelle_immatriculation_des_véhicules_de_la_police_française.jpg`,
    { encoding: "utf8" }
  );
  const { results } = JSON.parse(commandResult);
  const result = results[0];

  if (!result) {
    console.log("No license plate founded.");

    res.json({ user: null, analyzedLicensePlate: null });
    return next();
  }

  if (result.confidence > CONFIDENCE_MINIMAL_VALUE) {
    const [user] = await knex("users")
      .select("users.*")
      .join("license_plates", "license_plates.user_id", "=", "users.id")
      .where({ license_plate: result.plate });

    if (!user) {
      res.json({ user: null, analyzedLicensePlate: result.plate });
      return next();
    }

    res.json({ user, analyzedLicensePlate: result.plate });
    return next();
  }

  await knex("fails").insert({
    detected_license_plate: result.plate
  });

  res.status(404).json({ user: null, analyzedLicensePlate: result.plate });
  return next();
});

app.get("/fails", async function(req, res, next) {
  const fails = await knex("fails")
    .select("*");
  
  res.json({ fails });
  return next();
});

app.post("/revise/fail", async function(req, res, next) {
  const [new_plate] = await knex("license_plates")
    .select("license_plates.*")
    .where({ license_plate: req.body.new });

  if (!new_plate) {
    res
      .status(404)
      .send("License plate unknow.");
    return next();
  }

  const [fail] = await knex("fails")
    .select("fails.*")
    .where({ detected_license_plate: req.body.old });

  if (!fail) {
    res
      .status(404)
      .send("Detected license plate unknow.");
    return next();
  }

  await knex("fails")
    .where({ detected_license_plate: req.body.old })
    .update({ license_plate_id: new_plate.id });

  res
    .status(200)
    .send("Updated");
  return next();
});

app.listen(3000, function() {
  console.log("Server listening on port 3000!");
});
