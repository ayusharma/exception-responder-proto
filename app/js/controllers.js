'use strict';

var bioJs = angular.module('bioJs',['ngRoute','ui.bootstrap']);

bioJs.controller('DashboardCtrl',function($scope,$http,D3Service){
  
 
  $http({method: 'GET', url: 'http://localhost/onco/app/webservice.json'}).success(function(data){
    $scope.patientInfo = data;

    //adding events and timeline to sections
    var events = []; var sections = [];
    for(var i=0; i< data.treatmentList.length; i++){
      $scope.startDay = data.treatmentList[i].startDate.substring(4,6);
      $scope.startMonth = new Date(data.treatmentList[i].startDate.substring(0,4)+'-1-01').getMonth();
      $scope.startYear = data.treatmentList[i].startDate.substring(8,12);
      $scope.endDay = data.treatmentList[i].endDate.substring(4,6);
      $scope.endMonth = new Date(data.treatmentList[i].endDate.substring(0,4)+'-1-01').getMonth();    
      $scope.endYear = data.treatmentList[i].endDate.substring(8,12);

    events.push({dates: [new Date($scope.startYear, $scope.startMonth, $scope.startDay),new Date($scope.endYear, $scope.endMonth, $scope.endDay)], title: data.treatmentList[i].treatmentDescription, section: i});
    
    sections.push({dates: [new Date($scope.startYear, $scope.startMonth, $scope.startDay),new Date($scope.endYear, $scope.endMonth, $scope.endDay)], title:data.treatmentList[i].treatmentName, section: i, attrs: {fill: "#e3f0fe"}}
);
    }

    var timeline2 = new Chronoline(document.getElementById("target2"), events,
      {visibleSpan: DAY_IN_MILLISECONDS * 366,
        animated: true,
         tooltips: true,
         defaultStartDate: new Date(2011, 0, 1),
         sections: sections,
         sectionLabelAttrs: {'fill': '#997e3d', 'font-weight': 'bold'},
      labelInterval: isHalfMonth,
      hashInterval: isHalfMonth,
      scrollLeft: prevQuarter,
      scrollRight: nextQuarter,
      floatingSubLabels: false,
      draggable:true
      });




  }).error(function(data){
      alert("An error has been occured. I am DashboardCtrl"+data);
  });

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


