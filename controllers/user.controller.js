const userModel = require('../model/user.model')

/**
 * Get user by id
 */
exports.getUsers = function (req, res) {
  const users = userModel.getList()
  res.status(200).json(users)
}

/**
 * Get user by id
 */
exports.getUser = function (req, res) {
  const user = userModel.get(req.params.id)
  res.status(200).json({ user })
}

/**
 * Get user friends by id
 */
exports.getUserFriends = function (req, res) {
  const user = userModel.get(req.params.id)
  const friends = user.friends.reduce((acc, friendId) => {
    const friendFound = userModel.get(friendId)
    if (friendFound) {
      acc.push(friendFound)
    }
    return acc
  }, [])
  res.status(200).json({ friends })
}

/**
 * Update user currently playing
 */
exports.updateUserCurrentSong = async function (req, res) {
  const user = await userModel.get(req.params.id)
  user.currently_playing = req.params.song
  await userModel.save(user)
  res.status(200).json({ user })
}
