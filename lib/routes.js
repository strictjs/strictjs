var url = require("url")
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
    return {params : urlParams,handler : route.handler}
  }
  else {
    return false
  }
}

 function route(){
  var routing_table = []
  var result = false;
  var match = function(req){
    var path = url.parse(req.url).pathname;
    for (var i = 0; i < routing_table.length; i++) {
      var route =  routing_table[i]
      result = findRoute(path,route)
      if(result != false ){
        break;
      }
    }
    return result;
  }
  var get = function(path,handler){
      routing_table.push({path: path,handler : handler});
  }
  return {get : get,match : match};

}

module.exports = route ();
