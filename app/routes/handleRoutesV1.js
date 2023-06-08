const {
    getUsers,
    addUser,
    updateUser,
    login,
  } = require('./users/v1/controller')
  const { authenticateToken } = require('./users/middleware/middleware')
  const {
    validateAddUser,
    validateUpdateUser
  } = require('./users/v1/validator')
  
  const validateLogin = require('../helper/helper')
  const routerV1 = require('express').Router()
  
  routerV1.get('/v1/getUsers', authenticateToken, getUsers)
  routerV1.post('/v1/addUser', validateAddUser, addUser)
  routerV1.post('/v1/login', validateLogin, login)
  
  routerV1.put(
    '/v1/updateUser/:username?',
    validateUpdateUser,
    authenticateToken,
    updateUser
  )
  
  module.exports = routerV1 
  