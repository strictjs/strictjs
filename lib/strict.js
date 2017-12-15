var http = require('http');
var route = require("./routes");
var response = require("./response")
var request = require("./request")
var middleware = require('./middleware');
var postprocess = require('./postprocess');
var auth = require('./auth');

function StrictJs() {
  var server = http.createServer(function (req, res) {
    var match = route.match(req);
    var state = true
    if (match.auth) {
      state = auth.authenticate(match.auth, req, res)
    }
    if (state) {
      response(res);
      request(req);
      if (match) {
        middleware.run(req, res, match.handler);
      }
      else {
        res.json({"statusCode": 404})
      }
      postprocess.run(req, res)
    }
  })
  var listen = function (port) {
    server.listen(port, function () {
      console.log("server is listning at : " + port);
    })

  }
  return {
    listen: listen,
    get: route.get,
    post: route.post,
    put: route.put,
    delete: route.delete,
    before: middleware.before,
    after: postprocess.after,
    strategy: auth.strategy
  }
}


module.exports = StrictJs;
