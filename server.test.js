const { app, server } = require("./server");
const request = require("supertest");

test("Test request with valid payload", async function () {
  const testPayload = {
    name: "test name",
    email: "test.email@example.com",
    interests: "testing",
  };
  // here we're gonna make a http call to the backend on (/update-profile) url
  const response = await request(app).post("/update-profile").send(testPayload);
  //WHY await ?? the http requests are asynchronous and program should not crash for them to send response

  //here we write our expectations from the test
  console.log(response.body);
  expect(response.status).toBe(200);
  //body means the object that we are getting from backend - we basically want to rewrite th {res.status(200).send({ info: " user profile data updated successfully" }); part}
  expect(response.body).toHaveProperty("info");
  expect(response.body.info).toBe(" user profile data updated successfully");

  server.close();
});

test("Test request with invalid payload", async function () {
  const testPayload = {};
  // here we're gonna make a http call to the backend on (/update-profile) url
  const response = await request(app).post("/update-profile").send(testPayload);

  //here we write our expectations from the test
  console.log(response.body);
  expect(response.body).toHaveProperty("error");
  expect(response.body.error).toBe(
    "**Invalid payload **. couldn't update user profile data"
  );

  server.close();
});
