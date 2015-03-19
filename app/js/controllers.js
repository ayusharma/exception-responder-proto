'use strict';

var onco = angular.module('onco',['ngRoute','ui.bootstrap','angular-loading-bar','ngAnimate'])

.controller('HomeCtrl',function($scope){

})

.controller('DashboardCtrlMul',function($scope,PatientOne,PatientTwo,PatientThree,PatientFour,PatientFive,ExpRespOne,ExpRespTwo,ExpRespThree,ExpRespFour,ExpRespFive){
  var datap1,datap2,datap3,datap4,datap5,exp1,exp2,exp3,exp4,exp5,fdata;
   PatientOne.then(function(data){
    datap1 = data;
  })
  PatientTwo.then(function(data){
   datap2 = data;
 })
  PatientThree.then(function(data){
   datap3 = data;
 })
  PatientFour.then(function(data){
  datap4 = data;
 })
  PatientFive.then(function(data){
   datap5 = data;

 })
  ExpRespOne.then(function(data){
   exp1 = data;

 })
  ExpRespTwo.then(function(data){
   exp2 = data;

 })
  ExpRespThree.then(function(data){
   exp3 = data;

 })
  ExpRespFour.then(function(data){
   exp4 = data;

 })
  ExpRespFive.then(function(data){
   exp5 = data;

 }).then(function(){

   

    function d3Draw (data){

      var margin = {top:20,bottom:20,left:10,right:10};
      var width = 1240 - margin.left - margin.right;
      var height = 150 - margin.top - margin.bottom;;
      var dnaStartEndPosition = [];
      var geneSymbol = [];
      var chromosomeno = [];



        for (var i = 0; i < data.genomicProfileList.length; i++) {
          for (var j = 0; j < data.genomicProfileList[i].mutationList.length; j++) {
            geneSymbol.push(data.genomicProfileList[i].mutationList[j].geneSymbol);
            chromosomeno.push(data.genomicProfileList[i].mutationList[j].chromosome.substring(3,5));
            dnaStartEndPosition.push(data.genomicProfileList[i].mutationList[j].dnaStartPosition);
            dnaStartEndPosition.push(data.genomicProfileList[i].mutationList[j].dnaEndPosition);
          };
        };

      //function to get a unique value from array
      function unique(m){
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

      //for selection of no. of chromosomes
      function geneSelector(selectedgene){
        var chromono = [];
        for (var i = 0; i < data.genomicProfileList.length; i++) {
          for (var j = 0; j < data.genomicProfileList[i].mutationList.length; j++){
            if(selectedgene == data.genomicProfileList[i].mutationList[j].geneSymbol){
              chromono.push({biopsy:i+1,chrno:data.genomicProfileList[i].mutationList[j].chromosome.substring(3,5)});
            }
          }
        };
        d3.select("#gene-selector-result").selectAll("h5").remove();
        d3.select("#gene-selector-result").selectAll("h5").data(chromono).enter().append("h5").attr("class","alert alert-info").text(function(d){ return " Biopsy: "+d.biopsy+" Chromosome No. "+d.chrno;})
      }


      //for selection of muted genes
      function chromosomeSelector(selectedchromosome){
        var geneinfo = [];
        for (var i = 0; i < data.genomicProfileList.length; i++) {
          for (var j = 0; j < data.genomicProfileList[i].mutationList.length; j++){
            if(selectedchromosome == data.genomicProfileList[i].mutationList[j].chromosome.substring(3,5)){
              geneinfo.push({biopsy:i+1,gene:data.genomicProfileList[i].mutationList[j].geneSymbol});
            }
          }
        };
        d3.select("#chromosome-selector-result").selectAll("h5").remove();
        d3.select("#chromosome-selector-result").selectAll("h5").data(geneinfo).enter().append("h5").attr("class","alert alert-info").text(function(d){ return " Biopsy: "+d.biopsy+" Muted Genes: "+d.gene;})
      }

      //making the repeated values array sort
      geneSymbol.sort();
      chromosomeno.sort();

      geneSymbol = unique(geneSymbol);
      chromosomeno = unique(chromosomeno);
      console.log(geneSymbol);
      console.log(chromosomeno);

     //gene selector
     d3.select("#gene-selector").selectAll("option").data(geneSymbol).enter()
     .append("option").attr("value",function(d){return d;}).text(function(d){ return d;})

     //chromosome selector
     d3.select("#chromosome-selector").selectAll("option").data(chromosomeno).enter()
     .append("option").attr("value",function(d){return d;}).text(function(d){ return d;})

     // //tooltip on hover
     // var tooltip = d3.select("body").append("div").attr("class","tooltip")
     // .style("position","absolute")
     // .style("padding","0 10px")
     // .style("background","white")
     // .style("opacity",0);

     var svg = d3.select("#chart").append("svg").attr("height",height + margin.top + margin.bottom)
     .attr("width",width + margin.left + margin.right)
     .style("background","#FFF");


      //function to show details in analytic section
      function analyticDetails (obAnalyticDet){
        var panel = '<div class="alert alert-info alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong id="panel-det"></div>'
        var details = 'Chromosome: '+obAnalyticDet.chromosome.substring(3,5)+'<br>Gene Symbol: '+obAnalyticDet.geneSymbol+'<br>Reference Genome: '+obAnalyticDet.referenceGenome+'<br>Enterez Gene Id: '+obAnalyticDet.entrezGeneId+'<br>Dna Start & End Position: '+obAnalyticDet.dnaStartPosition+', '+obAnalyticDet.dnaEndPosition+'<br>Strand: '+obAnalyticDet.strand+'<br>Variant Classification: '+obAnalyticDet.variantClassification+'<br>Alternative & Reference Allele Reads: '+obAnalyticDet.alternativeAlleleReads+', '+obAnalyticDet.referenceAlleleReads
        
        console.log("this is analytic details function");
        d3.select("#analytic-result").append("div").html(panel).select("#panel-det").html(details);
      }


      //function to draw bar chart
      function drawBar(k){
        var bar_height = 20;
        d3.select("#biopsy-result #biopsy-section svg").append("g").attr("class","bar-rect-"+k).attr("transform","translate("+(margin.left)+","+(k*bar_height+margin.top)+")").selectAll("rect").data(data.genomicProfileList[k].mutationList).enter().append("rect")
        .on("click",function(d){
          d3.select(this).style("fill","red")
          var obAnalyticDet = {
            entrezGeneId: d.entrezGeneId,
            geneSymbol: d.geneSymbol,
            referenceGenome: d.referenceGenome,
            chromosome: d.chromosome,
            dnaStartPosition: d.dnaStartPosition,
            dnaEndPosition: d.dnaEndPosition,
            strand: d.strand,
            variantClassification: d.variantClassification,
            referenceAllele: d.referenceAllele,
            variantAllele: d.variantAllele,
            alternativeAlleleReads: d.alternativeAlleleReads,
            referenceAlleleReads: d.referenceAlleleReads,
            dbSnpRsId: d.dbSnpRsId,
            dbSnpRsValStatus: d.dbSnpRsValStatus,
            annotationTranscript: d.annotationTranscript,
            transcriptStrand: d.transcriptStrand,
            cDnaChange: d.cDnaChange,
            codonChange: d.codonChange,
            aaChange: d.aaChange,
            otherTranscript: d.otherTranscript,
            refseqMrnaId: d.refseqMrnaId,
            refseqProtId: d.refseqProtId,
            swissprotAccession: d.swissprotAccession,
            swissprotEntry: d.swissprotEntry,
            uniprotAaPosition: d.uniprotAaPosition,
            uniprotRegion: d.uniprotRegion,
            uniprotSite: d.uniprotSite,
            vertebrateAaAlignment: d.vertebrateAaAlignment
          }
          analyticDetails(obAnalyticDet);
        })
        // .on("mouseover",function(d){
        //     d3.select(this).style("opacity",".8");
        //     tooltip.transition().style("opacity","1")
        //     // console.log(d)
        //     tooltip.html(d.geneSymbol)
        //     .style("left",(d3.event.pageX)+"px")
        //     .style("top",(d3.event.pageY)-15+"px")
        // })
        // .on("mouseout",function(d){
        //     d3.select(this).style("opacity","1");
        //     tooltip.transition().style("opacity","0")
        // })
.attr({
  width:width/(data.genomicProfileList[k].mutationList.length)-5,
  x:function(d,i){ return i*(width/(data.genomicProfileList[k].mutationList.length))},
  height:bar_height,
  y:k*bar_height+5
}).style("fill","#575757").style("cursor","pointer");

d3.select(" #biopsy-result #biopsy-section svg").append("g").attr("class","bar-text-"+k).attr("transform","translate("+(margin.left)+","+(k*bar_height+margin.top)+")").selectAll("text").data(data.genomicProfileList[k].mutationList).enter().append("text").text(function(d){
  return d.chromosome.substring(3,5);
}).attr({
  "text-anchor":"middle",
  "font-size":"10px",
  x:function(d,i){ return i*(width/(data.genomicProfileList[k].mutationList.length))+8},
  y:k*bar_height+19,
  "fill":"#FFF",
  "font-weight":"bold",
  "cursor":"pointer"
})
.on("click",function(d,i){
  d3.select(".bar-rect-"+k).select("rect:nth-child("+(i+1)+")").style("fill","red");
  var obAnalyticDet = {
    entrezGeneId: d.entrezGeneId,
    geneSymbol: d.geneSymbol,
    referenceGenome: d.referenceGenome,
    chromosome: d.chromosome,
    dnaStartPosition: d.dnaStartPosition,
    dnaEndPosition: d.dnaEndPosition,
    strand: d.strand,
    variantClassification: d.variantClassification,
    referenceAllele: d.referenceAllele,
    variantAllele: d.variantAllele,
    alternativeAlleleReads: d.alternativeAlleleReads,
    referenceAlleleReads: d.referenceAlleleReads,
    dbSnpRsId: d.dbSnpRsId,
    dbSnpRsValStatus: d.dbSnpRsValStatus,
    annotationTranscript: d.annotationTranscript,
    transcriptStrand: d.transcriptStrand,
    cDnaChange: d.cDnaChange,
    codonChange: d.codonChange,
    aaChange: d.aaChange,
    otherTranscript: d.otherTranscript,
    refseqMrnaId: d.refseqMrnaId,
    refseqProtId: d.refseqProtId,
    swissprotAccession: d.swissprotAccession,
    swissprotEntry: d.swissprotEntry,
    uniprotAaPosition: d.uniprotAaPosition,
    uniprotRegion: d.uniprotRegion,
    uniprotSite: d.uniprotSite,
    vertebrateAaAlignment: d.vertebrateAaAlignment
  }
  analyticDetails(obAnalyticDet);


})
        // .on("mouseover",function(d){
        //     d3.select(this).style("opacity",".8");
        //     tooltip.transition().style("opacity","1")
        //     // console.log(d)
        //     tooltip.html(d.geneSymbol)
        //     .style("left",(d3.event.pageX)+"px")
        //     .style("top",(d3.event.pageY)-15+"px")
        // })
        // .on("mouseout",function(d){
        //     d3.select(this).style("opacity","1");
        //     tooltip.transition().style("opacity","0")
        // })
}

      //function to upadate the bar list
      function drawBarUpdate(ob){
        var width = ob.width;
        console.log(ob);
        d3.select(".bar-rect-"+ob.k).selectAll("rect").data(data.genomicProfileList[ob.k].mutationList)
        .attr({
          width:width-5,
          x:function(d,i){ return i*(width)},
        });

        d3.select(".bar-text-"+ob.k).selectAll("text").data(data.genomicProfileList[ob.k].mutationList).text(function(d){
          if (ob.val == "geneSymbol") {
            return d.geneSymbol;
          } else if (ob.val == "strand") {
            return d.strand;
          } else {
            return d.chromosome.substring(3,5);
          }
        })
        .attr({
          "font-size":"10px",
          x:function(d,i){ return i*(width)+ob.offset},
        })
        .on("click",function(d,i){
          d3.select(".bar-rect-"+ob.k).select("rect:nth-child("+(i+1)+")").style("fill","red");
          var obAnalyticDet = {
            entrezGeneId: d.entrezGeneId,
            geneSymbol: d.geneSymbol,
            referenceGenome: d.referenceGenome,
            chromosome: d.chromosome,
            dnaStartPosition: d.dnaStartPosition,
            dnaEndPosition: d.dnaEndPosition,
            strand: d.strand,
            variantClassification: d.variantClassification,
            referenceAllele: d.referenceAllele,
            variantAllele: d.variantAllele,
            alternativeAlleleReads: d.alternativeAlleleReads,
            referenceAlleleReads: d.referenceAlleleReads,
            dbSnpRsId: d.dbSnpRsId,
            dbSnpRsValStatus: d.dbSnpRsValStatus,
            annotationTranscript: d.annotationTranscript,
            transcriptStrand: d.transcriptStrand,
            cDnaChange: d.cDnaChange,
            codonChange: d.codonChange,
            aaChange: d.aaChange,
            otherTranscript: d.otherTranscript,
            refseqMrnaId: d.refseqMrnaId,
            refseqProtId: d.refseqProtId,
            swissprotAccession: d.swissprotAccession,
            swissprotEntry: d.swissprotEntry,
            uniprotAaPosition: d.uniprotAaPosition,
            uniprotRegion: d.uniprotRegion,
            uniprotSite: d.uniprotSite,
            vertebrateAaAlignment: d.vertebrateAaAlignment
          }
          analyticDetails(obAnalyticDet);
        });
}



     //loop to draw the test cases
     for (var k = 0; k < data.genomicProfileList.length; k++) {
      drawBar(k);
    };


      //user selection part

      d3.select("#gene-selector").on("change",function(d,i){
        var sel = d3.select(this).node().value;
        console.log(sel);
        geneSelector(sel);
        
      });


      d3.select("#chromosome-selector").on("change",function(d,i){
        var sel = d3.select(this).node().value;
        console.log(sel);
        chromosomeSelector(sel);
        
      });


      d3.select("#clear").on("click",function(d,i){
        d3.select("#gene-selector-result").selectAll("h5").remove();
      });

      d3.select("#clear-chromosome").on("click",function(d,i){
        d3.select("#chromosome-selector-result").selectAll("h5").remove();
      });

      d3.select("#chromosome-no").on("click",function(d,i){

        d3.selectAll("#chart svg").attr("width",1240);
        for (var k = 0; k < data.genomicProfileList.length; k++) {
          drawBarUpdate({k:k,val:"chromosome",width:24.4,offset:8});
        };

      });

      d3.select("#gene-symbol").on("click",function(d,i){
        d3.selectAll("#chart svg").attr("width",3770);
        for (var k = 0; k < data.genomicProfileList.length; k++) {
          drawBarUpdate({k:k,val:"geneSymbol",width:75,offset:30});
        };
      });

      d3.select("#strand").on("click",function(d,i){
        d3.selectAll("#chart svg").attr("width",3770);
        for (var k = 0; k < data.genomicProfileList.length; k++) {
          drawBarUpdate({k:k,val:"strand",width:75,offset:30});
        };
      });

      d3.select("#reset").on("click",function(d,i){
        d3.selectAll("#chart svg").selectAll("rect").style("fill","#575757");
        d3.select("#analytic-result").selectAll("div").remove();

      });

  
}


  function removeSvg(){
      d3.select("#biopsy-result").selectAll("#chart svg").remove();
      d3.select("#biopsy-result").selectAll("option").remove();
    }


    $scope.p1 = function(){
      removeSvg();
      var data = datap1;
      d3Draw(data);
      
    }
    $scope.p2 = function(){
      removeSvg();
      var data = datap2;
      d3Draw(data);
      

    }
    $scope.p3 = function(){
      removeSvg();
      var data = datap3;
      d3Draw(data);
      
    }
    $scope.p4 = function(){
      removeSvg();
      var data = datap4;
      d3Draw(data);
      
    }
    $scope.p5 = function(){
      removeSvg();
      var data = datap5;
      d3Draw(data);
    }
    $scope.expr1 = function(){
      removeSvg();
      var data = exp1;
      d3Draw(data);
      
    }
    $scope.expr2 = function(){
      removeSvg();
      var data = exp2;
      d3Draw(data);
      
    }
    $scope.expr3 = function(){
      removeSvg();
      var data = exp3;
      d3Draw(data);
    }
    $scope.expr4 = function(){
      removeSvg();
      var data = exp4;
      d3Draw(data);
    }
    $scope.expr5 = function(){
      removeSvg();
      var data = exp5;
      d3Draw(data);
    }
 })
  

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
    // console.log(patientData);
    for (var i = 0; i < patientData.length; i++) {  
      // console.log(patientData);
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
  var timeline2 = new Chronoline(document.getElementById("target3"), events,
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

  //tooltip on hover
     var tooltip = d3.select("body").append("div").attr("class","tooltip")
     .style("position","absolute")
     .style("padding","0 10px")
     .style("background","white")
     .style("opacity",0);
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

//modifying exp resp data
var exprespmod = [];
for (var i = 0; i < $scope.method.expresp.length; i++) {
  exprespmod.push({patient:i+1,gene:[]});
  for (var j = 0; j < $scope.method.allgene.length; j++) {
   exprespmod[i].gene.push({gene:$scope.method.allgene[j],status:"NP",chromosome:""})
   for (var k = 0; k < $scope.method.expresp[i].genomicProfileList.length; k++) {
     for (var l = 0; l < $scope.method.expresp[i].genomicProfileList[k].mutationList.length; l++) {
      if($scope.method.allgene[j] == $scope.method.expresp[i].genomicProfileList[k].mutationList[l].geneSymbol){
        exprespmod[i].gene[j].status = "P";
        exprespmod[i].gene[j].chromosome = $scope.method.expresp[i].genomicProfileList[k].mutationList[l].chromosome;

      }
    }
  }
}
}

  //drawing d3 graphs
  var margin = {top:20,bottom:20,left:20,right:0};
  var w = 550 - margin.left - margin.right;
  var h = 8000 - margin.top - margin.bottom;


  var svg = d3.select("#patient-graph-section-one").append("svg").style("background","#FFF")
  .attr("width",w + margin.left + margin.right)
  .attr("height",h + margin.top + margin.bottom)

  var svg = d3.select("#patient-graph-section-two").append("svg").style("background","#F2EADF")
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
      cy:function(d,i){ console.log(d);return i*30; },
      r:r,
      "fill":function(d){
        if(d.status == "P"){
          return "#000000";
        } else {
          return "#CCCCCC";
        }
      }
    })
    .on("mouseover",function(d){
            d3.select(this).style("opacity",".8");
            tooltip.style("opacity","1")
            // console.log(d)
            tooltip.html(d.gene)
            .style("left",(d3.event.pageX)+"px")
            .style("top",(d3.event.pageY)-15+"px")
        })
        .on("mouseout",function(d){
            d3.select(this).style("opacity","1");
            tooltip.style("opacity","0")
        });
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
    .selectAll("circle").data(exprespmod[k].gene).enter().append("circle").attr({
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
    .on("mouseover",function(d){
            d3.select(this).style("opacity",".8");
            tooltip.style("opacity","1")
            // console.log(d)
            tooltip.html(d.gene)
            .style("left",(d3.event.pageX)+"px")
            .style("top",(d3.event.pageY)-15+"px")
        })
        .on("mouseout",function(d){
            d3.select(this).style("opacity","1");
            tooltip.style("opacity","0")
        });
  }
  //calling visulization functions
  for (var k = 0; k < $scope.method.patients.length; k++) {
    $scope.drawScatterNorm(k);
    $scope.drawScatterExp(k);
  };

  //creating data for expresp analysis according genes
  
  var exrespana = [];
  for (var i = 0; i <  $scope.method.allgene.length; i++) {
    var count = 0;
    exrespana.push({gene:null,value:null});
    for (var j = 0; j < exprespmod.length; j++) {
     exrespana[i].gene = exprespmod[j].gene[i].gene;
     if(exprespmod[j].gene[i].status == "P"){
      count = count+1;
      exrespana[i].value = (count/exprespmod.length)*100;
    } 
  }
};
  //responder-chart-1
  //drawing Respond Scale of Exceptional Responder

  function expRespAnalysisBar(){

    var margin = {top:20,bottom:100,left:60,right:0};
    var w = 8000 - margin.left - margin.right;
    var h = 600 - margin.top - margin.bottom;

    var yScale = d3.scale.linear()
    .domain([0,d3.max(exrespana,function(d){ return d.value;})])
    .range([0,h]);

    var svg = d3.select("#responder-chart-1").append("svg").style("background","#FFF")
    .attr("width",w + margin.left + margin.right)
    .attr("height",h + margin.top + margin.bottom)

    d3.select("#responder-chart-1 svg").append("g").attr("id","graph-bar-exp-resp-ana").attr("transform","translate("+(margin.left)+","+(margin.top)+")")
    .selectAll("rect").data(exrespana).enter().append("rect").attr({
      x:function(d,i){ return i*(w/exrespana.length)},
      width: function(d,i){ return w/exrespana.length-2 },
      y:function(d,i){return h-yScale(d.value); },
      height:function(d,i){ return yScale(d.value);}
    }).style("fill","#4E8AD9")
    .on("mouseover",function(d){
            d3.select(this).style("opacity",".8");
            tooltip.style("opacity","1")
            // console.log(d)
            tooltip.html(d.value)
            .style("left",(d3.event.pageX)+"px")
            .style("top",(d3.event.pageY)-15+"px")
        })
        .on("mouseout",function(d){
            d3.select(this).style("opacity","1");
            tooltip.style("opacity","0")
        });

    var yScaleAxis = d3.scale.linear()
    .domain([0,d3.max(exrespana,function(d){ return d.value;})])
    .range([h,0]);

    var yAxis = d3.svg.axis().scale(yScaleAxis).orient("left");
    var yAxisGen = d3.select("#responder-chart-1").select("svg").append("g").attr("class","y-axis");
    yAxis(yAxisGen);

    yAxisGen.attr("transform","translate("+margin.left+","+margin.top+")");
    yAxisGen.selectAll("path").style({fill:"none",stroke:"#000"});
    yAxisGen.selectAll("line").style({stroke:"#000"});

    d3.select("#responder-chart-1").select("svg").append("g").attr("transform","translate("+(margin.left+20)+","+(h)+")").selectAll("text").data($scope.method.allgene).enter().append("text").attr("id","expinfotextana").text(function(d){ return d;}).attr({
      "fill":"green",
      x:-100,
      y:function(d,i){
        return i*(w/$scope.method.allgene.length);
      },

    })

    var lineFun = d3.svg.line()
    .x(function(d,i){ return i*(w/exrespana.length)+((w/exrespana.length)/2)})
    .y(function(d){ return h-yScale(d.value);})
    .interpolate("linear"); 

    var viz = d3.select("#responder-chart-1").select("svg").append("path").attr("id","graph-line-exp-resp-ana").attr("transform","translate("+(margin.left)+","+(margin.top)+")")
    .attr({
      d:lineFun(exrespana), 
      "stroke":"purple",
      "stroke-width":2,
      "fill":"none",
    });

  }
  expRespAnalysisBar();
  //controlling line and bar chart
  var k = 0;
  d3.select("#bar-chart").classed("active",true);
  d3.select("#bar-chart").on("click",function(){
    if(k==0){
      d3.select(this).classed("active",false);
      d3.select("#graph-bar-exp-resp-ana").classed("show-hide",true);
      k = 1;
    } else {
      d3.select(this).classed("active",true);
      d3.select("#graph-bar-exp-resp-ana").classed("show-hide",false);
      k = 0;
    }
    manageBarLine();
  })

  var m = 0;
  d3.select("#graph-line-exp-resp-ana").classed("show-hide",true);
  d3.select("#line-chart").on("click",function(){
    if(m==0){
      d3.select(this).classed("active",true);
      d3.select("#graph-line-exp-resp-ana").classed("show-hide",false);
      m = 1;
    } else {
      d3.select(this).classed("active",false);
      d3.select("#graph-line-exp-resp-ana").classed("show-hide",true);
      m = 0;
    }
    manageBarLine();
  })

  function manageBarLine(){
    if( m == 0 && k == 1){
      alert("Please select one of the value");
      d3.select("#bar-chart").classed("active",false);
      d3.select("#line-chart").classed("active",false);
    } 
  }

//function to get the patient values
function patientVal(selectedPatient){
  var patientvalue=0;
  for (var i = 0; i < $scope.method.genePresent(selectedPatient).length; i++) {
    for (var j = 0; j < exrespana.length; j++) {
      if($scope.method.genePresent(selectedPatient)[i] == exrespana[j].gene){
        var temp = exrespana[j].value;
        patientvalue = patientvalue+temp;
      };
    };
  }
  return patientvalue;
}
console.log(patientVal(3));
//function to get the exceptional responder values
function exprespVal () {
  var exprespval = 0;
  for (var i = 0; i < exrespana.length; i++) {
    var temp = exrespana[i].value;
    exprespval = exprespval+temp;
  };
  return exprespval;
}


//survival rate of patients
$scope.method.survivalrate = [];
for (var i = 0; i < $scope.method.patients.length; i++) {
  var cal = (((patientVal(i)/exprespVal())*100).toFixed(2));
  $scope.method.survivalrate.push(cal);
}

//putting progressbar values




})//then brackets


})



