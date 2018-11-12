const express = require('express')
const {authorization} = require('../middlewares/authorization')
const asyncMiddleware = require('../middlewares/asyncMiddleware')
const router = new express.Router()
const SongController = require('../controllers/song.controller')

router.get('/songs/:id', authorization, asyncMiddleware(SongController.getSong))
router.get('/songs', authorization, asyncMiddleware(SongController.getSongs))

module.exports = router
