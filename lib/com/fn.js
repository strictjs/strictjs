const constant = require("./constants")
const util = require("./util")
var fnList = {}

exports.callFunction = (fn,d) => {
  return typeof fnList[fn] == "function" ? fnList[fn](d) : util.notFound(constant.FN_NOT_FOUND);
}

exports.registerFunction = (fName,handler) => {
   return fnList[fName] == undefined ? (fnList[fName]=handler) : constant.FN_ALREADY_EXISTS;
}

