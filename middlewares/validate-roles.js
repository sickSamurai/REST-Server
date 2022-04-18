const { response, request } = require('express')

const hasAdminRole = (req = request, res = response, next) => {
  const userLogged = req.userLogged
  if (userLogged.role !== 'admin') res.status(401).json('El usuario no es admin')
  else next()
}

const hasValidRole =
  (...roles) =>
  (req = request, res = response, next) => {
    const userLogged = req.userLogged
    if (roles.includes(userLogged.role)) next()
    else res.status(401).json('El usuario no tiene los permisos requeridos para esta acción')
  }

module.exports = { hasAdminRole, hasValidRole }
