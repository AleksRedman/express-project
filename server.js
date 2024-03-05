const express = require('express')
const friendsController = require('./controllers/friends.controller')
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

app.get('/friends', friendsController.getFriends)

app.get('/friends/:friendId', friendsController.getFriendById)

app.post('/friends', friendsController.postNewFriend)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
})