import blogModel from '../../models/blog.js'

module.exports = {
  async add (ctx, next) {
    let paramsData = ctx.request.body

    try {
      let data = await ctx.findOne(blogModel, { title: paramsData.title })
      if (data) {
        ctx.sendError('此标题已存在，请更换标题')
      } else {
        await ctx.add(blogModel, paramsData)
        ctx.send(paramsData)
      }
    } catch (e) {
      ctx.sendError(e)
    }
  },

  async modify (ctx, next) {
    let paramsData = ctx.request.body

    try {
      await ctx.update(blogModel, { _id: paramsData._id }, paramsData)
      ctx.send()
    } catch (e) {
      ctx.sendError(e)
    }
  },

  async del (ctx, next) {
    let id = ctx.request.query.id

    try {
      await ctx.remove(blogModel, { _id: id })
      ctx.send()
    } catch (e) {
      ctx.sendError(e)
    }
  },

  async detail (ctx, next) {
    let id = ctx.request.query.id

    try {
      let data = await ctx.findOne(blogModel, { _id: id })
      ctx.send(data)
    } catch (e) {
      ctx.sendError(e)
    }
  },

  async list (ctx, next) {
    let { keyword = '', pageindex = 1, pagesize = 10 } = ctx.request.query
    try {
      let reg = new RegExp(keyword, 'i')
      let data = await ctx.findPage(blogModel, {
        $or: [
          { title: { $regex: reg } },
          { sub_title: { $regex: reg } }
        ]
      }, {}, { limit: pagesize * 1, skip: (pageindex - 1) * pagesize })
      ctx.send(data)
    } catch (e) {
      ctx.sendError(e)
    }
  }
}
