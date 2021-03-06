 const express = require('express')
 const cors = require('cors')
 const errorHandler = require('./middleware/error')
 require('dotenv').config({path: './config.env'})
 const connectDataBase = require("./config/db.js")
  


 const app = express()

 connectDataBase()

 app.use(express.json());
 app.use(cors());

 app.use('/', (req, res, next)=> {
     console.log(req.url)
     next()
 })

 app.use('/api/auth', require('./routes/auth'));
 app.use('/api/volunteers', require('./routes/volunteers'));

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
  