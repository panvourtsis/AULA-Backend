const fs = require('fs')
const songsDataFile = 'data/songs.data.json'
const songs = require('../data/songs.data.json')

exports.get = function (id) {
  if (!id) {
    return false
  }
  return songs.find((song) => song.id === parseInt(id))
}

exports.getList = function () {
  return songs
}

exports.save = async function (song) {
  try {
    const newSongs = songs.filter((arrSong) => arrSong.id !== song.id)
    newSongs.push(song)
    await fs.writeFileSync(songsDataFile, JSON.stringify(newSongs))
    return true
  } catch (err) {
    console.log('Error in writing file')
    console.log(err)
  }
}
