publishExternalAPI({});

function publishExternalAPI(angular){
    extend({},angular);
    angularModule = setupModuleLoader(window);
    // angular.module('ng',['nglocale'],['$provider',function(){}])
    // {
    //     name:'ng'
    //     _invokeQueue:[ ['$injector','invoke',['$provider',function(){}]] ],
    //     _configBlocks:[],
    //     _runBlocks:[],
    //     requies:['ngLocale']
    // }
    angularModule('ng',['ngLocale'],[
        '$provide',
        function($provide){
            $provide.provider('')
            $provide.provider().directive()
        }
    ]);
}

function setupModuleLoader(window){

    var angular = window.angular || {};
    var module = angular.module = function(){
        var modules = {};
        // angular.module('name',[],configFn)
        return function(name,requies,configFn){
            var module = modules[name] || 
            function(){
                var invokeQueue = [];// array
                var configBlocks = [];// functions
                var runBlocks = []; // functions
                //var config = invokeLater('$injector', 'invoke', 'push', configBlocks);
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
                    config(configFn);
                }
                return moduleInstance;
                function invokeLater(){}
                function invokeLaterAndSetModuleName(provider, method){}
            }
            return typeof module === 'function' ? module = (modules[name] = module()) : module;
        }
    }
    return module();
}
// angular.module('ngLocale',[],['$provider',function(){}])
// {
//     name:'ng'
//     _invokeQueue:[ ['$injector','invoke',['$provider',function(){}]] ],
//     _configBlocks:[],
//     _runBlocks:[],
//     requies:[]
// }
angular.module('ngLocale',[],[
    '$provide',
    function($provide){
        $provide.value('')
    }
]);

bootstrap();

function bootstrap(){
    var doBootstrap = function(){
        var modules = [
            'ng',
            [ '$provide',function($provide){ $provide.value('') } ]
        ];
        var injector = createInjector(modules);
        injector.invoke([
            '$rootScope','$rootElement','$compile','$injector',
            function(scope, element, compile, injector){
                scope.$apply(function(){});
            }
        ])

    }
}

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
        }
    };
    var providerInjector = 
        providerCache.$injector = 
        createInternalInjector(providerCache,function(serviceName, caller){
            if (angular.isString(caller)) {
                path.push(caller);
            }
            throw $injectorMinErr('unpr', "Unknown provider: {0}", path.join(' <- '));
        })
    var instanceCache = {};
    var instanceInjector = 
        instanceInjector.$injector = 
        createInternalInjector(instanceCache,function(serviceName,caller){
            var provider = providerInjector.get(serviceName + providerSuffix, caller);
            return instanceInjector.invoke(provider.$get, provider, undefined, serviceName);
        });
    forEach(loadModules(modulesToLoad),function(fn){ if(fn){instanceInjector.invoke(fn)} });
    return instanceInjector;

    function provider(name, provider_){
        return providerCache[name + providerSuffix] = provider_;
    }
    function factory(){}
    function loadModules(modulesToLoad){
        function runInvokeQueue(queue){
            // providerCache {$provider:{},$injector:{}}
            var i, ii;
            for (i = 0, ii = queue.length; i < ii; i++) {
                //[providerInjector,method,arguments]
            var invokeArgs = queue[i],
                // ['$injector','invoke',['$provider',function(){}]]
                provider = providerInjector.get(invokeArgs[0]);
                // providerInjector method.apply(providerInjector,arguments)
                provider[invokeArgs[1]].apply(provider, invokeArgs[2]);
            }
        }
        // angular.module('ng',['nglocale'])
        // angular.module('ngLocale',[])
        // ['$provider',function(){}]
        // angular.module('ng',['nglocale'],['$provider',function(){}])
        // {
        //     name:'ng'
        //     _invokeQueue:[ ['$injector','invoke',['$provider',function(){}]] ],
        //     _configBlocks:[],
        //     _runBlocks:[],
        //     requies:['ngLocale']
        // }
        // angular.module('ngLocale',[],['$provider',function(){}])
        // {
        //     name:'ng'
        //     _invokeQueue:[ ['$injector','invoke',['$provider',function(){}]] ],
        //     _configBlocks:[],
        //     _runBlocks:[],
        //     requies:[]
        // }
        try{
            if (isString(module)) {
                // ng
                // ngLocale
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
    function createInternalInjector(cache, factory){
        function getService(serviceName,caller){
            if(cache.hasOwnProperty(serviceName)){
                return cache[serviceName];
            }else{
                try{
                    path.unshift(serviceName);
                    cache[serviceName] = INSTANTIATING;
                    return cache[serviceName] = factory(serviceName,caller)
                }catch(err){

                }finally{
                    path.shift();
                }
            }
        }
        function invoke(fn, self, locals, serviceName){
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
        }
        function instantiate(Type, locals, serviceName){
            var instance = Object.create(
                (isArray(Type)
                    ? Type[Type.length -1] 
                    : Type ).prototype 
                || null);
            var returnedValue = invoke(Type, instance, locals, serviceName);
            return isObject(returnedValue) || isFunction(returnedValue) ? returnedValue : instance;
        }
        return {
            invoke:invoke,
            instantiate:instantiate,
            get:getService,
            annotate:createInjector.$$annotate,
            has:function(name){
                return providerCache.hasOwnProperty(name + providerSuffix) || cache.hasOwnProperty(name);
            }
        };
    }
}
createInjector.$$annotate = annotate;