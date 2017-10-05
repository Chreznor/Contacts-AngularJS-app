
// Declare app level module which depends on views, and components
angular.module('myContacts', [
  'ngRoute',
  'myContacts.contacts',
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}])
//initialize foundation.js
.run(function($rootScope) {
    $rootScope.$on('$viewContentLoaded', function () {
        $(document).foundation();
    });
});
