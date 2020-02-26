const { execSync } = require("child_process");
const express = require("express");
const cors = require("cors");

const CONFIDENCE_MINIMAL_VALUE = 90;

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
  const imageName = `/tmp/${time}.jpg`;
  execSync(`raspistill -o ${imageName} -t 300`);

  const commandResult = execSync(`alpr -c eu -p fr --json ${imageName}`, {
    encoding: "utf8"
  });
  const { results } = JSON.parse(commandResult);

  if (!results) {
    console.log("No license plate founded.");

    res.json({ user: null, analyzedLicensePlate: null });
    return next();
  }

  const [firstMatch] = results.filter(result => result.pattern_match === 1);

  if (!firstMatch) {
    console.log("No pattern match founded.");

    res.json({ user: null, analyzedLicensePlate: null });
    return next();
  }

  if (firstMatch.confidence > CONFIDENCE_MINIMAL_VALUE) {
    const [user] = await knex("users")
      .select("users.*")
      .join("license_plates", "license_plates.user_id", "=", "users.id")
      .where({ license_plate: firstMatch.plate });

    if (!user) {
      res.json({ user: null, analyzedLicensePlate: firstMatch.plate });
      return next();
    }

    res.json({ user, analyzedLicensePlate: firstMatch.plate });
    return next();
  }

  await knex("fails").insert({
    detected_license_plate: firstMatch.plate
  });

  res.status(404).json({ user: null, analyzedLicensePlate: firstMatch.plate });
  return next();
});

app.get("/fails", async function(req, res, next) {
  const fails = await knex("fails").select("*");

  res.json({ fails });
  return next();
});

app.post("/revise/fail", async function(req, res, next) {
  const [new_plate] = await knex("license_plates")
    .select("license_plates.*")
    .where({ license_plate: req.body.new });

  if (!new_plate) {
    res.status(404).send("License plate unknown.");
    return next();
  }

  const [fail] = await knex("fails")
    .select("fails.*")
    .where({ detected_license_plate: req.body.old });

  if (!fail) {
    res.status(404).send("Detected license plate unknown.");
    return next();
  }

  await knex("fails")
    .where({ detected_license_plate: req.body.old })
    .update({ license_plate_id: new_plate.id });

  res.status(200).send("Updated");
  return next();
});

app.listen(3000, function() {
  console.log("Server listening on port 3000!");
});
