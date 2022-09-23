function msgTemplate(obj) {
  let {
    data,
    code,
    msg
  } = obj
  data = data || []
  code = code || 200
  msg = msg || '成功！'
  return {
    data,
    code,
    msg,
    ...obj
  }
}

module.exports = {
  msgTemplate
}
