// const { isUserUnique } = require('../middleware/middleware')
const { validatePhoneNumber } = require("../../../helper/helper");
const { message, status } = require("../../../logMessages/message");

function validateUsername(username) {
  const regex = /^[A-Z][A-Z0-9]+$/;
  return regex.test(username);
}

function validatePassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&_]){8,16}/;
  return regex.test(password);
}

function validateAddUser(req, res, next) {
  const { fullName, username, password, email, phoneNumber, department } =
    req.body;

  if (!validateUsername(username)) {
    return res.status(status.badRequest).json(message.validUserNameV1);
  } else if (!validatePassword(password)) {
    return res.status(status.badRequest).json(message.validPasswordV1);
  } else if (!validatePhoneNumber(phoneNumber)) {
    return res.status(status.badRequest).json(message.validPhoneNumber);
  }
  next();
}

function validateUpdateUser(req, res, next) {
  const { username, password } = req.body;

  if (username) {
    if (!validateUsername(username)) {
      return res.status(status.badRequest).json(message.validUserNameV1);
    }
  } else if (!validatePassword(password)) {
    return res.status(status.badRequest).json(message.validPasswordV1);
  }

  next();
}

module.exports = {
  validateAddUser,
  validateUpdateUser,
};
