'use strict';

var bioJs = angular.module('bioJs',['ngRoute','ui.bootstrap']);

bioJs.controller('ac',function($scope){

});
bioJs.controller('bc',function($scope){

});

bioJs.controller('DropdownCtrl', function($scope, $log) {


  $scope.status = {
    isopen: false
  };

 

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };
});


