const { Schema, model } = require('mongoose')

const UserSchema = Schema({
   name: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   role: { type: String, required: true },
   isActive: { type: Boolean, default: true },
   google: { type: Boolean, default: true },
   image: { type: String }
})

UserSchema.methods.toJSON = function () {
   const { _id, __v, password, ...user } = this.toObject()
   user.uid = _id
   return user
}

module.exports = model('User', UserSchema)
