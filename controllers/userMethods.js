const { request, response } = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/User')

const saltRounds = 10

const createUser = async (req = request, res = response) => {
  const user = new User(req.body)
  user.password = bcrypt.hashSync(user.password, saltRounds)
  user
    .save()
    .then(result => res.json({ msg: `Usuario creado con id ${result.id}` }))
    .catch(err => res.status(400).json({ info: 'Error al crear usuario en BD', err }))
}

const getUsers = async (req = request, res = response) => {
  const { limit = 10, skip = 0 } = req.query
  const statusFilter = { isActive: true }
  let users, usersNumber
  Promise.all([
    (users = await User.find(statusFilter).limit(Number(limit)).skip(Number(skip))),
    (usersNumber = await User.countDocuments(statusFilter))
  ])
  res.json({ usersNumber, users })
}

const updateUser = async (req = request, res = response) => {
  const { id } = req.params
  const { google, email, ...other } = req.body
  other.password = bcrypt.hashSync(other.password, saltRounds)
  const user = await User.findByIdAndUpdate(id, other)
  res.json(`Usuario de id ${user._id} actualizado`)
}

const deleteUser = async (req, res = response) => {
  const { id } = req.params
  const userLogged = req.userLoggedIn
  await User.findByIdAndUpdate(id, { isActive: false })
  res.json(`Usuario de id ${id} eliminado por usuario de email ${userLogged.email}`)
}

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser
}
