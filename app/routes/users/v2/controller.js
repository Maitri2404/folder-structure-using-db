const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../../../config/config");
const { message, status } = require("../../../logMessages/message");
const User = require("../../../models/user");

const saltRound = 10;

async function addUser(req, res) {
  try {
    const { password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, saltRound);
    const user = new User({
      fullName: req.body.fullName,
      username: req.body.username,
      password: req.body.password,
      password: hashedPassword,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      department: req.body.department,
    });
    await user.save();
    return res.status(status.created).json(message.registerUserSuccess);
  } catch (error) {
    console.log(error);
    return res.status(status.serverError).json(message.serverError);
  }
}

async function getUsers(req, res) {
  try {
    const users = await User.find();
    return res
      .status(status.success)
      .json({ message: message.getUsers, users });
  } catch (error) {
    console.log(error);
    return res.status(status.serverError).json(message.serverError);
  }
}

async function updateUser(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: req.params.username });
    console.log(user);
    if (!user) {
      return res.status(status.notFound).json(message.userNotFound);
    }
    if (username) {
      user.username = username;
    }
    if (password) {
      const hashedPassword = bcrypt.hashSync(password, saltRound);
      user.password = hashedPassword;
    }
    await user.save();
    return res.status(status.success).json(message.updateUserSuccess);
  } catch (error) {
    console.log(error);
    return res.status(status.serverError).json(message.serverError);
  }
}

async function deleteUser(req, res) {
    try {
      const { username } = req.params;
      
      const user = await User.findOne({ username });
      
      if (!user) {
        return res.status(status.notFound).json(message.userNotFound);
      }

      await user.deleteOne();
      
      return res.status(status.success).json(message.deleteUserSuccess);
    } catch (error) {
      console.log(error);
      return res.status(status.serverError).json(message.serverError);
    }
  }


async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(status.notFound).json(message.userNotFound);
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return res.json({ error: err });
        } else if (result) {
          const token = jwt.sign(
            { username: user.username },
            config.SECRET_KEY,
            { expiresIn: "1h" }
          );
          return res.json({ token });
        } else {
          return res.status(status.unAuthorized).json(message.invalidPassword);
        }
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(status.serverError).json(message.serverError);
  }
}

module.exports = { addUser, getUsers, updateUser, deleteUser, login };
