const { request, response } = require('express')
const Category = require('../models/Category')

const getCategories = async (req = request, res = response) => {
  const { limit = 10, skip = 0 } = req.query
  let categories, numberOfCategories
  const statusFilter = { isActive: true }
  Promise.all(
    (categories = await Category.find(statusFilter)
      .limit(Number(limit))
      .skip(Number(skip))
      .populate('creator')),
    (numberOfCategories = await Category.countDocuments(statusFilter))
  )
  res.json({ numberOfCategories, categories })
}

const getCategoryByID = async (req = request, res = response) => {
  const { id } = req.params
  const category = await Category.findById(id).populate('creator')
  res.json(category)
}

const createCategory = async (req = request, res = response) => {
  const { name } = req.body
  const creatorID = req.userLoggedIn.id
  const category = new Category({ name, creator: creatorID })
  await category.save()
  res.status(201).json({ msg: 'Categoria creada', category })
}

const updateCategory = async (req = request, res = response) => {
  const { id } = req.params
  const { name } = req.body
  const creatorID = req.userLoggedIn.id
  const dataToPut = { name, creator: creatorID }
  const categoryToUpdate = await Category.findByIdAndUpdate(id, dataToPut)
  res.status(201).json({ msg: 'Categoria actualizada', categoryToUpdate, dataUpdated: dataToPut })
}

const deleteCategory = async (req = request, res = response) => {
  const { id } = req.params
  const dataToPut = { isActive: false }
  const categoryToDelete = await Category.findByIdAndUpdate(id, dataToPut)
  res.status(201).json({ msg: 'Categoria eliminada', categoryToDelete })
}

module.exports = { getCategories, getCategoryByID, createCategory, updateCategory, deleteCategory }
