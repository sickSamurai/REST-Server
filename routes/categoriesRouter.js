const { Router } = require('express')
const { body, param, header } = require('express-validator')

const {
   getCategories,
   getCategoryByID,
   createCategory,
   updateCategory,
   deleteCategory
} = require('../controllers/categoriesMethods')

const validateJWT = require('../middlewares/validate-token')
const { hasAdminRole } = require('../middlewares/validate-roles')
const { existsCategory, notExistsCategoryWithSameName } = require('../helpers/db-validators')

const validateFields = require('../middlewares/validate-fields')

const router = new Router()

/*buscar todas las categorias por ID*/
router.get('/', getCategories)

/*buscar categoria por ID*/
router.get('/:id', param('id').custom(existsCategory), getCategoryByID)

/*crear categoria*/
router.post(
   '/',
   header('token', 'El token es obligatorio').notEmpty(),
   body('name', 'El nombre es obligatorio').notEmpty(),
   body('name').custom(notExistsCategoryWithSameName),
   validateFields,
   validateJWT,
   createCategory
)

/*actualizar categoria por ID*/
router.put(
   '/:id',
   param('id').custom(existsCategory),
   body('name', 'El nombre es obligatorio').notEmpty(),
   body('name').custom(notExistsCategoryWithSameName),
   validateFields,
   validateJWT,
   updateCategory
)

/*borrar categoria por ID*/
router.delete('/:id', param('id').custom(existsCategory), validateFields, validateJWT, hasAdminRole, deleteCategory)

module.exports = router
