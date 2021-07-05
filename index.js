 const express = require('express')
 const mongoose = require('mongoose')
 const errorHandler = require('./middleware/error')
 require('dotenv').config({path: './config.env'})
 const connectDataBase = require("./config/db.js")
  


 const app = express()

 connectDataBase()

 app.use(express.json());

 app.use('/api/auth', require('./routes/auth'));
 app.use('/api/private', require('./routes/private'));
 app.use('/api/users', require('./routes/users'));

 // Error Handler Last MiddleWare

 app.use(errorHandler)

 const PORT = process.env.PORT || 5000

 const server = app.listen(PORT, () => {
     console.log(`App listening on port ${PORT}!`);
 });

 process.on('unhandledRejection', (err, promise) => {
     console.log(`Logged error: ${err}`)
     server.close(() => process.exit(1))
 })
  