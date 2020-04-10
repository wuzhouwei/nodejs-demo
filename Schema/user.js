const { Schema } = require('./config')

const UserSchema = new Schema({
  username: String,
  password: String,
  articleNum: Number,
  commentNum: Number,
  token:String
}, {versionKey: false})


module.exports = UserSchema