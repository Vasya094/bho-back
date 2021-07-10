const User = require("../models/User")

exports.getVolunteers = async (req, res, next) => {
  const users = await User.find({})
  if (!users) res.status(404).json({message: "There are no users"})
  res
    .status(200)
    .json(users);
};