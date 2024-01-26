const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "company_db";
const collName = "employees";

app.use(bodyParser.json());
app.use("/", express.static(__dirname + "/dist"));

app.get("/get-profile", async function (req, res) {
  // here write the logic to: connect to mongodb
  await client.connect();
  console.log("Connected successfully to server");

  // here write the logic to: initiates or get the db & collection
  const db = client.db(dbName);
  const collection = db.collection(collName);

  // here write the logic to: get data from db
  const result = await collection.findOne({ id: 1 });
  console.log(result);
  client.close();

  response = {};

  if (result !== null) {
    response = {
      name: result.name,
      email: result.email,
      interests: result.interests,
    };
  }
  res.send(response);
});

app.post("/update-profile", async function (req, res) {
  const payload = req.body;
  console.log(payload);

  //here we saved the payload into DB
  if (Object.keys(payload).length === 0) {
    res
      .status(400)
      .send({ error: "EMPTY payload . couldn't update user profile data" });
  } else {
    //updating user profile
    // here write the logic to: connect to mongodb
    await client.connect();
    console.log("Connected successfully to server");

    // here write the logic to: initiates or get the db & collection
    const db = client.db(dbName);
    const collection = db.collection(collName);

    // here write the logic to: save payload data to the DB
    payload["id"] = 1;
    const updatedValues = { $set: payload };
    await collection.updateOne({ id: 1 }, updatedValues, { upsert: true });
    client.close();

    res.status(200).send({ info: " user profile data updated successfully" });
  }
});

app.listen(3000, function () {
  console.log("app is listening on port 3000");
});
