const { request, response } = require('express')
const Product = require('../models/Product')

const getProducts = async (req = request, res = response) => {
   const { limit = 5, skip = 0 } = req.query
   let products, numberOfProducts
   Promise.all(
      (products = await Product.find({ isActive: true })
         .limit(Number(limit))
         .skip(Number(skip))
         .populate('creator')
         .populate('category')),
      (numberOfProducts = await Product.countDocuments({ isActive: true }))
   )
   res.json({ numberOfProducts, products })
}

const getProductByID = async (req = request, res = response) => {
   const { id } = req.params
   const product = await Product.findById(id).populate('creator').populate('category')
   res.json(product)
}

const createProduct = async (req = request, res = response) => {
   const { name, description, price, category, isDisponible } = req.body
   const creatorID = req.userLoggedIn.id
   const newProduct = new Product({ name, description, price, category, isDisponible, creator: creatorID })
   await newProduct.save()
   res.json({ msg: 'Producto guardado con exito', newProduct })
}

const updateProduct = async (req = request, res = response) => {
   const { name, description, price, category, isDisponible } = req.body
   const { productID } = req.params
   const creatorID = req.userLoggedIn.id
   const dataToPut = { name, description, price, category, isDisponible, creator: creatorID }
   await Product.findByIdAndUpdate(productID, dataToPut)
   res.json(`Producto de ID ${productID} actualizado con exito`)
}

const deleteProduct = async (req, res) => {
   const { productID } = req.params
   await Product.findByIdAndUpdate(productID, { isActive: false })
   res.json(`Producto de ID ${productID} eliminado con exito`)
}

module.exports = { getProducts, getProductByID, createProduct, updateProduct, deleteProduct }
