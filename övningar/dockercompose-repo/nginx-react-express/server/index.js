const keys = require("./keys");

// Express App Setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres Client Setup
const { Pool } = require("pg");
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
});

pgClient.on("connect", (client) => {
  client
    .query("CREATE TABLE IF NOT EXISTS users (name STRING)")
    .catch((err) => console.error(err));
});

// Express route handlers

app.get("/", (req, res) => {
  res.send("Hi");
});

app.get("/users/all", async (req, res) => {
  const users = await pgClient.query("SELECT * from users");
  res.send(users.rows);
});


app.post("/register", async (req, res) => {
  const {username} = req.body


  pgClient.query("INSERT INTO users(name) VALUES($1)", [username]);

  res.send({ working: true });
});

app.listen(5000, (err) => {
  console.log("Listening");
});