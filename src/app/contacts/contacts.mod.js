/**
 * contacts模块的module
 */
define([
    "angular",
    "angular-async-loader",
    "angular-ui-router"
],function (angular,asyncLoader) {
    var contacts = angular.module('contacts.router', ['ui.router']);
    asyncLoader.configure(contacts);
    return contacts;
});
