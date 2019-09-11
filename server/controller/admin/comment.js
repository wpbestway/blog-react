const commentModel = require('../../models/comment')

module.exports = {
  /*
   * 新增评论
   */
  async add (ctx, next) {
    let paramsData = ctx.request.body
    try {
      let data = await ctx.find(commentModel, {blogId: paramsData.blogId})
      if (data.length >= 200) {
        ctx.sendError('评论太多，此篇博客评论功能已关闭')
        return
      }
      await ctx.add(commentModel, paramsData)
      ctx.send('添加成功')
    } catch (e) {
      console.log(e)
      ctx.sendError('server error')
    }
  },
  
  async list (ctx, next) {
    const blogId = ctx.request.query.blogId
    try {
      let data = await ctx.find(commentModel, {blogId: blogId})
      ctx.send(data)
    } catch (e) {
      console.log(e)
      ctx.sendError('server error')
    }
  },

  async del (ctx, next) {
    try {
      let id = ctx.request.body.id
      await ctx.remove(commentModel, { _id: id })
      ctx.send('删除成功')
    } catch (e) {
      console.log(e)
      ctx.sendError('server error')
    }
  }
}
