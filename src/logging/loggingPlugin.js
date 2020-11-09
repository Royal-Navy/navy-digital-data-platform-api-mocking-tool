const { get } = require('lodash')
const { v4: uuidv4 } = require('uuid')

const logger = require('./logger')

// A helpful logging plugin for Apollo GraphQL
// This will listen for Apollo server events and
// send log output to the console when this happens
// This allows the developer to see queries sent to the server
const loggingPlugin = {
  requestDidStart(request) {
    const queryId = uuidv4() // unique id to tie log entries together

    // Log when request first arrives at server
    logger.log({
      level: 'info',
      message: `${get(request, 'request.operationName')}:Start`,
      queryId,
    })

    // Log queries as made by the user
    logger.log({
      level: 'debug',
      message: `${get(request, 'request.operationName')}:Query`,
      query: get(request, 'request.query'),
      args: get(request, 'request.variables'),
    })

    return {
      // When a query has been processed and the result is being sent to client
      willSendResponse(requestContext) {
        logger.log({
          level: 'info',
          message: `${get(requestContext, 'request.operationName')}:End`,
          queryId,
        })
      },
      // Capture and log errors
      didEncounterErrors(requestContext) {
        logger.log({
          level: 'error',
          message: `Error running query ${get(
            requestContext,
            'request.operationName'
          )}`,
          query: get(requestContext, 'request.query'),
          args: get(requestContext, 'request.variables'),
          queryId,
        })

        logger.log({
          level: 'error',
          message: get(requestContext, 'errors[0].message'),
          errors: requestContext.errors,
          queryId,
        })
      },
    }
  },
}

// Export logging plugin
module.exports = loggingPlugin
