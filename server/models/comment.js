const db = require('../mongoose.js')

const commentSchema = db.Schema({
  content: {
    type: String,
    require: true
  },
  createTime: {
    type: Date,
    default: Date.now
  },
  blogId: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  replyFromName: {
    type: String
  },
  replyFromEmail: {
    type: String,
    require: true
  },
  header: {
    type: String
  },
  praise: {
    type: Number
  }
})

module.exports = db.model('comment', commentSchema)
