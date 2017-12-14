function response(res) {
  res.send = function(message){
    res.setHeader("Content-Type","text/plain");
    res.setHeader("Content-Length",message.length);
    res.writeHead(200);
    res.end(message);
  }
  res.json = function(message){
    var json =  JSON.stringify(message);
    res.setHeader("Content-Type","application/json");
    res.setHeader("Content-Length",json.length);
    res.writeHead(200);
    res.end(json);



}
  res.redirect = function(path){
      res.setHeader("Location",path);
      res.writeHead(301);
      res.end();

}
return res
}

module.exports = response;
