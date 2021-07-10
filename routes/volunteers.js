const express = require("express");
const router = express.Router();
const { getVolunteers } = require("../controllers/volunteers");
const { protect } = require("../middleware/auth");

router.route("/").get(protect, getVolunteers);

module.exports = router; 