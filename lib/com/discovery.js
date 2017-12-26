var consul = require('consul')();
var self = require("./discovery")

exports.registerService =   (name, port,cb)  => {
   consul.agent.service.register({name : name , port : port},function () {
    cb();
  });
}

exports.getServiceByName =  (name,cb) => {

    consul.catalog.service.nodes({service : name},function (err,result) {
      var node = result[0];
      cb({host : node.Address , port :  node.ServicePort})
    })
}


