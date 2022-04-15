const { request, response } = require('express')
const User = require('../models/User')
const Product = require('../models/Product')
const Category = require('../models/Category')

const getUsers = async (term = '') => {
  const regularExpression = RegExp(term, 'i')
  const result = await User.find({
    isActive: true,
    $or: [{ name: regularExpression }, { email: regularExpression }]
  })
  return result == null ? [] : result
}

const getCategories = async (term = '') => {
  const regularExpression = RegExp(term, 'i')
  const result = await Category.find({
    isActive: true,
    name: regularExpression
  })
  return result == null ? [] : result
}

const getProducts = async (term = '') => {
  const regularExpression = RegExp(term, 'i')
  const result = await Product.find({
    isActive: true,
    name: regularExpression
  })
  return result == null ? [] : result
}

const search = async (req = request, res = response) => {
  const { colection, searchTerm } = req.params
  switch (colection) {
    case 'users':
      res.json(await getUsers(searchTerm))
      break
    case 'products':
      res.json(await getProducts(searchTerm))
      break
    case 'categories':
      res.json(await getCategories(searchTerm))
      break
    default:
      res.status(500).json('Caso no implementado aún')
      break
  }
}

module.exports = { search }
