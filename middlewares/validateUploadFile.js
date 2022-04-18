const { request, response } = require('express')

const validateUploadFile = (req = request, res = response, next) => {
  if (!req.files) res.status(400).json('No hay archivos para subir')
  else if (!req.files.file) res.status(400).json('El key del archivo es erroneo')
  else next()
}

module.exports = validateUploadFile
