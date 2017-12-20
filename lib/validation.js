var joi = require("joi")
var qs = require("querystring")
var util = require("./Util")


function validation() {
  var validate = async function (match, req, res) {
    var state = true
    var val = match.validation
    await parse(req)
    var vK = Object.keys(val);
    var vKL = vK.length;
    while (vKL--) {
      const vN = vK[vKL];
      const vJ = val[vN];
      joi.validate(req[vN], vJ, function (e, d) {
        switch (e) {
          case null:
            req[vN] = d
            break;
          default:
            // console.log(e);
            // respondTheValidationError
            // panic(e) // TODO Handle panic

            match.fail(req,res,{error: e.name, message: e.details[0].message})
            state = false
            break;
        }
      })
    }
    return state
  }
  return {validate: validate}
}


async function parse(req, res) {
  req.query = qs.parse(req.url.split("?")[1]);

  await new Promise(function (resolve, reject) {
    let body = [];
    req.on('error', (err) => {
      console.error(err);
    }).on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      req.body = body;
      return resolve();
    })
  })

}

module.exports = validation()