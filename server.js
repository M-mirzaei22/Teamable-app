const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use("/", express.static(__dirname + "/dist"));

app.get("/get-profile", function (req, res) {
  const response = {
    name: " Anna Smith",
    email: "Anna.Smith@example.com",
    interests: " bike riding",
  };
  res.send(response);
});

app.post("/update-profile", function (req, res) {
  const payload = req.body;
  console.log(payload);
  //here we savved the payload into database
  if (Object.keys(payload).length === 0) {
    res.status(400).send({ error: "EMPTY payload . couldn't update user profile data" });
  } else {
    //updating user profile
    res.status(200).send({ info: " user profile data updated successfully" });
  }
});

app.listen(3000, function () {
  console.log("app is listening on port 3000");
});
