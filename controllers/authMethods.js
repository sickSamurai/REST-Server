const { request, response } = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const generateJWT = require('../helpers/JWT-generator')
const getGoogleSignInInfo = require('../helpers/google-sign-in-validator')

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

const signInWithGoogle = async (req, res) => {
   const { id_token } = req.body
   const { name, email, image } = await getGoogleSignInInfo(id_token)
   let user = await User.findOne({ email })
   if (!user) {
      user = new User({ name, email, password: 'anything', role: 'user', image, google: true })
      await user.save()
      res.json(user)
   } else if (user.isActive == false) res.status(401).json('Hable con el admin, usuario bloqueado')
   else res.json(user)
}

module.exports = {
   login,
   signInWithGoogle
}
