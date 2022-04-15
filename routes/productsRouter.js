const { Router } = require('express')
const { body, param, header } = require('express-validator')

const {
   getProducts,
   getProductByID,
   createProduct,
   updateProduct,
   deleteProduct
} = require('../controllers/productsMethods')
const { existsProduct, existsCategory } = require('../helpers/db-validators')

const validateFields = require('../middlewares/validate-fields')
const validateJWT = require('../middlewares/validate-jwt')

const router = new Router()

/* obtener todos los productos*/
router.get('/', getProducts)

/* obtener un producto por el id*/
router.get('/:id', param('id').custom(existsProduct), validateFields, getProductByID)

/* crear un producto*/
router.post(
   '/',
   body('name', 'El nombre es obligatorio').notEmpty(),
   body('category', 'La categoria es obligatoria').notEmpty(),
   body('category').custom(existsCategory),
   body('price', 'El precio debe ser un numero').optional().isNumeric(),
   body('isDisponible', 'la disponibilidad debe ser booleana').optional().isBoolean(),
   header('token', 'La petición debe venir con un token').notEmpty(),
   validateFields,
   validateJWT,
   createProduct
)

/* actualizar un producto*/
router.put(
   '/:productID',
   param('productID').custom(existsProduct),
   body('category').optional().custom(existsCategory),
   body('price', 'El precio debe ser un numero').optional().isNumeric(),
   body('isDisponible', 'la disponibilidad debe ser booleana').optional().isBoolean(),
   header('token', 'La petición debe venir con un token').notEmpty(),
   validateFields,
   validateJWT,
   updateProduct
)

/* borrar un producto*/
router.delete('/:productID', param('productID').custom(existsProduct), deleteProduct)

module.exports = router
