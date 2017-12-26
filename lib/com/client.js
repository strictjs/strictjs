const net = require('net');
const discovery = require("./discovery")

exports.executeRemote = (service , data) => {
  return new Promise(function (resolve,reject) {
  discovery.getServiceByName(service,function (serviceData) {

      const client = net.createConnection({ host: serviceData.host, port: serviceData.port }, () => {
        client.write(JSON.stringify(data));
      });
      client.on('data', (data) => {
        console.log(data.toString())
        var response = data.toString().trim();
        try{
          response = JSON.parse(response)
          resolve(response)
        } catch(e) {
          reject(e)
        }
        client.end();
      });
      client.on('end', () => {
        console.log('disconnected from server');
      });
    })
  })

}

