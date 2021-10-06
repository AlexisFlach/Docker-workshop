const app = require('express')()

const NAME = process.env.NAME;
const PORT = 3000;

app.get('/', (_, res) => {
  res.send(`My name is ${NAME}`)
})

app.listen(PORT, () => {
  console.log(`Server listens on port: ${PORT}`);
})