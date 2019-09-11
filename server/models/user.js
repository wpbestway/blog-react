const db = require('../mongoose.js')

const UserSchema = db.Schema({
  username: {
    type: String,
    unique: true,
    require: true
  },
  pwd: {
    type: String,
    require: true
  },
  name: {
    type: String
  },
  createTime: {
    type: Date,
    default: new Date()
  },
  loginTime: {
    type: Date
  },
  avatar: {
    type: String
  },
  roles: {
    type: Array,
    default: ['admin']
  }
})

module.exports = db.model('user', UserSchema)
