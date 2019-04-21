require.config({
    baseUrl:'./src/lib',
    paths:{
        app:'../app',
        about:'../app/about',
        contacts:'../app/contacts',
        home:'../app/home'
    },
    shim: {
        'angular': {exports: 'angular'},
        'angular-ui-router': {deps: ['angular']},
        'angular-animate': {deps: ['angular']},
        'angular-async-loader':{
            exports:'asyncLoader',
            deps:['angular']
        }
    }
});

require(['angular', 'app/app'], function (angular) {
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['app']);
        angular.element(document).find('html').addClass('ng-app');
    });
});
