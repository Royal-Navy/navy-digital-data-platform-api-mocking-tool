const { getData } = require('../../repository')

const dataSources = (_, { dataType }) => {
  const data = getData()

  const result = dataType
    ? data.dataSources.filter((dataSource) => dataSource.dataType === dataType)
    : data.dataSources

  return result
}

module.exports = dataSources
