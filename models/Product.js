const { Schema, model } = require('mongoose')

const ProductSchema = Schema({
   name: { type: String, required: true },
   description: { type: String },
   price: { type: Number, default: 0 },
   isDisponible: { type: Boolean, default: true },
   category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
   creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
   isActive: { type: Boolean, default: true }
})

ProductSchema.methods.toJSON = function () {
   const { _id, __v, password, ...user } = this.toObject()
   user.uid = _id
   return user
}

module.exports = model('Product', ProductSchema)
