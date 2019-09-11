import Koa from 'koa';
import router from './router/index'
import middlewares from './middlewares'
import './mongoose'
import conf from './config'

const app = new Koa()

middlewares(app)
router(app)

app.listen(conf.port, '0.0.0.0', () => {
  console.log(`server is running at http://localhost:${conf.port}`)
})
