var http = require('http');
var route = require("./routes");
var response = require("./response")
var request = require("./request")
var middleware = require('./middleware');
var postprocess = require('./postprocess');
var auth = require('./auth');
var validation = require("./validation")

/*
* @Input
* {
*   host : "0.0.0.0"
*   protocol :"http",
*   port : "3001",
*   name : "server name"
*   tls : {
*     key : "path_to_key",
*     cert : "path_to_cert"
*   }
* }
* */


//context global
var cg = {}


//TODO mashup in Main Function
var server = {}
function StrictJs(context) {
  cg = context;

  server = getInstancePW(context,async function (req, res) {
    response(res);
    request(req);
    var match = route.match(req);
    var state = true
    if(match.validation){
     state = await validation.validate(match,req,res)
    }
    if (match.auth) {
      state = auth.authenticate(match.auth, req, res)
    }

    if (state) {

      if (match) {
        middleware.run(req, res, match.handler);
      }
      else {
        res.json({"statusCode": 404}) //TODO handle this ASAP
      }
      postprocess.run(req, res)
    }
  })


  var start = function (port,cb) {
    // switch(cg.host){
    //
    // }
    switch(typeof port){
      case "function" :
        server.listen(cg.port,cg.host ?  cg.host : "0.0.0.0", function () {
          port(server.listening)
        })
        break;
      case "number" :
        server.listen(port,cg.host ?  cg.host : "0.0.0.0", function () {
         typeof cb == "function" ? cb(server.listening) :  listnerLog()
        })
        break;
      case "undefined" :
        server.listen(cg.port ? cg.port : "0",cg.host ?  cg.host : "0.0.0.0", function () {
          listnerLog()
        })

    }


  }

  return {
    start: start,
    get: route.get,
    post: route.post,
    put: route.put,
    delete: route.delete,
    before: middleware.before,
    after: postprocess.after,
    strategy: auth.strategy
  }
}

/*
* Instance protocol wise  instance
* */

function getInstancePW(context,cb){
  switch(context.protocol){
    case "http" :
      return require("http").createServer(cb);
    break;
    case "https":
      return require("https").createServer(context.tls , cb)
    case "http2":
      return require("http2")  //TODO http2 support later
  }
}

function listnerLog(){
  switch(typeof cg.port){
    case "number" :
      console.log("server is running on ",server.address().port)
      break;
    case "undefined":
      console.log("Port not specified! server is running on ",server.address().port)

  }
}

/*
* Handing Server level events
* */

module.exports = StrictJs;
