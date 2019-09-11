import path from 'path'
import bodyParser from 'koa-bodyparser'
// import userModel from '../models/user.js'
import lib from './lib'
import Send from './send'
import Rule from './rule'
import Logger from './logs'

module.exports = app => {
  app.use(lib())

  app.use(Logger())

  app.use(Send())

  app.use(bodyParser())

  Rule({
    app,
    rules: [
      {
        path: path.join(__dirname, '../controller/admin'),
        name: 'admin'
      },
      {
        path: path.join(__dirname, '../controller/client'),
        name: 'client'
      }
    ]
  })

  // app.use(async (ctx) => {
  //   await ctx.add(userModel, {
  //     'name': 'admin',
  //     'pwd': 'admin',
  //     'username': 'admin',
  //     'roles': ['admin']
  //   })
  // })

  app.on('error', (err, ctx) => {
    console.log('middleware/index.js 出错' + err)
  })
}
