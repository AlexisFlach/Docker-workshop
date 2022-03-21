const express = require('express')

const app = express()

const products = {
  "products": [
    "glass",
    "sockervadd",
    "öl"
  ]
}

app.get('/', (req, res) => {
  res.send('<h1>Homepage</h1>')
})

app.get('/products', (req, res) => {
  res.send(products)
})

app.listen(80, () => {
  console.log('Server listen on port 80');
})