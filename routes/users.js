const express = require("express");
const router = express.Router();
const { getUsers} = require("../controllers/users");
const { protect } = require("../middleware/auth");

router.route("/").get(getUsers);

module.exports = router; 