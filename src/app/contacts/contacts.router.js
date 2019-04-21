/**
 * contacts模块的module
 */
define([
    'contacts/contacts.mod'
],function (mod) {
    mod.config([
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider){
            
            $stateProvider
                .state("contacts", {
                    abstract: true,
                    url: "/contacts",
                    templateUrl:'src/app/contacts/views/contacts.html',
                    controllerUrl:'contacts/ctrl/contacts.ctrl',
                    controller:'contacts.ctrl'
                })
                .state('contacts.list',{
                    url:'',
                    templateUrl: 'src/app/contacts/views/contacts.list.html'
                })
                .state('contacts.detail',{
                    url: '/{contactId:[0-9]{1,4}}',
                    templateUrl: 'src/app/contacts/views/contacts.detail.html',
                    controllerUrl:'contacts/ctrl/contacts.detail.ctrl',
                    controller:'contacts.detail.ctrl'
                })
        }
    ]);
    return mod;
});
