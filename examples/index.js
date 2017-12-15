var strictjs = require("../server")({
  protocol : "http",
  port : 3001,
  name : "sample_server",
  host : "0.0.0.0"


})
var jwt = require("jsonwebtoken")

strictjs.strategy("JwtAuth", (req, res) => {
  const token = req.headers.authorization;
  var user = null
  jwt.verify(token, "secret_key", function (err, decode) {
    user = decode
  })
  return user

})

strictjs.before((req,res,next) => {
  console.log("before calling http")
  next()
})
strictjs.after(() => {
  console.log("after calling http")
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
  //auth: "JwtAuth"
})
// strictjs.post({
//   path: "/names",
//   handler: function (req, res) {
//     res.json({"success": "ok"})
//   },
//   auth: "JwtAuth"
// })
// strictjs.put({
//   path: "/names",
//   handler: function (req, res) {
//     res.json({"success": "ok"})
//   },
//   auth: "JwtAuth"
// })
// strictjs.delete({
//   path: "/names",
//   handler: function (req, res) {
//     res.json({"success": "ok"})
//   },
//   auth: "JwtAuth"
// })


strictjs.start()