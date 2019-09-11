export default () => {
  return async (ctx, next) => {
    ctx.send = (json, msg) => {
      ctx.set('Content-Type', 'application/json')
      ctx.body = JSON.stringify({
        code: 1,
        data: json || {},
        msg: msg || 'success'
      })
    }
    ctx.sendError = (msg) => {
      ctx.set('Content-Type', 'application/json')
      ctx.response.body = JSON.stringify({
        code: 0,
        data: {},
        msg: msg.toString()
      })
    }
    await next()
  }
}
