const { request, response } = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const generateJWT = require('../helpers/jwt-generator')

const login = async (req = request, res = response) => {
   const { email, password } = req.body
   const user = await User.findOne({ email, active: true })
   if (user == null) res.status(400).json(`Los datos de ingreso fueron incorrectos`)
   else {
      const isCorrect = bcrypt.compareSync(password, user.password)
      if (isCorrect) {
         const token = await generateJWT(user.id)
         res.status(200).json(`Bienvenido ${user.name} tu token es ${token}`)
      } else res.status(400).json(`Contraseña equivocada`)
   }
}

module.exports = {
   login
}
