const classifyModel = require('../../models/classify')

module.exports = {
  /* 
   * 新增标签
   */
  async add (ctx, next) {
    let paramsData = ctx.request.body
    try {
      let data = await ctx.findOne(classifyModel, { name: paramsData.name })
      if (!data) {
        await ctx.add(classifyModel, paramsData)
        ctx.send('添加成功')
      } else {
        return ctx.sendError('此分类已存在')
      }
    } catch (e) {
      console.log(e)
      ctx.sendError('server error')
    }
  },

  async update (ctx, next) {
    let paramsData = ctx.request.body
    try {
      let data = await ctx.findOne(classifyModel, { _id: paramsData._id })
      if (data) {
        await ctx.update(classifyModel, { _id: paramsData._id }, paramsData)
        ctx.send('修改成功')
      } else {
        return ctx.sendError('此分类不存在')
      }
    } catch (e) {
      console.log(e)
      ctx.sendError('server error')
    }
  },

  async list (ctx, next) {
    try {
      let data = await ctx.find(classifyModel)
      ctx.send(data)
    } catch (e) {
      console.log(e)
      ctx.sendError('server error')
    }
  },

  async del (ctx, next) {
    try {
      let id = ctx.request.body.id
      await ctx.remove(classifyModel, { _id: id })
      ctx.send('删除成功')
    } catch (e) {
      console.log(e)
      ctx.sendError('server error')
    }
  }
}
