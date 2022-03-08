const { request } = require("express")
const { response } = require("express")
const User = require("../models/User")

const userPostMethod = (req = request, res = response) => {
   const user = new User(req.body)
   user.save()
   
   res.json({
      msg: "post api",
      user
   })
}

const userGetMethod = (req = request, res = response) => {
   res.json({
      msg: "get api"
   })
}

const userPutMethod = (req = request, res = response) => {
   res.json({
      msg: "put api"
   })
}

const userDeleteMethod = (req, res = response) => {
   res.json({
      msg: "delete api"
   })
}

module.exports = {
   userPostMethod,
   userGetMethod,
   userPutMethod,
   userDeleteMethod
}
