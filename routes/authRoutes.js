const { Router } = require('express')
const { body, param } = require('express-validator')

const validateFields = require('../middlewares/validate-fields')

const { login } = require('../controllers/authController')

const authRouter = new Router()

authRouter.post(
   '/login',
   body('email', 'el email debe ser obligatorio').notEmpty(),
   body('password', 'el password debe ser obligatorio').notEmpty(),
   validateFields,
   login
)

module.exports = authRouter
