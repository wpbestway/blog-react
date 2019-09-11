import jwt from 'jsonwebtoken'
import conf from '../../config'
const userModel = require('../../models/user');

module.exports = {
  async login (ctx, next) {
    console.log('------------ 登录user/login ----------')
    let {username, pwd} = ctx.request.body
    try {
      let data = await ctx.findOne(userModel, {username: username})
      // console.log(data)
      if (!data) {
        return ctx.sendError('用户名不存在')
      }
      console.log(pwd, data.pwd)
      if (pwd !== data.pwd) {
        return ctx.sendError('密码错误，请重新输入！')
      }
      await ctx.update(userModel, {_id: data._id}, {$set: {loginTime: new Date()}})
      let payload = {
        _id: data._id,
        username: data.username,
        name: data.name,
        roles: data.roles
      }
      let token = jwt.sign(payload, conf.auth.admin_secret, {expiresIn: '24h'})
      ctx.cookies.set(conf.auth.tokenKey, token, {
        httpOnly: false
      })
      ctx.send({message: '登录成功'})
    } catch(err) {
      if (e === '暂无数据') {
        console.log('用户不存在')
        return ctx.sendError('用户不存在')
      }
      ctx.throw(e)
      ctx.sendError(e)
    }
  },

  async info (ctx, next) {
    let token = ctx.request.query.token
    console.log(token)
    try {
      let tokenInfo = jwt.verify(token, conf.auth.admin_secret)
      console.log(tokenInfo)
    } catch (err) {
      console.log('err')
    }
    ctx.send({
      roles: ['admin'],
      name: 'admin',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
    })
  },

  async list (ctx, next) {
    let { keyword='', pageindex = 1, pagesize = 10 } = ctx.request.query
    // console.log(keyword, pageindex, pagesize)
    try {
      let reg = new RegExp(keyword, 'i')
      let data = await ctx.findPage(userModel, {
        $or: [
          {name: { $regex: reg }},
          {username: {$regex: reg }}
        ]
      }, { pwd: 0 }, { limit: pagesize * 1, skip: (pageindex - 1) * pagesize })
      ctx.send(data)
    } catch (err) {

    }
  },

  async logout (ctx, next) {
    ctx.cookies.set(conf.auth.tokenKey, '')
    ctx.send('success')
  },

  async add (ctx, next) {
    console.log('---------添加管理员--------');
    let paramsData = ctx.request.body
    try {
      let data = await ctx.findOne(userModel, {name: paramsData.name})
      if (data) {
        ctx.sendError('该用户已经存在，请更换用户名')
      } else {
        await ctx.add(userModel, paramsData)
        ctx.send(paramsData)
      }
    } catch (e) {
      ctx.sendError(e)
    }
  },

  async del(ctx, next) {
    console.log('---------删除管理员--------');
    let id = ctx.request.body.id
    try {
      let data = await ctx.remove(userModel, { _id: id })
      console.log(data)
      ctx.send()
      return
    } catch (e) {
      ctx.sendError(e)
    }
  }
}
