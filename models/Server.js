const express = require('express')
const cors = require('cors')
const { connectDB } = require('../database/config')

class Server {
   constructor() {
      this.app = express()
      this.port = process.env.PORT
      this.userPath = '/api/users'
      this.middlewares()
      this.configRoutes()
   }

   middlewares() {
      this.app.use(cors())
      this.app.use(express.json())
      this.app.use(express.static('public'))
   }

   configRoutes() {
      this.app.use(this.userPath, require('../routes/userRoutes'))
   }

   listen() {
      this.app.listen(this.port, () => console.log(`Servidor corriendo en el puerto ${this.port}`))
      connectDB()
   }
}

module.exports = Server
