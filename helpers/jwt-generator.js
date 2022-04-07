require('dotenv').config()
const jwt = require('jsonwebtoken')

const generateJWT = (uid = '') => {
   return new Promise((resolve, reject) => {
      const payload = { uid }
      jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '4h' }, (err, data) => {
         if (err) {
            reject(err)
         } else {
            resolve(data)
         }
      })
   })
}

module.exports = generateJWT
