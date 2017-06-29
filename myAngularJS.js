/**
 * Created by Administrator on 2017/6/29.
 */
 $emit: function(name,args) {
     var empty = [],
         scope = this,
         stopPropagation = false,
         event = {
             name: name,
             targetScope: scope,
             stopPropagation: function() {
                 stopPropagation = true;
             },
             preventDefault: function () {
                 event.defaultPrevented = true;
             },
             defaultPrevented: false
         },
            listenerArgs = concat([event],arguments,1),
         i,length;
        do {
            namedListeners = scope.$$listeners[name] || empty;
            event.currentScope = scope;
            for(i=0,length=namedListeners.length;i<length; i++){
                if(!namedListeners[i]){
                    namedListeners.splice(i,1);
                    i--;
                    length--;
                    continue;
                }
                try {
                    namedListeners[i].apply(null,listenerArgs);
                    if(stopPropagation) return event;
                }catch(e){
                    $exceptionHandler(e);
                }
            }
            scope = scope.$parent;
         }while(scope);
     return event;
 },

$broadcast: function(name,args) {
    var target = this,
        current = target,
        next = target,
        event = {
            name: name,
            targetScope: target,
            preventDefault: function() {
                event.defaultPrevented = true,
            },
            defaultPrevented: false
        },
        listenerArgs = concat([event],arguments,1),
        listeners, i,length;

}

function timeout(fn,delay,invokeApply){
    var deferred = $q.defer(),
        promise = deferred.promise,
        skipApply = (isDefined(invokeApply)&&!invokeApply),
        timeoutId,cleanup;
    timeoutId = $browser.defer(function(){
        try{
            deferred.resolve(fn());
        }catch(e){
            deferred.reject(e);
            $exceptionHandler(e);
        }
        if(!skipApply) $rootScope.$apply();
    },delay);

    cleanup = function() {
        delete deferreds[promise.$$timeoutId];
    };

    promise.$$timeoutId = timeoutId;
    deferreds[timeoutId] = deferred;
    promise.then(cleanup,cleanup);

    return promise;
}
