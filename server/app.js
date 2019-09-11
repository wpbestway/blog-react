import Koa from 'koa'
import conf from './config'
import router from './router'
import middlewares from './middlewares'
import './mongoose.js'

const app = new Koa()

middlewares(app)
router(app)

app.listen(conf.port, '0.0.0.0', () => {
  console.log(`server is running at http://localhost:${conf.port}`)
})
