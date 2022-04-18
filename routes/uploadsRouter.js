const { Router } = require('express')
const { param } = require('express-validator')
const { uploadImage, showImage } = require('../controllers/uploadsMethods')

const validateFields = require('../middlewares/validate-fields')
const validateUploadFile = require('../middlewares/validateUploadFile')

const router = new Router()

router.get(
  '/:colection/:id',
  param('colection', 'La colección no existe').isIn(['users', 'products', 'categories']),
  param('id', 'el ID no es valido').isMongoId(),
  validateFields,
  showImage
)

router.put(
  '/:colection/:id',
  param('colection', 'La colección no existe').isIn(['users', 'products', 'categories']),
  param('id', 'el ID no es valido').isMongoId(),
  validateFields,
  validateUploadFile,
  uploadImage
)

module.exports = router
