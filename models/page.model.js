/*
 * @Author: lzr lzr@email.com
 * @Date: 2022-06-11 14:31:55
 * @LastEditors: lzr lzr@email.com
 * @LastEditTime: 2022-11-20 21:56:23
 * @FilePath: /admin-backend/models/user.model.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pageSchema = new Schema({
  grade: {
    type: Number,
    required: true,
  },
  pageId: Number,
  id: {
    type: Number,
    required: true
  },
  label: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  pagepermisson: {
    type: Number,
    required: true,
  },
  isLeaf: Boolean,
  parentId: Number
}, {
  timestamps: true,
});

const Page = mongoose.model('Page', pageSchema);

module.exports = Page;
