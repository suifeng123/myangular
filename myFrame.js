/**
 * Created by Administrator on 2017/6/28.
 */
(function() {
    var moduleMap = {}; //ģ�鶨��
    var fileMap = {};
    var noop = function() {};
    var thin = {
        define: function(name,dependencies,factory){ //����ģ��
          if(!moduleMap[name]){ //���û�����ģ��Ļ�
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
            var module = moduleMap[name]; //��ȡ�����ܵ����ģ��
            if(!module.entry){ //���û�����ģ���ʵ��Ļ�
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