/*
 * Communication over tcp protocol server
 * */


const isAuth = false
const net = require('net');
const fn = require("./fn")
const util = require("./util")
const discovery = require("./discovery")
const client = require("./client")


// {"fn" :"abc" ,"payload": {"name": "rahul"}}

var cfg = {}
function startCom(cfgP) {
  cfg = cfgP
    const server = net.createServer((c) => {
      c.on('end', () => {
        console.log('client disconnected');
      });
      c.on("data", function (data) {
        var jsonData = data.toString().trim()
        util.register(c)
        try {
          jsonData = JSON.parse(jsonData);
          var fName = jsonData.fn ? jsonData.fn : util.responseIssue(c);
          var fPayload = jsonData.payload ? jsonData.payload : util.responseIssue(c);
          if (jsonData.auth && isAuth) {

          } else {
            fn.callFunction(fName, fPayload,c)
          }
        } catch (e) {
          util.responseIssue(c);
        }
      })
    });
    server.on('error', (err) => {
      throw err;
    });
  var start = function (callback) {
    server.listen(0, () => {
      callback(cfg.name, server.address().port)
    });
  }
  return {
    registerFunction: fn.registerFunction,
    registerService: discovery.registerService,
    executeRemote: client.executeRemote,
    start: start
  }
}


module.exports = startCom
