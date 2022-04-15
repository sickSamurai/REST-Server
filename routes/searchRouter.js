const { Router } = require('express')
const { param, query } = require('express-validator')

const { search } = require('../controllers/searchMethods')
const validateFields = require('../middlewares/validate-fields')

const colectionsAviable = ['users', 'categories', 'products', 'roles']

const router = new Router()

router.get(
   '/:colection/:searchTerm',
   param('colection', 'No existe esa colección').isIn(colectionsAviable),
   validateFields,
   search
)

module.exports = router
