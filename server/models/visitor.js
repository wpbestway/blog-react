const db = require('../mongoose.js')

const visitorSchema = db.Schema({
  name: {
    type: String,
    require: true
  },
  header: {
    type: String
  }
})

module.exports = db.model('visitor', visitorSchema)
