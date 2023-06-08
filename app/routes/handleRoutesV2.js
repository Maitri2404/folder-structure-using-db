const {
    getUsers,
    addUser,
    updateUser,
    deleteUser,
    login
  } = require('./users/v2/controller')
  const { authenticateToken } = require('./users/middleware/middleware')
  const {
    validateAddUser,
    validateUpdateUser
  } = require('./users/v2/validator')
  const validateLogin = require('../')
  const routerV2 = require('express').Router()
  
  routerV2.get('/v2/getUsers', authenticateToken, getUsers)
  routerV2.post('/v2/addUser', validateAddUser, addUser)
  routerV2.post('/v2/login', validateLogin, login)
  routerV2.put(
    '/v2/updateUser/:username?',
    validateUpdateUser,
    authenticateToken,
    updateUser
  )
  routerV2.delete('/v2/deleteUser', deleteUser )
  
  module.exports =  routerV2 
  