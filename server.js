const express = require('express')
const app = express()

const PORT = 4000

const friends = [
  {
    id: 0,
    name: 'Darth Vader'
  },
  {
    id: 1,
    name: 'Luke Skywalker'
  },
  {
    id: 2,
    name: 'Han Solo'
  },
]
app.use((req, res, next) => {
  const start = Date.now();
  next();
 
  const delta = Date.now() - start
  console.log(`${req.method} ${req.url}  ${delta}ms`);
})

app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hey YOU, Go Away!!!')
})

app.get('/friends', function (req, res) {
  res.send(friends)
})

app.get('/friends/:friendId', function (req, res) {
  const friendId = +req?.params?.friendId
  const friend = friends[friendId]

  if (friend) {
    res.json(friend)
  } else {
    res.json({
      error: 'There is no such friend =('
    })
  }
  
})

app.post('/friends', function (req, res) {
  if (!req?.body?.name) {
    return res.status(400).json({
      error: 'Invalid request body =('
    })
  }

  const existFriend = friends.filter(({ name }) => name === req?.body?.name)

  if (existFriend?.length > 0) {
    return res.status(400).json({
      error: 'The friend is already exist ;)'
    })
  }

  const newFriend = {
    id: friends.length,
    name: req?.body?.name
  }

  friends.push(newFriend)

  res.json(newFriend)
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
})