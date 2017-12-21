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
async function startCom(cfgP) {
  cfg = cfgP
  return new Promise(function (res, rej) {
    const server = net.createServer((c) => {
      c.on('end', () => {
        console.log('client disconnected');
      });
      c.on("data", function (data) {
        var jsonData = data.toString().trim()
        try {
          jsonData = JSON.parse(jsonData);
          var fName = jsonData.fn ? jsonData.fn : util.responseIssue(c);
          var fPayload = jsonData.payload ? jsonData.payload : util.responseIssue(c);
          var d = null;
          if (jsonData.auth && isAuth) {

          } else {
            d = fn.callFunction(fName, fPayload)
            util.sendReply(c, d)
          }

        } catch (e) {
          console.log(e.message)
          util.responseIssue(c);
        }

      })

    });
    server.on('error', (err) => {
      throw err;
    });


  })
  var start = function () {
    server.listen(0, () => {
      discovery.registerService(cfg.name, server.address().port)
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
