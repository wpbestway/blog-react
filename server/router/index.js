import Router from 'koa-router'
import fs from 'fs'

const router = Router()

module.exports = (app) => {
  router.get('/', async (ctx, next) => {
    ctx.response.type = 'html'
    ctx.response.body = fs.createReadStream('./admin/dist/index.html')
    await next()
  })

  // client
  router.get('/client/blog/list', app.client.blog.list)
  router.get('/client/article/detail', app.client.blog.detail)
  router.get('/client/series/list', app.client.series.list)

  // admin
  router.post('/admin/user/login', app.admin.user.login)
  router.post('/admin/user/logout', app.admin.user.logout)
  router.post('/admin/user/add', app.admin.user.add)
  router.post('/admin/user/del', app.admin.user.del)
  router.get('/admin/user/info', app.admin.user.info)
  router.get('/admin/user/list', app.admin.user.list)

  router.post('/blog/add', app.admin.blog.add)
  router.post('/blog/modify', app.admin.blog.modify)
  router.get('/blog/getqiniutoken', app.admin.qiniu.gettoken)
  router.get('/blog/list', app.admin.blog.list)
  router.get('/blog/del', app.admin.blog.del)
  router.get('/blog/detail', app.admin.blog.detail)

  router.post('/tag/add', app.admin.tag.add)
  router.post('/tag/update', app.admin.tag.update)
  router.post('/tag/del', app.admin.tag.del)
  router.get('/tag/list', app.admin.tag.list)

  router.post('/tool/add', app.admin.tool.add)
  router.post('/tool/update', app.admin.tool.update)
  router.post('/tool/del', app.admin.tool.del)
  router.get('/tool/list', app.admin.tool.list)
  router.get('/tool/detail', app.admin.tool.detail)

  router.post('/classify/add', app.admin.classify.add)
  router.post('/classify/update', app.admin.classify.update)
  router.post('/classify/del', app.admin.classify.del)
  router.get('/classify/list', app.admin.classify.list)

  router.post('/series/add', app.admin.series.add)
  router.post('/series/update', app.admin.series.update)
  router.post('/series/del', app.admin.series.del)
  router.get('/series/list', app.admin.series.list)
  router.get('/series/detail', app.admin.series.detail)

  router.post('/qiniu/delete', app.admin.qiniu.deleteResource)
  router.post('/qiniu/getlist', app.admin.qiniu.getList)

  router.post('/comment/add', app.admin.comment.add)
  router.post('/comment/del', app.admin.comment.del)
  router.get('/comment/list', app.admin.comment.list)

  app.use(router.routes()).use(router.allowedMethods())
}
