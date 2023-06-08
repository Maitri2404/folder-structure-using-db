const jwt = require('jsonwebtoken');
const User = require('../../../models/user');
const config = require('../../../config/config');
const { message, status } = require('../../../logMessages/message');

// function isUserUnique(username, email) {
//   try {
//     const existingUser = User.findOne({ $or: [{ username }, { email }] });
//     return !existingUser;
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// }

function isAuthorized(department) {
  return department === 'node';
}

function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(status.unAuthorized).json(message.unAuthorized);
  }
  jwt.verify(token, config.SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(status.forbidden).json(message.forbiddenAccess);
    }
    req.username = decoded;
    try {
      const user = await User.findOne({ username: decoded.username });
      if (!user || !isAuthorized(user.department)) {
        return res.status(status.forbidden).json(message.forbiddenAccess);
      }
      next();
    } catch (error) {
      console.log(error);
      return res.status(status.serverError).json(message.serverError);
    }
  });
}

module.exports = {
  // isUserUnique,
  authenticateToken,
  isAuthorized,
};
