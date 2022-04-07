require('dotenv').config()
const { request, response } = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const validateJWT = async (req = request, res = response, next) => {
   const token = req.header('token')
   if (!token) res.status(401).json('No hay un token en la petición')
   else {
      try {
         const { uid } = jwt.verify(token, process.env.SECRET_KEY)
         userLogged = await User.findById(uid)
         if (userLogged == null)
            res.status(401).json('El token no corresponde con un usuario de la BD')
         else if (userLogged.active == false) res.status(401).json('El usuario ya fue eliminado')
         else {
            req.userLogged = userLogged
            next()
         }
      } catch (e) {
         res.status(401).json('Error al verificar el token en la petición')
      }
   }
}

module.exports = validateJWT
