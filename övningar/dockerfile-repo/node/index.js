const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World')
})


const port = process.env.port
app.listen(port, () => {
  console.log(port);
})