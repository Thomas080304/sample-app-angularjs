/**
 * sample-app-angularjs的启动module,
 * 加载所有的router依赖
 */
define([
    'angular',
    'angular-async-loader',
    'home/home.router',
    'about/about.router',
    'contacts/contacts.router',
    'angular-ui-router'
],function (angular,asyncLoader,homeRouter,aboutRouter,contactsRouter) {
    var app = angular.module('app', ['ui.router','home.router','about.router','contacts.router'])
        .run([
            '$rootScope', 
            '$state', 
            '$stateParams',
            function ($rootScope,   $state,   $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ])
        .config([
            '$stateProvider',
            '$urlRouterProvider',
            function($stateProvider,   $urlRouterProvider){
                $urlRouterProvider.otherwise('/')
            }
        ]);
    asyncLoader.configure(app);
    return app;
});
