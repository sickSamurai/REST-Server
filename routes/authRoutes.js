const { Router } = require('express')
const { body, param } = require('express-validator')

const validateFields = require('../middlewares/validate-fields')

const { login, signInWithGoogle } = require('../controllers/authController')

const authRouter = new Router()

authRouter.post(
   '/login',
   body('email', 'el email debe ser obligatorio').notEmpty(),
   body('password', 'el password debe ser obligatorio').notEmpty(),
   validateFields,
   login
)

authRouter.post(
   '/google-sign-in',
   body('id_token', 'el id_token debe ser obligatorio').notEmpty(),
   validateFields,
   signInWithGoogle
)

module.exports = authRouter
