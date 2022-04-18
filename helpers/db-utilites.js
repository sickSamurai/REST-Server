const { model } = require('mongoose')
const Category = require('../models/Category')
const Product = require('../models/Product')
const Role = require('../models/Role')
const User = require('../models/User')

const getElementIfExists = async (databaseModel = model(''), id = '') => {
  return new Promise(async (resolve, reject) => {
    result = await databaseModel.findById(id)
    if (!result) reject(`No existe el elemento ${id} en la colección`)
    else resolve(result)
  })
}

const existsRole = async (role = '') => {
  const result = await Role.findOne({ role })
  if (!result) throw new Error(`El rol ${role} no existe en la BD`)
}

const notExistsCategoryWithSameName = async (name = '') => {
  const result = await Category.findOne({ name })
  if (result) throw new Error(`Ya existe una categoria llamada ${name}`)
}

const existsCategory = async (id = '') => {
  const result = await Category.findById(id)
  if (!result) throw new Error(`No existe una categoria con el id ${id}`)
}

const notExistsEmail = async (email = '') => {
  const result = await User.findOne({ email })
  if (result) throw new Error(`Ya hay un usuario con el email ${email}`)
}

const existsUser = async (id = '') => {
  const result = await User.findById(id)
  if (!result) throw new Error(`No existe un usuario con el id ${id}`)
}

const existsProduct = async (id = '') => {
  const result = await Product.findById(id)
  if (!result) throw new Error(`No existe un producto con el id ${id}`)
}

module.exports = {
  notExistsCategoryWithSameName,
  existsCategory,
  existsRole,
  notExistsEmail,
  existsUser,
  existsProduct,
  getElementIfExists
}
