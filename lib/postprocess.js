function postproccess(){
  var postproccess = []

  var run = function(req,res){
    var after = createNext(req,res);
    after();
  }
  var createNext= function(req,res){
    var postproccessCount = -1
    var after = function(){
      var nextHandle =  postproccess[++postproccessCount]
      if(typeof nextHandle == "function"){
        nextHandle(req,res,after);
      }
    }
    return after;
  }

  var after = function(handler){
    postproccess.push(handler)
  }

  return {after : after,run : run}
}

module.exports = postproccess()
