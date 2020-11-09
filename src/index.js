// Import external packages
const { ApolloServer } = require('apollo-server-express')
const compression = require('compression')
const cors = require('cors')
const express = require('express')

// Import local objects
const { resolvers, typeDefs } = require('./graphql')
const { logger, loggingPlugin } = require('./logging')
const { resetData } = require('./repository')

// By defult the server will start on port 8080
// but you can override this with an environment variable
const port = process.env.SERVER_PORT || 8080

// Create an instance of Apollo GraphQL server
// Using the schema and resolvers provided
// and enable the simple logging plugin to log to console
const server = new ApolloServer({
  context: ({ req }) => ({
    headers: req ? req.headers : null, // pass request headers to the instance such as jwt
  }),
  introspection: true,
  playground: true,
  plugins: [loggingPlugin],
  typeDefs,
  resolvers,
})

// Create the express app that you'll build on
const app = express()

// Allow requests when graphql server is on a different host to
// the application using it
app.use(cors())

// Some of Playground is quite big, so enable server side compress for assets > 1mb
app.use(compression({ threshold: 100000 }))

// Serve static assets, including Graphiql
app.use(express.static('public'))

// Bind the Apollo GraphQL server to Express
server.applyMiddleware({ app })

// Allow the data to be reset
app.get('/reset', (req, res) => {
  logger.log({
    level: 'info',
    message: `Reset Data`,
  })
  resetData()
  res.send('Done')
})

// Start the server
app.listen(port, () => {
  logger.log({
    level: 'info',
    message: `🚀 Navy Digital Data Platform API Mocking Tool ready on Port ${port} \n` +
             `      🚀 Use the Playground to explore your data: http://localhost:${port}/ \n` +
             `      🚀 Send your App queries to: http://localhost:${port}/graphql \n`,
  })
})
