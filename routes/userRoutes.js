const { Router } = require("express")

const {
   userPostMethod,
   userGetMethod,
   userPutMethod,
   userDeleteMethod
} = require("../controllers/userController")

const userRouter = new Router()

userRouter.post("/:id", userPostMethod)
userRouter.get("/", userGetMethod)
userRouter.put("/:id", userPutMethod)
userRouter.delete("/:id", userDeleteMethod)

module.exports = userRouter
