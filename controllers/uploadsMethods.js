require('dotenv').config()
const { request, response } = require('express')
const cloudinary = require('cloudinary').v2
const path = require('path')

const { getElementIfExists: tryGetElement } = require('../helpers/db-utilites')

const User = require('../models/User')
const Product = require('../models/Product')
const Category = require('../models/Category')

cloudinary.config(process.env.CLOUDINARY_URL)

const getDatabaseModel = (colectionName = '') => {
  return { users: User, products: Product, categories: Category }[colectionName]
}

const deleteImageFromCloudinary = (imageUrl = '') => {
  const [imageName] = imageUrl.split('/').slice(-1)
  const public_id = imageName.split('.')[0]
  cloudinary.uploader.destroy(public_id)
}

const uploadImage = async (req = request, res = response) => {
  const { colection, id } = req.params
  const { tempFilePath } = req.files.file
  const databaseModel = getDatabaseModel(colection)
  const element = await tryGetElement(databaseModel, id)
  if (element.image != null) deleteImageFromCloudinary(element.image)
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath)
  element.image = secure_url
  await element.save()
  res.json(`Imagen guardada con url ${element.image}`)
}

const showImage = async (req = request, res = response) => {
  const { colection, id } = req.params
  const databaseModel = await getDatabaseModel(colection)
  const element = await tryGetElement(databaseModel, id)
  const imageID = element.image
  if (imageID != null) res.send({ image: imageID })
  else res.sendFile(path.join(__dirname, '../assets', 'no-image.jpg'))
}

module.exports = { uploadImage, showImage }
