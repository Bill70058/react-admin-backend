const router = require('express').Router();

let User = require('../models/user.model');
const template = require('../utils/msgTemplate')

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
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
  // let User = require('../models/user.model');
  let User = require('../models/user.model');

  router.route('/').get((req, res) => {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/add').post((req, res) => {
    const username = req.body.username;

    const newUser = new User({
      username
    });

    newUser.save()
      .then(() => res.json('User added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
})
module.exports = router;
