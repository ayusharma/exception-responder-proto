
bioJs.directive('header', [function(){
    var directive = {
        restrict: 'EA',
        templateUrl: 'templates/directives/header.html'
    }
  return directive;
}]);

bioJs.directive('lsidebar', [function(){
    var directive = {
        restrict: 'EA',
        templateUrl: 'templates/directives/sidebar.html'
    }
  return directive;
}])
    