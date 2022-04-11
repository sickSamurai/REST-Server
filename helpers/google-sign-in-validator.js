require('dotenv').config()
const { OAuth2Client } = require('google-auth-library')

const clientID = process.env.GOOGLE_CLIENT_ID
const client = new OAuth2Client(clientID)

async function getGoogleSignInInfo(token) {
   try {
      const ticket = await client.verifyIdToken({ idToken: token, audience: clientID })
      const { name, email, picture: image } = ticket.getPayload()
      return { name, email, image }
   } catch (error) {
      console.log(error)
   }
}

module.exports = getGoogleSignInInfo
