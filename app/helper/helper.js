const { message, status } = require('../logMessages/message');
// const User = require('../models/user');



function validatePhoneNumber(phoneNumber) {
  const regex = /([987]{1})([0-9]{3})([1-9]{4})([0-9]{2})/
  return regex.test(phoneNumber)
}

async function validateLogin(req, res, next) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(status.badRequest).json(message.userNameAndPasswordRequire);
  }
  next();
}


module.exports = {
  validatePhoneNumber,
  validateLogin,
  hashPassword,
  verifyPassword
};
