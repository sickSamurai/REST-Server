const Server = require('./models/Server')
const ConnectorToDB = require('./database/connector')

const server = new Server()
const db = new ConnectorToDB()

server.configMiddlewares()
server.configRoutes()
server.listen()
db.connectDB()
