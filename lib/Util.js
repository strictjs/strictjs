
exports.send404 =  () => {

}

exports.sendJsonResponse = function(req,res, message){
  var json =  JSON.stringify(message);
  res.setHeader("Content-Type","application/json");
  res.setHeader("Content-Length",json.length);
  res.writeHead(200);
  res.end(json);
}