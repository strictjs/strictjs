var url = require("url")

var routing_table_get = []
var routing_table_post = []
var routing_table_put = []
var routing_table_delete = []

function findRoute(path,route){
  var routeArray = path.split('/')
  var pathArray = route.path.split('/');
  var urlParams = {}
  var match = true;
  for(var j = 0;j< routeArray.length ; j++){
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
    var routing_table = []
    switch(req.method){
      case "GET":
        routing_table = routing_table_get
        break;
      case "POST":
        routing_table = routing_table_post
        break;
      case "PUT":
        routing_table = routing_table_put
        break;
      case "DELETE":
        routing_table = routing_table_delete
        break;
    }
    for (var i = 0; i < routing_table.length; i++) {
      var route =  routing_table[i]
      result = findRoute(path,route)
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
      routing_table_get.push({path: config.path,handler : config.handler,auth : auth});
  }
  var post = function(config){
    var auth = false
      if(config.auth != undefined){
        auth = config.auth
      }
      routing_table_post.push({path: config.path,handler : config.handler,auth : auth});
  }
  var put = function(config){
    var auth = false
      if(config.auth != undefined){
        auth = config.auth
      }
      routing_table_put.push({path: config.path,handler : config.handler,auth : auth});
  }
  var deleteM = function(config){
    var auth = false
      if(config.auth != undefined){
        auth = config.auth
      }
      routing_table_delete.push({path: config.path,handler : config.handler,auth : auth});
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
