const { request } = require("express")
const { response } = require("express")

const userPostMethod = (req = request, res = response) => {
   const requestBody = req.body

   res.json({
      msg: "post api",
      body: requestBody
   })
}

const userGetMethod = (req = request, res = response) => {
   const { q, name, apikey } = req.query

   res.json({
      msg: "get api",
      q,
      name,
      apikey
   })
}

const userPutMethod = (req = request, res = response) => {
   const { id } = req.params

   res.json({
      msg: "put api",
      id
   })
}

const userDeleteMethod = (req, res = response) => {
   const { id } = req.params

   res.json({
      msg: "delete api",
      id
   })
}

module.exports = {
   userPostMethod,
   userGetMethod,
   userPutMethod,
   userDeleteMethod
}
