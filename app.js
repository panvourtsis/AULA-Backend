const express = require('express')
const morgan = require('morgan')
const logger = require('./utils/logger')
const userModel = require('./model/user.model')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const routes = require('./routes')
const config = require('config')

const port = process.env.PORT || config.get('app.port')
const host = process.env.DOMAIN || config.get('app.host')
const moment = require('moment')
moment.locale('el')

server.listen(port, () => {
  logger.appStarted(port, host)
})
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
app.use(morgan(process.env.NODE_ENV === 'production' ? ('combined', { 'stream': logger.stream }) : 'dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routing
app.get('/', function (req, res) {
  res.send('hello world')
})
app.use('/api', routes.user)
app.use('/api', routes.song)

app.use((err, req, res, next) => {
  if (err) {
    logger.error(err)
    return res.status(500).send('Some error occured.')
  }
})

io.on('connection', function (socket) {
  logger.info('someone connected')
  socket.on('userUpdateListenSong', async ({ user, song }) => {
    try {
      const userData = await userModel.get(user)
      userData.currently_playing = {
        song_id: song.id || '',
        song_artist: song.artist || '',
        song_name: song.name || '',
        song_genre: song.genre || '',
        song_duration: song.duration || ''
      }
      await userModel.save(userData)

      io.sockets.emit('userListensSong', { user: userData })
    } catch (err) {
      logger.error('err', err)
    }
  })
  socket.on('disconnect', function () {
    logger.info('someone disconnected')
  })
})
