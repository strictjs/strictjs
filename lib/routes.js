var url = require("url")
var constants = require("./constants")
var METHODS = require("./constants").METHODS

var rt = {}
var keys = Object.keys(constants.METHODS)
var i = keys.length
while(i--){
  rt[keys[i]] = []
}


function findRoute(routeArray,route){
  var pathArray = route.path.split('/');
  var urlParams = {}
  var match = true;
  var j = 0;
  var k = routeArray.length;
  while(j < k){     // The best performing loop method
      var r = routeArray[j];
      var p = pathArray[j];
      if(r[0] == ":"){ urlParams[r.substr(1)] = p }
      else if (r == "*" ) {
            break;
      }
      else if (r != p) {
        match = false;
        break;
      }
      j++;
  }
  if(match){
    return {params : urlParams,handler : route.handler,auth : route.auth}
  }
  else {
    return false
  }
}

 function route(){
  var result = false;
  var match = function(req){
    var path = url.parse(req.url).pathname;
    var routeArray = path.split('/')
    var routing_table = rt[req.method]
    var i = routing_table.length
    while(i--){
      var route =  routing_table[i]
      result = findRoute(routeArray,route)
      if(result != false ){
        break;
      }
    }
    return result;
  }
  var get = function(config){
    var auth = false
      if(config.auth != undefined){
        auth = config.auth
      }
      rt[METHODS.GET].push({path: config.path,handler : config.handler,auth : auth})
  }
  var post = function(config){
    var auth = false
      if(config.auth != undefined){
        auth = config.auth
      }
    rt[METHODS.POST].push({path: config.path,handler : config.handler,auth : auth});
  }
  var put = function(config){
    var auth = false
      if(config.auth != undefined){
        auth = config.auth
      }
    rt[METHODS.PUT].push({path: config.path,handler : config.handler,auth : auth});
  }
  var deleteM = function(config){
    var auth = false
      if(config.auth != undefined){
        auth = config.auth
      }
    rt[METHODS.DELETE].push({path: config.path,handler : config.handler,auth : auth});
  }
  return {
    get : get,
    delete:deleteM,
    post:post,
    put:put,
    match : match
  };

}

module.exports = route ();
