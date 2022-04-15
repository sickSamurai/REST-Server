const Server = require('./models/Server')
const ConnectorToDB = require('./database/connector')

const server = new Server()
const db = new ConnectorToDB()

const main = async () => {
  await db.connectDB()
  server.configMiddlewares()
  server.configRoutes()
  server.listen()
}

main()