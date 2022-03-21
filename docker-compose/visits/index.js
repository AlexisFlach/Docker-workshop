const express = require('express');
const redis = require('redis')

const app = express();
const client = redis.createClient({
  host: 'redis-server',
  port: 6379
})


client.set('visits', 0)
const setVisits = (res) => {
  client.get('visits', (err, visits) => {
    res.send('Number of visits is ' + visits)
    client.set('visits', parseInt(visits) + 1)
  })
}

app.use((req, res, next) => {
  setVisits(res);
})

app.get('/', (req, res) => {
  console.log(
  'im here'
  );
})

app.get('/about', (req, res) => {
})

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Server listens on ${PORT}`);
})