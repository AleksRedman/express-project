const express = require('express')
const friendsRouter = require('./routes/friends.router')

const app = express()
const PORT = 4000

app.use((req, res, next) => {
  const start = Date.now();
  next();
 
  const delta = Date.now() - start
  console.log(`${req.method} ${req.baseUrl}${req.url}  ${delta}ms`);
})

app.use(express.json());

app.use('/friends', friendsRouter)

app.get('/', function (req, res) {
  res.send('Hey YOU, Go Away!!!')
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
})