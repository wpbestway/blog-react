const seriesModel = require('../../models/series.js')
const blogModel = require('../../models/blog.js')

module.exports = {
  async add (ctx, next) {
    let paramsData = ctx.request.body
    try {
      await ctx.add(seriesModel, paramsData)
      ctx.send('添加成功')
    } catch (e) {
      console.log(e)
      ctx.sendError('server error')
    }
  },
  async list (ctx, next) {
    try {
      let data = await ctx.find(seriesModel, {}, {}, {lean: true})
      for (let i = 0; i < data.length; i++) {
        let series = data[i]
        let bloglist = await ctx.find(blogModel, { series: series._id })
        bloglist.forEach(blog => {
          blog = {
            title: blog.title,
            _id: blog._id
          }
        })
        series.bloglist = bloglist
      }
      ctx.send(data)
    } catch (e) {
      console.log(e)
      ctx.sendError('server error')
    }
  },
  async detail (ctx, next) {
    let queryData = ctx.request.query
    try {
      let data = await ctx.findOne(seriesModel, {_id: queryData._id})
      ctx.send(data)
    } catch (e) {
      console.log(e)
      ctx.sendError('server error')
    }
  },
  async del (ctx, next) {
    let id = ctx.request.body.id
    try {
      let data = await ctx.remove(seriesModel, { _id: id })
      ctx.send(data)
      ctx.logger.error('已删除系列：' + id)
    } catch (e) {
      console.log(e)
      ctx.sendError('server error')
    }
  },
  async update (ctx, next) {
    let paramsData = ctx.request.body
    try {
      let data = await ctx.findOne(seriesModel, { _id: paramsData._id })
      if (data) {
        await ctx.update(seriesModel, { _id: paramsData._id }, paramsData)
        ctx.send('修改成功')
      } else {
        return ctx.sendError('此系列不存在,请创建')
      }
    } catch (e) {
      console.log(e)
      ctx.sendError('server error')
    }
  }
}
