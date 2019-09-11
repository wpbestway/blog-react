import Koa from 'koa'

import Router from 'koa-router'
import fs from 'fs'

const router = new Router()
export default (app: any): void => {
  router.get('/', async (ctx: Koa.Context, next: Function) => {
    ctx.response.type = 'html'
    ctx.response.body = fs.createReadStream('../admin/dist/index.html', 'utf8')
    await next()
  })
  router.get('/admin/blog/list', app.admin.blog.list)
  router.get('/admin/blog/detail', app.admin.blog.detail)

  router.get('/admin/user/prelogin', app.admin.user.prelogin)
  router.post('/admin/user/login', app.admin.user.login)

  app.use(router.routes()).use(router.allowedMethods())
}
