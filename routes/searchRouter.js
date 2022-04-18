const { Router } = require('express')
const { param } = require('express-validator')

const { search } = require('../controllers/searchMethods')
const validateFields = require('../middlewares/validate-fields')

const router = new Router()

router.get(
  '/:colection/:searchTerm',
  param('colection', 'No existe esa colección').isIn('users', 'categories', 'products'),
  validateFields,
  search
)

module.exports = router
