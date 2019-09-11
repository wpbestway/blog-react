import path from 'path'
import bodyParser from 'koa-bodyparser'
import Lib from './lib'
import Send from './send'
import Rule from './rule'

export default (app: any) => {
  app.use(Lib())

  app.use(Send())

  app.use(bodyParser())

  Rule({
    app,
    rules: [
      {
        path: path.join(__dirname, '../controller/admin'),
        name: 'admin'
      }
    ]
  })

  app.on('error', (err: any) => {
    console.log('middleware/index.ts 出错', err)
  })
}