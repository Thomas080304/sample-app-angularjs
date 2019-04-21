/**
 * home模块的module
 */
define([
    "angular",
    "angular-async-loader",
    "angular-ui-router"
],function (angular,asyncLoader) {
    var home = angular.module('home.router', []);
    home.config([
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider,   $urlRouterProvider){
            
            $stateProvider.state("home", {
                url: "/",
                templateUrl:'src/app/home/views/home.html'
            })
        }
    ]);
    asyncLoader.configure(home);
    return home;
});
