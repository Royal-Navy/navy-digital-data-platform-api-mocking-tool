const fs = require('fs')
const path = require('path')

// Each resolver must included here so as to be
// included in the resolvers found below.
const DataSource = require('./Type/DataSource')
const MockedBackEndDataSource = require('./Type/MOCK/MockedBackEndDataSource')
const Query = require('./Query')

// Read the schema.graphql
const typeDefs = fs.readFileSync(path.join(__dirname, 'schema.graphql'), {
  encoding: 'utf8',
  flag: 'r',
})

// Gather all the resolvers together (from above)
const resolvers = {
  DataSource,
  MockedBackEndDataSource,
  Query,
}

// Export resolvers and typedefs for server creation
module.exports = { resolvers, typeDefs }
