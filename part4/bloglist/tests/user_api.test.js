const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const User = require("../models/user");

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("secret", 10);
  const user = new User({ username: "root", name: "super", passwordHash });

  await user.save();
});

test("user with no username not created", async () => {
  const usersAtStart = await helper.usersInDb();

  const newUser = {
    name: "Superuser",
    password: "salainen",
  };

  const result = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  expect(result.body.error).toContain("username or password must be provided");

  const usersAtEnd = await helper.usersInDb();
  expect(usersAtEnd).toEqual(usersAtStart);
});

test("user with no password not created", async () => {
  const usersAtStart = await helper.usersInDb();

  const newUser = {
    username: "new",
    name: "new",
  };

  const result = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  expect(result.body.error).toContain("username or password must be provided");

  const usersAtEnd = await helper.usersInDb();
  expect(usersAtEnd).toEqual(usersAtStart);
});

test("username shorter than 3 not created", async () => {
  const usersAtStart = await helper.usersInDb();

  const newUser = {
    username: "ne",
    name: "new",
    password: "salainen",
  };

  const result = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  expect(result.body.error).toContain(
    "username and password must be at least 3 characters long"
  );

  const usersAtEnd = await helper.usersInDb();
  expect(usersAtEnd).toEqual(usersAtStart);
});

test("password shorter than 3 not created", async () => {
  const usersAtStart = await helper.usersInDb();

  const newUser = {
    username: "new",
    name: "new",
    password: "sa",
  };

  const result = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  expect(result.body.error).toContain(
    "username and password must be at least 3 characters long"
  );

  const usersAtEnd = await helper.usersInDb();
  expect(usersAtEnd).toEqual(usersAtStart);
});

test("non unique username account not created", async () => {
  const usersAtStart = await helper.usersInDb();

  const newUser = {
    username: "root",
    name: "superuser",
    password: "salainen",
  };

  const result = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  expect(result.body.error).toContain("username must be unique");

  const usersAtEnd = await helper.usersInDb();
  expect(usersAtEnd).toEqual(usersAtStart);
});

test("fresh username successfully creates user", async () => {
  const usersAtStart = await helper.usersInDb();

  const newUser = {
    username: "root2",
    name: "superuser2",
    password: "salainen",
  };

  await api
    .post("/api/users")
    .send(newUser)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const usersAtEnd = await helper.usersInDb();
  expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

  const usernames = usersAtEnd.map((u) => u.username);
  expect(usernames).toContain(newUser.username);
});
