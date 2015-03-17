'use strict';

var onco = angular.module('onco',['ngRoute','ui.bootstrap','angular-loading-bar','ngAnimate']);

onco.controller('HomeCtrl',function($scope){
  
})

onco.controller('DashboardCtrl',function($scope,$http,D3Service,PatientOne){

  PatientOne.then(function(data){
    console.log(data);
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

    $scope.startTimelineDay = events[0].dates[0].toString().substring(8,10);
    $scope.startTimelineYear = events[0].dates[0].toString().substring(11,15);
    $scope.startTimelineMonth = new Date(events[0].dates[0].toString().substring(4,7)+'-1-01').getMonth();


    var timeline2 = new Chronoline(document.getElementById("target2"), events,
      {visibleSpan: DAY_IN_MILLISECONDS * 366,
        animated: true,
         tooltips: true,
         defaultStartDate: new Date($scope.startTimelineYear, $scope.startTimelineMonth-1, $scope.startTimelineDay),
         sections: sections,
         sectionLabelAttrs: {'fill': '#997e3d', 'font-weight': 'bold'},
      labelInterval: isHalfMonth,
      hashInterval: isHalfMonth,
      scrollLeft: prevQuarter,
      scrollRight: nextQuarter,
      floatingSubLabels: false,
      draggable:true
      });

  })
 
});
onco.controller('MultCtrl',function($scope,PatientOne){
  PatientOne.then(function(data){
    console.log(data.patient);
  })
})

// onco.controller('DropdownCtrl', function($scope, $log) {
// $scope.status = {
//     isopen: false
// };

 

//   $scope.toggleDropdown = function($event) {
//     $event.preventDefault();
//     $event.stopPropagation();
//     $scope.status.isopen = !$scope.status.isopen;
//   };
// });


