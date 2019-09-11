const toolModel = require('../../models/tool')

module.exports = {
  /*
   * 新增标签
   */
  async add (ctx, next) {
    let paramsData = ctx.request.body
    try {
      let data = await ctx.findOne(toolModel, { title: paramsData.tool })
      if (!data) {
        await ctx.add(toolModel, paramsData)
        ctx.send('添加成功')
      } else {
        return ctx.sendError('此标签已存在')
      }
    } catch (e) {
      console.log(e)
      ctx.sendError('server error')
    }
  },

  async update (ctx, next) {
    let paramsData = ctx.request.body
    try {
      let data = await ctx.findOne(toolModel, { _id: paramsData._id })
      if (data) {
        await ctx.update(toolModel, { _id: paramsData._id }, paramsData)
        ctx.send('修改成功')
      } else {
        return ctx.sendError('此标签不存在')
      }
    } catch (e) {
      console.log(e)
      ctx.sendError('server error')
    }
  },

  async list (ctx, next) {
    try {
      let data = await ctx.find(toolModel)
      ctx.send(data)
    } catch (e) {
      console.log(e)
      ctx.sendError('server error')
    }
  },

  async del (ctx, next) {
    try {
      let id = ctx.request.body.id
      await ctx.remove(toolModel, { _id: id })
      ctx.send('删除成功')
    } catch (e) {
      console.log(e)
      ctx.sendError('server error')
    }
  },

  async detail (ctx, next) {
    let id = ctx.request.query.id

    try {
      let data = await ctx.findOne(toolModel, { _id: id })
      ctx.send(data)
    } catch (e) {
      ctx.sendError(e)
    }
  },
}
