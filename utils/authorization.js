const jwt = require("jsonwebtoken");

const secretKey = "secretKey";

// 生成token
module.exports.generateToken = function (payload) {
  const token =
    "Bearer " +
    jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      payload
    }, secretKey)
  return token;
};

// 验证token
module.exports.verifyToken = function (req, res, next) {
  console.log(req.baseUrl)
  let token = ''
  try {
    token = req.headers.authorization.split(" ")[1];
  } catch {
    return res.json({
      code: "405",
      msg: '无token'
    })
  }
  jwt.verify(token, secretKey, function (err, decoded) {
    if (err) {
      console.log("verify error", err);
      return res.json({
        code: "404",
        msg: "token无效"
      });
    }
    console.log("verify decoded", decoded);
    next();
  });
};
