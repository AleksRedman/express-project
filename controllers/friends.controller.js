function getFriends(req, res) {
    res.send(friends)
};

function getFriendById(req, res) {
    const friendId = +req?.params?.friendId
    const friend = friends[friendId]

    if (friend) {
        res.json(friend)
    } else {
        res.json({ error: 'There is no such friend =(' })
    }
};

function postNewFriend(req, res) {
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
};

module.exports = {
    getFriends,
    getFriendById,
    postNewFriend
};