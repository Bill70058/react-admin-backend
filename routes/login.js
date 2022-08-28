/*
 * @Author: lzr lzr@email.com
 * @Date: 2022-06-12 20:42:37
 * @LastEditors: lzr lzr@email.com
 * @LastEditTime: 2022-06-12 21:48:04
 * @FilePath: /admin-backend/routes/login.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// login.js
const express = require("express");
const router = express.Router();
const User = require('../models/user.model')
const {
  generateToken
} = require("../utils/authorization");

// 路由
router.post("/", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  let status = true
  User.find({
      username,
      password
    })
    .then(users => {
      console.log(users)
      if (users.length === 0) {
        res.json({
          code: 0,
          msg: "用户名密码错误",
          data: [],
        });
      } else {
        const token = generateToken({
          username,
          password
        });
        res.json({
          code: 200,
          msg: "登录成功",
          data: {
            token
          },
        });
      }
    })
    .catch(err => res.status(400).json('Error' + err))
});

module.exports = router;
