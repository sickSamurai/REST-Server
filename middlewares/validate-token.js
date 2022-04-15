require('dotenv').config()
const { request, response } = require('express')
const JWT = require('jsonwebtoken')
const User = require('../models/User')

const validateToken = async (req = request, res = response, next) => {
   try {
      const token = req.header('token')
      const { uid } = JWT.verify(token, process.env.SECRET_KEY)
      const userLoggedIn = await User.findById(uid)
      if (userLoggedIn == null) res.status(401).json('El token no corresponde con un usuario de la BD')
      else if (userLoggedIn.active == false) res.status(401).json('El usuario fue eliminado')
      else {
         req.userLoggedIn = userLoggedIn
         next()
      }
   } catch (e) {
      res.status(401).json('Error al verificar el token en la petición')
   }
}

module.exports = validateToken
