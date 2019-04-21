define([
    'contacts/contacts.mod'
],function(mod){
    mod.factory('contacts.serv',[
        '$http',
        function($http){
            var path = '/mock/contacts.json';
            var contacts = $http.get(path)
                .then(function (resp) {
                    return resp.data.contacts;
                });
            return {
                all:function(){
                    return contacts;
                },
                get:function(id){
                    console.log('filter id---->>>')
                    return contacts.then(function(){
                        return [];
                    })
                }
            }
        }
    ]);
    return mod;
});