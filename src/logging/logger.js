const winston = require('winston')
const path = require('path')

// Default logging variables
const level = 'info'
const logFolder = ''
const logToConsole = true
const logToFile = false
const maxFiles = 10
const maxsize = 10000000 // 10MB

// Create a Winston logger
const logger = winston.createLogger({
  level,
})

// Logging to Console
if (logToConsole) {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.simple()),
    })
  )
}

// Logging to File
if (logToFile) {

  // Add error log file
  logger.add(
    new winston.transports.File({
      filename: path.join(logFolder, 'error.log'),
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      level: 'error',
      maxsize,
      maxFiles,
    })
  )

  // Add combined log file
  logger.add(
    new winston.transports.File({
      filename: path.join(logFolder, 'combined.log'),
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      maxsize,
      maxFiles,
    })
  )
}

// Export logger
module.exports = logger
