const seriesModel = require('../../models/series.js')
const blogModel = require('../../models/blog.js')

module.exports = {
  async list (ctx, next) {
    let { title = '', id = '' } = ctx.request.query
    try {
      if (title) {
        let data = await ctx.findOne(seriesModel, {title: title})
        id = data._id
      }
      let condition = {}
      if (id) {
        condition = {
          _id: id
        }
      }
      let data = await ctx.find(seriesModel, condition, {}, {lean: true})
      // for (let i = 0; i < data.length; i++) {
      //   let series = data[i]
      //   let bloglist = await ctx.find(blogModel, { series: series._id, status: '1' })
      //   bloglist.forEach(blog => {
      //     blog = {
      //       title: blog.title,
      //       _id: blog._id
      //     }
      //   })
      //   series.bloglist = bloglist
      // }
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
  }
}
