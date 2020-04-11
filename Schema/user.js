const { Schema } = require('./config')

const UserSchema = new Schema({
  username: String,
  password: String,
  token:String,
  md5:String
}, {versionKey: false})


module.exports = UserSchema