var consul = require('consul')();
var self = require("./discovery")

exports.registerService =  async (name, port)  => {
  console.log(port)
  console.log("Reached !!!")

 let akash= await consul.agent.service.register({name : name , port : port});
console.log('akash',akash)
}

exports.getServiceByName =  (name) => {
  return new Promise(function (resolve,reject) {
    consul.catalog.service.nodes({service : name},function (err,result) {
      console.log(result);
      var node = result[0];
      resolve({host : node.Address , port :  node.ServicePort})
    })
  })
}


