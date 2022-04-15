const { Router } = require('express')
const { body } = require('express-validator')

const validateFields = require('../middlewares/validate-fields')

const { login, signInWithGoogle } = require('../controllers/authMethods')

const router = new Router()

router.post(
   '/login',
   body('email', 'el email es obligatorio').notEmpty(),
   body('password', 'el password es obligatorio').notEmpty(),
   validateFields,
   login
)

router.post(
   '/google-sign-in',
   body('id_token', 'el id_token es obligatorio').notEmpty(),
   validateFields,
   signInWithGoogle
)

module.exports = router
