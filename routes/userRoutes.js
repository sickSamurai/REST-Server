const { Router } = require('express')
const { body, param } = require('express-validator')
const validateFields = require('../middlewares/validate-fields')
const { isRoleValid, existsEmail, existsUser } = require('../helpers/db-validators')

const {
   userPostMethod,
   userGetMethod,
   userPutMethod,
   userDeleteMethod
} = require('../controllers/userController')

const userRouter = new Router()

userRouter.post(
   '/',
   [
      body('name', 'El nombre es obligatorio').not().isEmpty(),
      body('email', 'El email es obligatorio').not().isEmpty(),
      body('email').custom(existsEmail),
      body('password', 'La constraseña es obligatoria').not().isEmpty(),
      body('password', 'La constraseña debe tener más de 6 caracteres').isLength({ min: 6 }),
      body('role', 'El rol es obligatorio').not().isEmpty(),
      body('role').custom(isRoleValid),
      body('email', 'El email no es valido').isEmail(),
      validateFields
   ],
   userPostMethod
)

userRouter.get('/', userGetMethod)

userRouter.put(
   '/:id',
   param('id', 'No es un ID Valido').isMongoId(),
   param('id').custom(existsUser),
   validateFields,
   userPutMethod
)

userRouter.delete(
   '/:id',
   param('id', 'No es un ID Valido').isMongoId(),
   param('id').custom(existsUser),
   validateFields,
   userDeleteMethod
)

module.exports = userRouter
