/*
 * @Author: lzr lzr@email.com
 * @Date: 2022-08-28 15:35:19
 * @LastEditors: lzr lzr@email.com
 * @LastEditTime: 2022-09-11 15:10:19
 * @FilePath: /react-admin-backend/app.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb://localhost:27017/react_admin";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const routerList = [{
    url: '/api/login',
    router: require('./routes/login')
  },
  // {
  //   url: '/api/*',
  //   router: require('./utils/authorization').verifyToken
  // },
  {
    url: '/api/users',
    router: require('./routes/users')
  },
  {
    url: '/api/userInfo',
    router: require('./routes/userInfo')
  }
]
console.log('---------router list----------')
for (let item of routerList) {
  app.use(item.url, item.router)
  console.log(item.url)
}
console.log('---------------------------------')

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
