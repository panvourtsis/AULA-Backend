const express = require('express')
const {authorization} = require('../middlewares/authorization')
const asyncMiddleware = require('../middlewares/asyncMiddleware')
const router = new express.Router()
const UserController = require('../controllers/user.controller')

router.get('/users', authorization, asyncMiddleware(UserController.getUsers))
router.get('/users/:id', authorization, asyncMiddleware(UserController.getUser))
router.get('/users/:id/friends', authorization, asyncMiddleware(UserController.getUserFriends))
router.put('/users/:id/updateCurrentTrack', authorization, asyncMiddleware(UserController.updateUserCurrentSong))

module.exports = router
