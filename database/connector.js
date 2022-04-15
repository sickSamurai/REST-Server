require('dotenv').config()
const mongoose = require('mongoose')

class ConnectorToDB {
  connectDB = async () => {
    mongoose
      .connect(process.env.MONGODB, { user: process.env.USER, pass: process.env.PASS })
      .then(() => console.log('Connected to MongoDB'))
      .catch(err => console.log(err))
  }
}

module.exports = ConnectorToDB
