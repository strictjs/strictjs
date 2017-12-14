var http = require('http');
var route = require("./routes");
var response = require("./response")
var request = require("./request")
var middleware = require('./middleware');

function StrictJs(){

  var server =    http.createServer(function(req,res){

          var match =  route.match(req)
            response(res);
            request(req);
            if(match  != undefined){
              console.log(match)
              middleware.run(req,res,match.handler);
              // req.params = match.params
              (req,res)
            }
            else{
              res.end("Route Not Found")
            }
   })
   var listen = function(port){
     server.listen(port,function(){
      console.log("server is listning at : "+port);
   })

}
return {listen : listen , get : route.get,use : middleware.use}
}


module.exports = myExpress;
