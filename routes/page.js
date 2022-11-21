/*
 * @Author: lzr lzr@email.com
 * @Date: 2022-11-20 14:59:48
 * @LastEditors: lzr lzr@email.com
 * @LastEditTime: 2022-11-21 22:21:42
 * @FilePath: /react-admin-backend/routes/page.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const router = require('express').Router();
let Page = require('../models/page.model');
const template = require('../utils/msgTemplate')


router.route('/').post((req, res) => {
  const grade = req.body.grade;
  const pageId = req.body.pageId
  const label = req.body.label
  const key = req.body.key
  const pagepermisson = req.body.pagepermisson
  const isLeaf = req.body.isLeaf
  const parentId = req.body.parentId

  Page.find().then((info) => {
    const newPage = new Page({
      grade,
      pageId,
      id: info.length + 1,
      label,
      key,
      pagepermisson,
      isLeaf,
      parentId
    });
    newPage.save()
      .then(() => res.json(template.msgTemplate({
        msg: '页面配置新建成功'
      })))
      .catch(err => {
        res.json({
          code: 400,
          msg: err
        })
      })
  })

});

router.route('/').get((req, res) => {
  Page.find().then(pageInfo => {
      let pageArr = pageInfo.map(item => {
        return {
          id: item.id,
          grade: item.grade,
          label: item.label,
          key: item.key,
          pagepermisson: item.pagepermisson,
          isLeaf: item.isLeaf,
          parentId: item.parentId
        }
      })
      let pageMap = {}
      pageArr.forEach(item => {
        // 如果map中没有该值，且当前值不为子节点则直接推入
        if (typeof pageMap[item.id] == 'undefined' && typeof item.parentId == 'undefined') {
          if (item.isLeaf) {
            item.children = []
          }
          pageMap[item.id] = item
        } else if (typeof item.isLeaf != 'undefined' && typeof item.parentId == 'undefined') {
          // 如果当前节点为子节点，且父节点当前没遍历到，则以父节点id为占位，将当前节点推入父节点的childre属性中
          pageMap[item.parentId] = {
            children: [item]
          }
        } else if (typeof item.id != 'undefined' && typeof item.isLeaf != 'undefined') {
          // 当前节点为父节点，且map中已有children的占位对象，则合并对象
          let tempObj = Object.assign({}, item, pageMap[item.id])
          pageMap[item.id] = tempObj
        } else {
          // 如果当前节点为子节点且以存在父节点对象则直接推入children
          pageMap[item.parentId].children.push(item)
        }
        delete item.isLeaf
        delete item.parentId
      })
      res.send(template.msgTemplate({
        data: Object.values(pageMap)
      }))
    })
    .catch(err => {
      console.log(err)
      res.send(template.msgTemplate({
        code: 500,
        msg: err
      }))
    })
})

module.exports = router;
