
onco.directive('header', [function(){
    var directive = {
        restrict: 'EA',
        templateUrl: 'templates/directives/header.html'
    }
  return directive;
}]);

onco.directive('lsidebar', [function(){
    var directive = {
        restrict: 'EA',
        templateUrl: 'templates/directives/sidebar.html'
    }
  return directive;
}])

onco.directive('singlePatient', [function(){
    var directive = {
        restrict: 'EA',
        templateUrl: 'templates/dashmultiple.html',
        controller:'DashboardCtrlMul'
    }
  return directive;
}])
    