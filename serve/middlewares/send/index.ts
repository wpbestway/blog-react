import Koa from 'koa'

export default () => {
  return async (ctx: Koa.Context, next: Function) => {
    ctx.send = (json?: object, msg?: string) => {
      ctx.set('Content-Type', 'application/json')
      ctx.body = JSON.stringify({
        code: 1,
        msg: msg || 'success',
        data: json || {}
      })
    }
    ctx.sendError = (json: object, msg?: string) => {
      ctx.set('Content-Type', 'application/json')
      ctx.body = JSON.stringify({
        code: 0,
        msg: msg || 'error',
        data: json || {},
      })
    }
    await next()
  }
}