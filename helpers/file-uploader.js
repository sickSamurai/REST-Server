const path = require('path')
const { v4: uidGenerator } = require('uuid')

const imageFileExtensions = [
  'tif',
  'tiff',
  'bmp',
  'jpg',
  'jpeg',
  'png',
  'gif',
  'eps',
  'raw',
  'dng',
  'cr2',
  'nef',
  'sr2'
]

const textFileExtensions = ['txt', 'md']

const tryUploadFile = (files, validExtensions = [], folderTarget = '') => {
  return new Promise((resolve, reject) => {
    const fileToUpload = files.file

    const [fileExtension] = fileToUpload.name.split('.').slice(-1)
    if (!validExtensions.includes(fileExtension)) return reject(`El tipo de archivo no es valido`)

    const uniqueFileName = `${uidGenerator()}.${fileExtension}`
    const uploadPath = path.join(__dirname, '../uploads/', folderTarget, uniqueFileName)
    fileToUpload.mv(uploadPath, err => reject(err))
    return resolve(uniqueFileName)
  })
}

const tryUploadImage = (files, folderTarget = '') =>
  tryUploadFile(files, imageFileExtensions, folderTarget)

const tryUploadTextFile = (files, folderTarget = '') =>
  tryUploadFile(files, textFileExtensions, folderTarget)

module.exports = { tryUploadFile, tryUploadImage, tryUploadTextFile }