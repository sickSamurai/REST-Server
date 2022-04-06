const Role = require('../models/Role')
const User = require('../models/User')

const isRoleValid = async (role = '') => {
   const result = await Role.findOne({ role })
   if (!result) throw new Error(`El rol ${role} no existe en la BD`)
}

const existsEmail = async (email = '') => {
   const result = await User.findOne({ email })
   if (result) throw new Error(`Ya hay un usuario con el email ${email}`)
}

const existsUser = async (id = '') => {
   const result = await User.findById(id)
   if (!result) throw new Error(`No existe un usuario con el id ${id}`)
}

module.exports = { isRoleValid, existsEmail, existsUser }
