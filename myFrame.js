/**
 * Created by Administrator on 2017/6/28.
 */
(function() {
    var moduleMap = {}; //模块定义
    var fileMap = {};
    var noop = function() {};
    var thin = {
        define: function(name,dependencies,factory){ //定义模块
          if(!moduleMap[name]){ //如果没有这个模块的话
              var module = {
                  name: name,
                  dependencies: dependencies,
                  factory: factory
              };
              moduleMap[name] = module;
          };
            return moduleMap[name];
        },
        use: function(name) {
            var module = moduleMap[name]; //获取这个框架的这个模块
            if(!module.entry){ //如果没有这个模块的实体的话
                var args = [];
                for(var i=0;i<module.dependencies.length;i++){
                    if(moduleMap[module.dependencies[i].entry]){
                        args.push(moduleMap[module.dependencies[i].entry]);
                    }else{
                        args.push(this.use(module.dependencies[i]));
                    }
                }
                module.entry = module.factory.apply(noop,args);
            }
            return module.entry;
        },

        test: function(){
            console.log("this frame is working");
        }
    }
    window.thin = thin;
})(window);