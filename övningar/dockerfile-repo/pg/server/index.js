const express = require("express");

const app = express();
var cors = require('cors')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
const { Pool } = require("pg");

const pgClient = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
});



pgClient.on("connect", (client) => {
  client
    .query("CREATE TABLE IF NOT EXISTS users (id int, name string)")
    .catch((err) => console.error(err));
});

app.get("/", async (req, res) => {
  res.send('hello world')
});
app.get("/users", async (req, res) => {
  const users = await pgClient.query("SELECT * from users");
  res.send(users.rows);
 
});

app.post("/register", async (req, res) => {
  const {id, name} = req.body
  // res.send('inserting')
  console.log(id)
  pgClient.query("INSERT INTO users(id, name) VALUES($1, $2)", [id, name]);
  res.send({ working: true });
});

app.listen(5000, (err) => {
  console.log("Listening");
});