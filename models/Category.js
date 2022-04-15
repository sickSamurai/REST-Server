const { Schema, model } = require('mongoose')

const CategorySchema = Schema({
   name: { type: String, required: true },
   isActive: { type: Boolean, default: true },
   creator: { type: Schema.Types.ObjectId, ref: 'User', required: true }
})

CategorySchema.methods.toJSON = function () {
   const { _id, __v, ...category } = this.toObject()
   category.uid = _id
   return category
}

module.exports = model('Category', CategorySchema)
