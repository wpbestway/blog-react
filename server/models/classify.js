const db = require('../mongoose.js')

const classifySchema = db.Schema({
  name: {
    type: String,
    require: true
  },
  createTime: {
    type: Date,
    default: Date.now
  }
})

module.exports = db.model('classify', classifySchema)
