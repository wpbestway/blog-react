var log4js = require('log4js')
var config = require('../../config.js')
var access = require('./access.js')
const methods = ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'mark']
const env = process.env.NODE_ENV

module.exports = (options) => {
  const logger = log4js.getLogger('cheese')
  const contextLogger = {}
  let loggerConfig = {}
  let appenders = {
    cheese: {
      type: 'dateFile',
      filename: config.log.filename,
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true
    }
  }
  // 环境变量为dev local development 认为是开发环境
  if (env === 'dev' || env === 'local' || env === 'development') {
    appenders.out = {
      type: 'console'
    }
  }
  loggerConfig = {
    appenders,
    categories: {
      default: {
        appenders: Object.keys(appenders),
        level: config.log.logLevel
      }
    }
  }
  log4js.configure(loggerConfig)

  const start = Date.now()
  return async (ctx, next) => {
    methods.forEach((method) => {
      contextLogger[method] = (message) => {
        logger[method](message)
      }
    })
    ctx.logger = contextLogger
    await next()

    const end = Date.now()
    const responseTime = end - start
    logger.info(access(ctx, {message: '响应时间为：' + responseTime}))
  }
}
