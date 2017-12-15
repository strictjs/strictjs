function middleware(){
  var middleware = []

    var run = function(req,res,handler){
        var next = createNext(req,res,handler);
        next();
    }
    var createNext= function(req,res,handler){
       var middlewareCount = -1
       var next = function(){
         var nextHandle =  middleware[++middlewareCount]
         if(typeof nextHandle == "function"){
               nextHandle(req,res,next);
         }
         else {
            handler(req,res);
         }
       }
return next;
    }

    var before = function(handler){
          middleware.push(handler)
    }

return {before : before,run : run}
}

module.exports = middleware()
