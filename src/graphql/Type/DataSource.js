/*
This running example includes one data source.
If you add a second source then the resolving data source
must be dynamic to the data source type being requested.

This file dynamically changes between these through using the
case and return options which can be extended to your needs.

This ensures your resolvers are based upon the query being requested.
*/
const DataSource = {
  __resolveType(parent) {
    switch (parent.dataType) {
      case 'MockerType':
        return 'MockedBackEndDataSource'
      default:
    }

    return 'DataSource'
  },
}

module.exports = DataSource
