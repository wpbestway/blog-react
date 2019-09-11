import blogModel from '../../models/blog.js'
import tagModel from '../../models/tag.js'
import classifyModel from '../../models/classify.js'
import seriesModel from '../../models/series.js'

module.exports = {
  async detail (ctx, next) {
    let id = ctx.request.query.id

    try {
      let article = await ctx.findOne(blogModel, { _id: id })
      let before = await ctx.findOne(blogModel, { _id: { '$gt': id } })
      let after = await ctx.findOne(blogModel, { _id: { '$lt': id } })
      ctx.send({ 
        article,
        before,
        after
      })
    } catch (e) {
      ctx.sendError(e)
    }
  },

  async list (ctx, next) {
    let { search = '', tagName = '', classifyName = '', seriesName = '', tag = '', classify = '', series = '', pageindex = 1, pagesize = 30 } = ctx.request.query
    if (tagName) {
      let data = await ctx.findOne(tagModel, {name: tagName})
      tag = data._id
    }
    if (classifyName) {
      let data = await ctx.findOne(classifyModel, {name: classifyName})
      classify = data._id
    }
    if (seriesName) {
      let data = await ctx.findOne(seriesModel, {title: seriesName})
      series = data._id
    }
    try {
      let searchReg = new RegExp(search, 'i')
      let tagReg = new RegExp(tag, 'i')
      let seriesReg = new RegExp(series, 'i')
      let classifyReg = new RegExp(classify, 'i')
      let data = await ctx.findPage(blogModel, {
        $or: [
          { title: { $regex: searchReg } },
          { sub_title: { $regex: searchReg } }
        ],
        tag: { $regex: tagReg },
        series: { $regex: seriesReg },
        classify: { $regex: classifyReg },
        status: '1' // 完成状态方可返回
      }, {}, { limit: pagesize * 1, skip: (pageindex - 1) * pagesize })
      ctx.send(data)
    } catch (e) {
      ctx.sendError(e)
    }
  }
}
