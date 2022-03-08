const mongoose = require("mongoose")
require("dotenv").config()

const connectDB = () => {
   mongoose
      .connect(process.env.MONGODB, { user: process.env.USER, pass: process.env.PASS })
      .then(() => console.log("Connected to MongoDB"))
      .catch(err => console.log(err))
}
module.exports = { connectDB }
