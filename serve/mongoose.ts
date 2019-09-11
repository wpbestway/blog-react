import mongoose from 'mongoose'
import conf from './config'

mongoose.set('debug', true)

const DB_URL = `mongodb://${conf.mongodb.address}/${conf.mongodb.db}`

mongoose.Promise = global.Promise

mongoose.connect(DB_URL, (err: any) => {
  if (err) {
    console.log('mongoose 连接失败')
  }　else {
    console.log('mongoose 连接成功')
  }
})

export default mongoose
