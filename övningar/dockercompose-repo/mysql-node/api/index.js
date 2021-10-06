const express = require('express')
const mysql = require('mysql2');

const mysqlConfig = {
  host: "mysql_server",
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}

let con;

const connect = () => {
  con =  mysql.createConnection(mysqlConfig);
  con.connect(function(err) {
    if (err) throw err;
    console.log('connected')
  });
}

const app = express()
connect();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', function (req, res) {
  res.send('hello world')
})

app.get('/create-table', function (req, res) {
  con.connect(function(err) {
    if (err) throw err;
    const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name text NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )  ENGINE=INNODB;
  `;
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.send("users table created");
    });
  });
})

app.post('/insert', function (req, res) {
  const {name} = req.body;
  
  con.connect(function(err) {
    if (err) throw err;
    const sql = `INSERT INTO users (name) VALUES ('${name}')`
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.send(`${name} inserted into table`)
    });
  })
})

app.get('/get-users', function (req, res) {
  con.connect(function(err) {
    if (err) throw err;
    const sql = `SELECT * FROM users`
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(JSON.stringify(result))
    });
  });
})

app.listen(3000)

console.log("listening on port 3000")

