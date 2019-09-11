const db = require('../mongoose.js')

const seriesSchema = db.Schema({
  title: {
    type: String,
    require: true
  },
  description: {
    type: String
  },
  createTime: {
    type: String,
    default: new Date()
  },
  praise: {
    type: Number,
    default: 0
  },
  avatar: {
    type: String
  },
  state: {
    type: Number,
    default: 0
  }
})

module.exports = db.model('series', seriesSchema)
