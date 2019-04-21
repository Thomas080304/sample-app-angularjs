/**
 * contacts.detail controller
 */
define([
    'contacts/contacts.mod',
    'contacts/serv/contacts.serv'
],function(mod,serv){
    mod.controller('contacts.detail.ctrl',[
        '$scope',
        '$stateParams',
        'contacts.serv',
        function($scope,$stateParams,serv){
            debugger;
            console.log($stateParams.contactId)
        }
    ]);
    return mod;
})