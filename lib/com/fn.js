const constant = require("./constants")
const util = require("./util")
var fnList = {}

exports.callFunction = (fn,d,c) => {
  if(typeof fnList[fn] == "function")  {
    return fnList[fn](d)
  } else {
    util.notFound(c,constant.FN_NOT_FOUND);
  }
}

exports.registerFunction = (fName,handler) => {
   return fnList[fName] == undefined ? (fnList[fName]=handler) : constant.FN_ALREADY_EXISTS;
}

