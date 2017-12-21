const net = require('net');
const discovery = require("./discovery")

exports.executeRemote =async (service , data) => {
  var serviceData =await  discovery.getServiceByName(service)
  await new Promise(function (resolve,reject) {
    const client = net.createConnection({ host: serviceData.host, port: serviceData.port }, () => {
      client.write(data + '\r\n');
    });
    client.on('data', (data) => {
      var response = data.toString().trim();
      try{
        JSON.parse(response)
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
}

