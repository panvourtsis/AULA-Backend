const fs = require('fs')
const userDataFile = 'data/users.data.json'
const users = require('../data/users.data.json')

exports.get = function (id) {
  if (!id) {
    return false
  }
  return users.find((user) => user.id === parseInt(id))
}

exports.getList = function () {
  return users
}

exports.save = async function (user) {
  try {
    const newUsers = users.filter((arrUser) => arrUser.id !== user.id)
    newUsers.push(user)
    await fs.writeFileSync(userDataFile, JSON.stringify(newUsers))
    return true
  } catch (err) {
    console.log('Error in writing file')
    console.log(err)
  }
}
