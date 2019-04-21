/**
 * about模块的module
 */
define([
    "angular",
    "angular-async-loader",
    "angular-ui-router"
],function (angular,asyncLoader) {
    var about = angular.module('about.router', []);
    about.config([
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider,   $urlRouterProvider){
            
            $stateProvider.state('about', {
                url: '/about',
                templateUrl:'src/app/about/views/about.html' 
            })
        }
    ]);
    asyncLoader.configure(about);
    return about;
});
