 const mongoose = require('mongoose')
 
 const connectDataBase = async () => {
 await mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: "true",
  useCreateIndex: "true",  
  useUnifiedTopology: "true",
})
 console.log('Database was connect')
}

module.exports = connectDataBase