// async function hashPassword(password) {
//   const hashedPassword = await bcrypt.hash(password, saltRound);
//   return hashedPassword;
// }

// async function verifyPassword(password, hashedPassword) {
//   const isValid = await bcrypt.compare(password, hashedPassword);
//   return isValid;
// }


// async function updateUser(req, res) {
//   try {
//     const updateResult = await User.updateOne({ username: req.params.username }, req.body);
//     console.log(updateResult);

//     if (updateResult.nModified === 0) {
//       return res.status(status.notFound).json(message.userNotFound);
//     }

//     const updatedUser = await User.findOne({ username: req.params.username });

//     return res.status(status.success).json(message.updateUserSuccess);
//   } catch (error) {
//     console.log(error.message);
//     return res.status(status.serverError).json(message.serverError);
//   }
// }