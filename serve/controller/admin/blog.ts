import blogModel from '../../models/blogs'
import Koa from 'koa'

module.exports = {
  async list (ctx: Koa.Context, next: Function) {
    const keyword: string = ctx.request.query.keyword
    const pageindex: number = ctx.request.query.page
    const pagesize: number = ctx.request.query.pagesize
    try {
      const reg = new RegExp(keyword, 'i')
      const data = await ctx.findPage(blogModel, {
        $or: [
          { title: { $regex: reg } },
        ]
      }, {}, { limit: pagesize * 1, skip: (pageindex - 1) * pagesize })
      ctx.send(data)
    } catch (e) {
      ctx.send(e)
    }
  },
  async detail (ctx: Koa.Context, next: Function) {
    const id: string = ctx.request.query.id
    try {
      const data: object = await ctx.findOne(blogModel, { _id: id })
      ctx.send(data)
    } catch (e) {
      ctx.sendError(e)
    }
  }
}