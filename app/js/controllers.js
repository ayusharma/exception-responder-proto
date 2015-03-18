'use strict';

var onco = angular.module('onco',['ngRoute','ui.bootstrap','angular-loading-bar','ngAnimate'])

.controller('HomeCtrl',function($scope){

})

.controller('DashboardCtrl',function($scope,$http,D3Service,PatientOne){

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

})
.controller('MultCtrl',function($scope,PatientOne,PatientTwo,PatientThree,PatientFour,PatientFive,ExpRespOne,ExpRespTwo,ExpRespThree,ExpRespFour,ExpRespFive){
  $scope.method = {};
  $scope.method.patients = [];
  $scope.method.expresp = [];
  $scope.method.datastatus = 'Patient Data Loading';

  PatientOne.then(function(data){
    $scope.method.patients.push(data);
  })
  PatientTwo.then(function(data){
   $scope.method.patients.push(data);
 })
  PatientThree.then(function(data){
   $scope.method.patients.push(data);
 })
  PatientFour.then(function(data){
   $scope.method.patients.push(data);

 })
  PatientFive.then(function(data){
   $scope.method.patients.push(data);

 })
  ExpRespOne.then(function(data){
   $scope.method.expresp.push(data);

 })
  ExpRespTwo.then(function(data){
   $scope.method.expresp.push(data);

 })
  ExpRespThree.then(function(data){
   $scope.method.expresp.push(data);

 })
  ExpRespFour.then(function(data){
   $scope.method.expresp.push(data);

 })
  ExpRespFive.then(function(data){
   $scope.method.expresp.push(data);

 }).then(function(){
  $scope.method.datastatus = 'Patient Data Has Been Loaded';
  console.log($scope.method.patients);
  var events = []; var sections = [];


  function timeline(patientData){
    console.log(patientData);
    for (var i = 0; i < patientData.length; i++) {  
      console.log(patientData);
      for(var j=0; j< patientData[i].treatmentList.length; j++){
        $scope.startDay = patientData[i].treatmentList[j].startDate.substring(4,6);
        $scope.startMonth = new Date(patientData[i].treatmentList[j].startDate.substring(0,4)+'-1-01').getMonth();
        $scope.startYear = patientData[i].treatmentList[j].startDate.substring(8,12);
        $scope.endDay = patientData[i].treatmentList[j].endDate.substring(4,6);
        $scope.endMonth = new Date(patientData[i].treatmentList[j].endDate.substring(0,4)+'-1-01').getMonth();    
        $scope.endYear = patientData[i].treatmentList[j].endDate.substring(8,12);

        events.push({dates: [new Date($scope.startYear, $scope.startMonth, $scope.startDay),new Date($scope.endYear, $scope.endMonth, $scope.endDay)], title: "Patient: "+(i+1)+" Treatment "+patientData[i].treatmentList[j].treatmentName, section: j});

        sections.push({dates: [new Date($scope.startYear, $scope.startMonth, $scope.startDay),new Date($scope.endYear, $scope.endMonth, $scope.endDay)], title:patientData[i].treatmentList[j].treatmentName, section: j, attrs: {fill: "#e3f0fe"}}
          );
      }
    }
  }

  $scope.startTimelineDay = 1;
  $scope.startTimelineYear = 2010;
  $scope.startTimelineMonth = 0;

  timeline($scope.method.patients);
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

//d3 section 
  //function to get present genes in the patient
  $scope.method.unique = function(m){
    var prev = m[0];
    var m_sort = [];
    m_sort.push(prev);
    for (var i = 0; i < m.length; i++) {
      if(m[i] != prev){
        m_sort.push(m[i]);
        prev = m[i];
      }
    };
    return m_sort;
  }
  $scope.method.genePresent = function(selectedPatient){
    var gene = [];
    for (var i = 0; i < $scope.method.patients[selectedPatient].genomicProfileList.length; i++) {
     for (var j = 0; j < $scope.method.patients[selectedPatient].genomicProfileList[i].mutationList.length; j++) {
       gene.push($scope.method.patients[selectedPatient].genomicProfileList[i].mutationList[j].geneSymbol);
     };
   };
   return $scope.method.unique(gene.sort());
 }


 console.log($scope.method.genePresent(0));
 console.log($scope.method.genePresent(1));
 console.log($scope.method.genePresent(2));
 console.log($scope.method.genePresent(3));
 console.log($scope.method.genePresent(4));
  //to get all genes of patients
  $scope.method.allgene = [];
  for (var k = 0; k < $scope.method.patients.length; k++) {
    for (var i = 0; i < $scope.method.patients[k].genomicProfileList.length; i++) {
     for (var j = 0; j < $scope.method.patients[k].genomicProfileList[i].mutationList.length; j++) {
       $scope.method.allgene.push($scope.method.patients[k].genomicProfileList[i].mutationList[j].geneSymbol);
     };
   };
 };
 $scope.method.allgene = $scope.method.unique($scope.method.allgene.sort());
 console.log($scope.method.allgene.length);

  //making data according to genes
  var patientgeneinfo = [];
  for (var i = 0; i < $scope.method.patients.length; i++) {
    patientgeneinfo.push({patient:i+1,gene:[]});
    for (var j = 0; j < $scope.method.allgene.length; j++) {
     patientgeneinfo[i].gene.push({gene:$scope.method.allgene[j],status:"NP",chromosome:""})
     for (var k = 0; k < $scope.method.patients[i].genomicProfileList.length; k++) {
       for (var l = 0; l < $scope.method.patients[i].genomicProfileList[k].mutationList.length; l++) {
        if($scope.method.allgene[j] == $scope.method.patients[i].genomicProfileList[k].mutationList[l].geneSymbol){
          patientgeneinfo[i].gene[j].status = "P";
          patientgeneinfo[i].gene[j].chromosome = $scope.method.patients[i].genomicProfileList[k].mutationList[l].chromosome;

        }
      }
    }
  }
}
console.log(patientgeneinfo[0].gene.length);

//modifying exp resp data
var exprespmod = [];
for (var i = 0; i < $scope.method.expresp.length; i++) {
    exprespmod.push({patient:i+1,gene:[]});
    for (var j = 0; j < $scope.method.allgene.length; j++) {
     exprespmod[i].gene.push({gene:$scope.method.allgene[j],status:"NP",chromosome:""})
     for (var k = 0; k < $scope.method.expresp[i].genomicProfileList.length; k++) {
       for (var l = 0; l < $scope.method.expresp[i].genomicProfileList[k].mutationList.length; l++) {
        if($scope.method.allgene[j] == $scope.method.expresp[i].genomicProfileList[k].mutationList[l].geneSymbol){
          patientgeneinfo[i].gene[j].status = "P";
          patientgeneinfo[i].gene[j].chromosome = $scope.method.expresp[i].genomicProfileList[k].mutationList[l].chromosome;

        }
      }
    }
  }
}
console.log(exprespmod);

 //$scope.method.patients[k].genomicProfileList[i].mutationList[j].geneSymbol
  //drawing d3 graphs
  var margin = {top:20,bottom:20,left:20,right:10};
  var w = 550 - margin.left - margin.right;
  var h = 7600 - margin.top - margin.bottom;


  var svg = d3.select("#patient-graph-section-one").append("svg").style("background","#FFF")
  .attr("width",w + margin.left + margin.right)
  .attr("height",h + margin.top + margin.bottom)

  var svg = d3.select("#patient-graph-section-two").append("svg").style("background","#FFF")
  .attr("width",w + margin.left + margin.right)
  .attr("height",h + margin.top + margin.bottom)

  

  

   // x axis text 
   d3.select("#patient-graph-section-one svg").append("g").attr("transform","translate("+(margin.left+100)+","+(margin.top+50)+")")
   .selectAll("text").data(patientgeneinfo).enter().append("text").attr("id","geneinfotext").text(function(d,i){ return "Patient "+(i+1);}).attr({
    x:0,
    y:function(d,i){ return i*100;},
    "font-size":"14px",
    "font-weight":"bold",
  });

   d3.select("#patient-graph-section-two svg").append("g").attr("transform","translate("+(margin.left+100)+","+(margin.top+50)+")")
   .selectAll("text").data(exprespmod).enter().append("text").attr("id","expinfotext").text(function(d,i){ return "Ex.Res. "+(i+1);}).attr({
    x:0,
    y:function(d,i){ return i*100;},
    "font-size":"14px",
    "font-weight":"bold",
  });

   $scope.drawScatterNorm = function(k){
    var r = 12;
    // y axis text 
    d3.select("#patient-graph-section-one svg").append("g").attr("transform","translate("+margin.left+","+(margin.top+104)+")")
    .selectAll("text").data($scope.method.allgene).enter().append("text").text(function(d){ return d;}).attr({
      x:0,
      y:function(d,i){return i*30; },
      "font-size":"14px",
    });



    

    //drawing circles
    d3.select("#patient-graph-section-one svg").append("g").attr("transform","translate("+(margin.left+100)+","+(margin.top+100)+")")
    .selectAll("circle").data(patientgeneinfo[k].gene).enter().append("circle").attr({
      cx:k*100,
      cy:function(d,i){return i*30; },
      r:r,
      "fill":function(d){
        if(d.status == "P"){
          return "#000000";
        } else {
          return "#CCCCCC";
        }
      }
    })
  }
  // exp responder

     $scope.drawScatterExp = function(k){
    var r = 12;
    // y axis text 
    d3.select("#patient-graph-section-two svg").append("g").attr("transform","translate("+margin.left+","+(margin.top+104)+")")
    .selectAll("text").data($scope.method.allgene).enter().append("text").text(function(d){ return d;}).attr({
      x:0,
      y:function(d,i){return i*30; },
      "font-size":"14px",
    });

    

    

    //drawing circles
    d3.select("#patient-graph-section-two svg").append("g").attr("transform","translate("+(margin.left+100)+","+(margin.top+100)+")")
    .selectAll("circle").data(patientgeneinfo[k].gene).enter().append("circle").attr({
      cx:k*100,
      cy:function(d,i){return i*30; },
      r:r,
      "fill":function(d){
        if(d.status == "P"){
          return "#000000";
        } else {
          return "#CCCCCC";
        }
      }
    })
  }

  for (var k = 0; k < $scope.method.patients.length; k++) {
    $scope.drawScatterNorm(k);
    $scope.drawScatterExp(k);
  };






})//then brackets



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


