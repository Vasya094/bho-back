 const User = require("../models/User")
 const ErrorResponse = require("../utils/errorResponse");

 exports.register = async (req, res, next) => {
   const {userInfo} = req.body
   try {
       const user = await User.create({
        ...userInfo
       })
       sendToken(user, 201, res)
   } catch (error) {
       res.status(500).json({
           success: false,
           error: error.message
       })
   }
 }
 exports.login = async (req, res, next) => {
   const {email, password} = req.body
   if (!email || !password) {
     return next(new ErrorResponse("Please provide an email and password", 400));
   }

   try { 
     const user = await User.findOne({
       email
     }).select("+password")

     if(!user) {
       return res.status(404).json({success: false, error: "Invalid credentials"})
     }

     const isMatch = await user.matchPassword.call(user, password)

     if (!isMatch) {
       return res.status(404).json({success: false, error: "Invalid credentials"})
     }

     sendToken(user, 200, res)
   } catch (error) {
       res.status(500).json({
           success: false,
           error: error.message
       })
   }
 } 

 const sendToken = (user, statusCode, res) => {
   const token = user.getSignedToken()
   res.status(statusCode).json({
       success: true,
       token
     }) 
 }

 exports.forgotPassword = async (req, res, next) => {
   let {email} = req.body

   try {
     const user = User.findOne({email})
     if (!user) {
       return next(new ErrorResponse('Email could not be send', 404))
     }
     const resetToken = user.getResetPasswordToken()

     await user.save()

         // Create reset url to email to provided email
    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

    // HTML Message
    const message = `
      <h1>You have requested a password reset</h1>
      <p>Please make a put request to the following link:</p>
      <a href=${resetUrl} clicktracking=off>RESET PASSWORD </a>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });

      res.status(200).json({ success: true, data: "Email Sent" });
    } catch (err) {
      console.log(err);

      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return next(new ErrorResponse("Email could not be sent", 500));
    }
   } catch (error) {
     
   }
 } 
 exports.resetPassword = (req, res, next) => {
   res.send('Reset Password!!');
 }