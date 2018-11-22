/* eslint-disable no-console */

const chalk = require('chalk')
const ip = require('ip')
const winston = require('winston')

const divider = chalk.gray('\n-----------------------------------')

/**
 * Logger middleware, you can customize it to make messages more personal
 */
const logger = {
  ...winston,

  // Called when express.js app starts on given port w/o errors
  appStarted: (port, host) => {
    winston.info(`Server started ! ${chalk.green('✓')}`)

    winston.info(`
${chalk.bold('Access URLs:')}${divider}
Localhost: ${chalk.magenta(`http://${host}:${port}`)}
      LAN: ${chalk.magenta(`http://${ip.address()}:${port}`)}${divider}
${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
    `)
  }
}

module.exports = logger
