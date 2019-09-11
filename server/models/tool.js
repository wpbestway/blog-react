const db = require('../mongoose.js')

const toolSchema = db.Schema({
  title: {
    type: String,
    require: true
  },
  content: {
    type: String,
    require: true
  },
  render_content: {
    type: String,
    require: true
  },
  createTime: {
    type: Date,
    default: () => {
      return Date.parse(new Date())
    }
  }
})

module.exports = db.model('tool', toolSchema)
