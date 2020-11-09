const { cloneDeep } = require('lodash')
const defaultData = require('../../data/mockData.json')

// A small wrapper around the demo data that
// alows it to be reset.
// This is useful if testing mutations.

let dataSources

const getData = () => {
  return dataSources
}

const resetData = () => {
  dataSources = cloneDeep(defaultData)
}

resetData()

module.exports = { getData, resetData }
