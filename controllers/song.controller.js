const songModel = require('../model/song.model')

/**
 * Get song by id
 */
exports.getSong = function (req, res) {
  const song = songModel.get(req.params.id)
  res.status(200).json({ song })
}

/**
 * Get songs in a list
 */
exports.getSongs = function (req, res) {
  const songs = songModel.getList()
  res.status(200).json({ songs })
}
