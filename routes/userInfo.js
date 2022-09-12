/*
 * @Author: lzr lzr@email.com
 * @Date: 2022-09-11 14:55:28
 * @LastEditors: lzr lzr@email.com
 * @LastEditTime: 2022-09-11 15:27:09
 * @FilePath: /react-admin-backend/routes/userInfo.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const router = require('express').Router();

let UserInfo = require('../models/userInfo.model');
const template = require('../utils/msgTemplate')

// router.route('/').get((req, res) => {
//   UserInfo.find()
//     .then(users => res.json(users))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

router.route('/').post((req, res) => {
  const username = req.body.username;
  const route = req.body.route

  const newUserInfo = new UserInfo({
    username,
    route
  });

  newUserInfo.save()
    .then(() => res.json(template.msgTemplate({
      msg: '用户信息创建成功'
    })))
    .catch(err => {
      let msg = '用户信息创建失败' + err
      if (err) {
        res.json({
          code: 400,
          msg: err
        })
      }
    });
});

router.route('/query').post((req, res) => {
  const username = req.body.username
  UserInfo.find({
    username
  }).then(data => {
    res.json(template.msgTemplate({
      msg: '用户信息查询成功',
      data: data[0].route
    }))
  }).catch(err => {
    let msg = '用户信息查询失败' + err
    if (err) {
      res.json({
        code: 400,
        msg: err
      })
    }
  });
})

module.exports = router;
