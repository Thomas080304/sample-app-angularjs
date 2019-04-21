/**
 * contacts controller
 */
define([
    'contacts/contacts.mod',
    'contacts/serv/contacts.serv'
],function(mod,serv){
    mod.controller('contacts.ctrl',[
        '$scope',
        '$state',
        'contacts.serv',
        function($scope,$state,serv){
            $scope.contacts= [];
            serv.all().then(function(contacts){
                $scope.contacts= contacts;
            });
        }
    ]);
    return mod;
})