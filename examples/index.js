var strictjs = require("../server")()
var jwt = require("jsonwebtoken")

strictjs.strategy("JwtAuth", (req, res,callback) => {
    const token = req.headers.authorization;
    jwt.verify(token,"secret_key",function (err,decode) {
      if(decode){
        console.log(decode)
        callback(decode)
      }
    })

})

strictjs.get({
  path: "/login",
  handler: function (req, res) {
   var criteriaForJwt = {
      userID: "abc",
      role: "xyz",
      sessionID: "qwerty",
      date: new Date(),
    };
    const expireTime = {
      expiresIn: 34000,
    };
    const token = jwt.sign(criteriaForJwt, "secret_key", expireTime);
    res.json({"token": token})
  }
})


strictjs.get({
  path: "/names",
  handler: function (req, res) {
    res.json({"success": "ok"})
  },
  auth: "JwtAuth"
})
strictjs.post({
  path: "/names",
  handler: function (req, res) {
    res.json({"success": "ok"})
  },
  auth: "JwtAuth"
})
strictjs.put({
  path: "/names",
  handler: function (req, res) {
    res.json({"success": "ok"})
  },
  auth: "JwtAuth"
})
strictjs.delete({
  path: "/names",
  handler: function (req, res) {
    res.json({"success": "ok"})
  },
  auth: "JwtAuth"
})


strictjs.listen(3001)