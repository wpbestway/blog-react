import * as dbs from './db'
import Koa from 'koa'

// ts7053 error fixed
function isValidKey (key: string, obj: object): key is keyof typeof obj {
  return key in obj
}

export default () => {
  const libs: object = Object.assign({}, dbs)
 return async (ctx: Koa.Context, next: Function) => {
  for (const lib in libs) {
    if (isValidKey(lib, dbs)) {
      ctx[lib] = libs[lib]
    }
  }
  await next()
 }
}
