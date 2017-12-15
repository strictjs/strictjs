function auth() {
  var authStrategyTable = {};
  var strategy = function (name, handler) {
    authStrategyTable[name] = handler
  }
  var authenticate = function (auth, req, res) {
   var user =  authStrategyTable[auth](req, res)
      if (user != null) {
        req.user = user
        return true
      }
      else {
        res.end('{"status": 401}')
        // util.sendUnauthorize() //TODO later
        return false
      }
  }

  return {strategy: strategy, authenticate: authenticate}
}


module.exports = auth()