const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(5000, () => {
  console.log('Server listens on port 5000');
})