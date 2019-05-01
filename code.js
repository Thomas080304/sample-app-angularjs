/**
 * angularJS 核心概念 
 * mvc 从module中分离view，从view中分离controller
 * view观察module的变化，on('changeEvent',function(){view.render()})
 * view委托事件给controller on('viewEvent',functiono(){module})
 * module
 * dependency injection
 * scope(controller)
 * directive
 */
var app = angular.module('app',[]);
app.controller('app.ctrl',[
    '$scope',
    function($scope){
        $scope.name = 'thomas'
    }
]);
/** 
var ngLocale = {
    _invokeQueue:[ ['$injector','invoke',['$provider',function($provider){}]] ],
    _configBlocks:configBlocks,
    _runBlocks:runBlocks,
    requies:[],
    name:'ngLocale'
};
var ng = {
    _invokeQueue:[ ['$injector','invoke',['$provider',function($provider){}]] ],
    _configBlocks:configBlocks,
    _runBlocks:runBlocks,
    requies:['nglocale'],
    name:'ng'
};
var app = {
    _invokeQueue:[ ['$controllerProvider', 'register','app.ctrl', ['$scope',function($scope){}]] ],
    _configBlocks:configBlocks,
    _runBlocks:runBlocks,
    requies:[],
    name:'app'
};

function createInjector(modulesToLoad){
    var INSTANTIATING = {};
    var path = [];
    var providerSuffix = 'Provider';
    var providerCache = {
        $provide:{
            provider:function(key, value){
                if(isObject(key)){
                    forEach(key,reverseParams(provider))
                }else{
                    return provider(key,value)
                }
            },
            factory:function(key, value){
                if(isObject(key)){
                    forEach(key,reverseParams(factory))
                }else{
                    return factory(key,value)
                }
            },
            service:function(key, value){
                if(isObject(key)){
                    forEach(key,reverseParams(service))
                }else{
                    return service(key,value)
                }
            },
            value:function(key, valueData){
                if(isObject(key)){
                    forEach(key,reverseParams(valueData))
                }else{
                    return value(key,valueData)
                }
            },
            value:function(key, value){
                if(isObject(key)){
                    forEach(key,reverseParams(constant))
                }else{
                    return constant(key,value)
                }
            },
            decorator:decorator
        },
        $inject:{
            invoke:function(fn, self, locals, serviceName){
                if(typeof locals === 'string'){
                    serviceName = locals;
                    locals = null;
                }
                var args = [];
                var $inject = createInjector.$$annotate(fn, strictDi, serviceName);
                var length, i, key;
                for(i = 0,length = $inject.length; i < length; i++){
                    key = $inject[i];
                    args.push(getService(key,serviceName));   
                }
                if(isArray(fn)){
                    fn = fn[length];
                }
                return fn.apply(self,args);
            },
            instantiate:function(){
                var instance = Object.create(
                    (isArray(Type)
                        ? Type[Type.length -1] 
                        : Type ).prototype 
                    || null);
                var returnedValue = invoke(Type, instance, locals, serviceName);
                return isObject(returnedValue) || isFunction(returnedValue) ? returnedValue : instance;    
            },
            get:function getService(serviceName,caller){
                var factory = function(serviceName,caller){
                    if (angular.isString(caller)) {
                        path.push(caller);
                    }
                    throw $injectorMinErr('unpr', "Unknown provider: {0}", path.join(' <- '));
                }
                if(providerCache.hasOwnProperty(serviceName)){
                    return providerCache[serviceName];
                }else{
                    try{
                        path.unshift(serviceName);
                        providerCache[serviceName] = INSTANTIATING;
                        return providerCache[serviceName] = factory(serviceName,caller)
                    }catch(err){

                    }finally{
                        path.shift();
                    }
                }
            },
            annotate:createInjector.$$annotate,
            has:function(name){
                return providerCache.hasOwnProperty(name + providerSuffix) || cache.hasOwnProperty(name);
            }
        }
    };
    var providerInjector = providerCache.$injector;
    var instanceCache = {};
    forEach(loadModules(modulesToLoad),function(fn){ if(fn){instanceInjector.invoke(fn)} });
    return instanceCache;
    function provider(name, provider_){
        return providerCache[name + providerSuffix] = provider_;
    }
    function factory(){}
    function loadModules(modulesToLoad){
        function runInvokeQueue(queue){
            // providerCache {$provider:{},$injector:{}}
            // ['$injector','invoke',['$provider',function($provider){ 国际化操作 }]]
            // ['$injector','invoke',['$provider',function($provider){ 内置provider }]]
            // ['$controllerProvider', 'register','app.ctrl', ['$scope',function($scope){ 启动模块 }]]
            var i, ii;
            for (i = 0, ii = queue.length; i < ii; i++) {
            var invokeArgs = queue[i],
                provider = providerInjector.get(invokeArgs[0]);
                provider[invokeArgs[1]].apply(provider, invokeArgs[2]);
            }
        }
        try{
            if (isString(module)) {
                // ngLocale ng app
                moduleFn = angularModule(module);
                runBlocks = runBlocks.concat(loadModules(moduleFn.requires)).concat(moduleFn._runBlocks);
                runInvokeQueue(moduleFn._invokeQueue);
                runInvokeQueue(moduleFn._configBlocks);
            } else if (isFunction(module)) {
                runBlocks.push(providerInjector.invoke(module));
            } else if (isArray(module)) {
                runBlocks.push(providerInjector.invoke(module));
            } else {
                assertArgFn(module, 'module');
            }
        }catch(err){

        }
        return runBlocks
    }
}

function module(name,requires,configFn){
    var invokeQueue = [];
    var configBlocks = [];
    var runBlocks = [];
    var config = function(){
        invokeQueue.push(['$injector','invoke',arguments]);
        return moduleInstance;
    }
    var moduleInstance = {
        _invokeQueue:invokeQueue,
        _configBlocks:configBlocks,
        _runBlocks:runBlocks,
        requies:requies,
        name:name,
        provider:function(recipeName, factoryFunction){
            invokeQueue.push(['$provide', 'provider',recipeName, factoryFunction]);
        },
        factory:function(recipeName, factoryFunction){
            invokeQueue.push(['$provide', 'factory',recipeName, factoryFunction]);    
        },
        service:function(recipeName, factoryFunction){
            invokeQueue.push(['$provide', 'service',recipeName, factoryFunction]);    
        },
        value:function(recipeName, factoryFunction){
            invokeQueue.push(['$provide', 'value',recipeName, factoryFunction]);    
        },
        constant:function(recipeName, factoryFunction){
            invokeQueue.unshift(['$provide', 'constant',recipeName, factoryFunction]);    
        },
        decorator:function(recipeName, factoryFunction){
            invokeQueue.push(['$provide', 'decorator',recipeName, factoryFunction]);    
        },
        animation:function(recipeName, factoryFunction){
            invokeQueue.push(['$animateProvider', 'register',recipeName, factoryFunction]);    
        },
        filter:function(recipeName, factoryFunction){
            invokeQueue.push(['$filterProvider', 'register',recipeName, factoryFunction]);    
        },
        controller:function(recipeName, factoryFunction){
            invokeQueue.push(['$controllerProvider', 'register',recipeName, factoryFunction]);    
        },
        directive:function(recipeName, factoryFunction){
            invokeQueue.push(['$compileProvider', 'directive',recipeName, factoryFunction]);    
        },
        config:config,
        run:function(blocks){
            runBlocks.push(blocks);
            return this;
        }
    };
    if(configFn){
        // invokeQueue.push(['$injector','invoke',configFn]);
        config(configFn);
    }
    return moduleInstance;
}
angular.module('ng',['ngLocale'],[
    '$provider',
    function($provider){
        $provider.provider('');
        $provider.provider().director();
    }
])
angular.module('ngLocale',[],[
    '$provider',
    function($provider){
        // 国际化操作
    }
]);
*/