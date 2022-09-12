const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userInfoSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  route: Array
}, {
  timestamps: true,
});

const UserInfo = mongoose.model('UserInfo', userInfoSchema);

module.exports = UserInfo;
