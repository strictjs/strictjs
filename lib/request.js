var qs = require('qs');
var url = require('url');

function request(req){
    req.params = qs.parse(url.parse(req.url).query)
    req.url = url.parse(req.url).pathname;
    return req

}


module.exports = request;
