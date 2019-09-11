const db = require('../mongoose.js')

const tagSchema = db.Schema({
  name: {
    type: String,
    require: true
  },
  createTime: {
    type: Date,
    default: Date.now
  }
})

module.exports = db.model('tag', tagSchema)
