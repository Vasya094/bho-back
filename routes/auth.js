const express = require('express')
const {register, login, forgotPassword,resetPassword} = require('../controllers/auth')

const router = express.Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/forgot_password').post(forgotPassword)
router.route('/reset_password/:resetToken').put(resetPassword)

module.exports = router