const router = require('express').Router();
let User = require('../models/user.model');
const template = require('../utils/msgTemplate')

router.route('/').get((req, res) => {
  if (!req.url.includes('?')) {
    User.find()
      .then(users => res.json(template.msgTemplate({
        msg: '查询成功',
        data: users
      })))
      .catch(err => res.status(400).json('Error: ' + err));
  }
  // 分页查询：可搜索Id
  let queryData = {}
  let {pageNum, pageSize, id} =  req.query
  pageNum = Number(pageNum) || 1
  pageSize = Number(pageSize) || 10
  if (id) {
    queryData._id = id
  }
  User.find(queryData).skip((pageNum - 1)*pageSize).limit(pageSize)
      .then(queryUsers => {
        User.find()
        .then(users => res.json(template.msgTemplate({
          msg: '查询成功',
          data: {
            pageNum: pageNum,
            pageSize: pageSize,
            total: users.length,
            users: queryUsers
          }
        })))
        .catch(err => res.status(400).json('用户查询失败: ' + err));
      })
      .catch(err => res.status(400).json('用户查询失败: ' + err));
});

router.route('/').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password

  const newUser = new User({
    username,
    password
  });

  newUser.save()
    .then(() => res.json(template.msgTemplate({
      msg: '用户创建成功'
    })))
    .catch(err => {
      let msg = '创建失败' + err
      if (err) {
        if (String(err).includes('E11000'))
          msg = '用户已存在'
        res.json({
          code: 400,
          msg: msg
        })
      }
    });
});

// path: /users/update
router.route('/update').put((req, res) => {
  // const id = req.body.id
  const oldName = req.body.oldName
  const username = req.body.username;

  User.update({
      username: oldName
    }, {
      $set: {
        username
      }
    })
    .then(() => res.json(template.msgTemplate({
      msg: '用户更新成功'
    })))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/updateById').put((req, res) => {
  const id = req.body.id
  const username = req.body.username;

  User.findByIdAndUpdate(id, {
      $set: {
        username
      }
    })
    .then(() => res.json(template.msgTemplate({
      msg: '用户更新成功'
    })))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/deleteById').delete((req, res) => {
  const id = req.body.id
  User.findByIdAndDelete(id).then(() => res.json(template.msgTemplate({
    msg: '用户删除成功'
  })))
  .catch(err => res.status(400).json('Error: ' + err));
})
module.exports = router;
