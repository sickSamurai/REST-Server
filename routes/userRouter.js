const { Router } = require('express')
const { body, param, header } = require('express-validator')

const validateFields = require('../middlewares/validate-fields')
const validateJWT = require('../middlewares/validate-token')
const { hasAdminRole } = require('../middlewares/validate-roles')

const { existsRole, notExistsEmail, existsUser } = require('../helpers/db-validators')
const { createUser, getUsers, updateUser, deleteUser } = require('../controllers/userMethods')

const router = new Router()

router.post(
   '/',
   [
      body('name', 'El nombre es obligatorio').not().isEmpty(),
      body('email', 'El email es obligatorio').not().isEmpty(),
      body('email').custom(notExistsEmail),
      body('password', 'La constraseña es obligatoria').not().isEmpty(),
      body('password', 'La constraseña debe tener más de 6 caracteres').isLength({ min: 6 }),
      body('role', 'El rol es obligatorio').not().isEmpty(),
      body('role').custom(existsRole),
      body('email', 'El email no es valido').isEmail(),
      validateFields
   ],
   createUser
)

router.get('/', getUsers)

router.put(
   '/:id',
   param('id', 'No es un ID Valido').isMongoId(),
   param('id').custom(existsUser),
   validateFields,
   updateUser
)

router.delete(
   '/:id',
   header('token', 'Falta el token en la petición').notEmpty(),
   param('id', 'No es un ID Valido').isMongoId(),
   param('id').custom(existsUser),
   validateFields,
   validateJWT,
   hasAdminRole,
   deleteUser
)

module.exports = router
