const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileUpload')

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT
    this.authPath = '/api/auth'
    this.categoriesPath = '/api/categories'
    this.userPath = '/api/users'
    this.productsPath = '/api/products'
    this.searchPath = '/api/search'
    this.uploadsPath = '/api/uploads'
  }

  configMiddlewares() {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.static('public'))
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
        createParentPath: true
      })
    )
  }

  configRoutes() {
    this.app.use(this.authPath, require('../routes/authRouter'))
    this.app.use(this.categoriesPath, require('../routes/categoriesRouter'))
    this.app.use(this.productsPath, require('../routes/productsRouter'))
    this.app.use(this.userPath, require('../routes/userRouter'))
    this.app.use(this.searchPath, require('../routes/searchRouter'))
    this.app.use(this.uploadsPath, require('../routes/uploadsRouter'))
  }

  listen() {
    this.app.listen(this.port, () => console.log(`Servidor corriendo en el puerto ${this.port}`))
  }
}

module.exports = Server
