import * as dbs from './db.js'

export default () => {
  const libs = Object.assign({}, dbs)
  return async (ctx, next) => {
    for (let lib in libs) {
      ctx[lib] = libs[lib]
    }
    await next()
  }
}
