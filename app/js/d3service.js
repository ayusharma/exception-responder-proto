// onco.factory('D3Service', function(){
//
//   function d3Draw (){
//
//     var margin = {top:20,bottom:20,left:10,right:10};
//     var width = 1240 - margin.left - margin.right;
//     var height = 150 - margin.top - margin.bottom;;
//     var dnaStartEndPosition = [];
//     var geneSymbol = [];
//     var chromosomeno = [];
//
//
//     d3.json("http://localhost:8080/oncoblocks/webservice.do?query=get_patient_bundle",function  (data) {
//
//       for (var i = 0; i < data.genomicProfileList.length; i++) {
//         for (var j = 0; j < data.genomicProfileList[i].mutationList.length; j++) {
//           geneSymbol.push(data.genomicProfileList[i].mutationList[j].geneSymbol);
//           chromosomeno.push(data.genomicProfileList[i].mutationList[j].chromosome.substring(3,5));
//           dnaStartEndPosition.push(data.genomicProfileList[i].mutationList[j].dnaStartPosition);
//           dnaStartEndPosition.push(data.genomicProfileList[i].mutationList[j].dnaEndPosition);
//         };
//       };
//
//       //function to get a unique value from array
//       function unique(m){
//         var prev = m[0];
//         var m_sort = [];
//         m_sort.push(prev);
//         for (var i = 0; i < m.length; i++) {
//           if(m[i] != prev){
//             m_sort.push(m[i]);
//             prev = m[i];
//           }
//         };
//         return m_sort;
//       }
//
//       //for selection of no. of chromosomes
//       function geneSelector(selectedgene){
//       var chromono = [];
//       for (var i = 0; i < data.genomicProfileList.length; i++) {
//         for (var j = 0; j < data.genomicProfileList[i].mutationList.length; j++){
//           if(selectedgene == data.genomicProfileList[i].mutationList[j].geneSymbol){
//             chromono.push({biopsy:i+1,chrno:data.genomicProfileList[i].mutationList[j].chromosome.substring(3,5)});
//           }
//         }
//       };
//       d3.select("#gene-selector-result").selectAll("h5").remove();
//       d3.select("#gene-selector-result").selectAll("h5").data(chromono).enter().append("h5").attr("class","alert alert-info").text(function(d){ return " Biopsy: "+d.biopsy+" Chromosome No. "+d.chrno;})
//       }
//
//
//       //for selection of muted genes
//       function chromosomeSelector(selectedchromosome){
//       var geneinfo = [];
//       for (var i = 0; i < data.genomicProfileList.length; i++) {
//         for (var j = 0; j < data.genomicProfileList[i].mutationList.length; j++){
//           if(selectedchromosome == data.genomicProfileList[i].mutationList[j].chromosome.substring(3,5)){
//             geneinfo.push({biopsy:i+1,gene:data.genomicProfileList[i].mutationList[j].geneSymbol});
//           }
//         }
//       };
//       d3.select("#chromosome-selector-result").selectAll("h5").remove();
//       d3.select("#chromosome-selector-result").selectAll("h5").data(geneinfo).enter().append("h5").attr("class","alert alert-info").text(function(d){ return " Biopsy: "+d.biopsy+" Muted Genes: "+d.gene;})
//       }
//
//       //making the repeated values array sort
//      geneSymbol.sort();
//      chromosomeno.sort();
//
//      geneSymbol = unique(geneSymbol);
//      chromosomeno = unique(chromosomeno);
//      console.log(geneSymbol);
//      console.log(chromosomeno);
//
//      //gene selector
//      d3.select("#gene-selector").selectAll("option").data(geneSymbol).enter()
//      .append("option").attr("value",function(d){return d;}).text(function(d){ return d;})
//
//      //chromosome selector
//      d3.select("#chromosome-selector").selectAll("option").data(chromosomeno).enter()
//      .append("option").attr("value",function(d){return d;}).text(function(d){ return d;})
//
//      //tooltip on hover
//       var tooltip = d3.select("body .container-fluid").append("div").attr("class","tooltip")
//           .style("position","absolute")
//           .style("padding","0 10px")
//           .style("background","white")
//           .style("opacity",0);
//
//       var svg = d3.select("#chart").append("svg").attr("height",height + margin.top + margin.bottom)
//       .attr("width",width + margin.left + margin.right)
//       .style("background","#FFF");
//
//
//       //function to show details in analytic section
//       function analyticDetails (obAnalyticDet){
//         var panel = '<div class="alert alert-info alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong id="panel-det"></div>'
//         var details = 'Chromosome: '+obAnalyticDet.chromosome.substring(3,5)+'<br>Gene Symbol: '+obAnalyticDet.geneSymbol+'<br>Reference Genome: '+obAnalyticDet.referenceGenome+'<br>Enterez Gene Id: '+obAnalyticDet.entrezGeneId+'<br>Dna Start & End Position: '+obAnalyticDet.dnaStartPosition+', '+obAnalyticDet.dnaEndPosition+'<br>Strand: '+obAnalyticDet.strand+'<br>Variant Classification: '+obAnalyticDet.variantClassification+'<br>Alternative & Reference Allele Reads: '+obAnalyticDet.alternativeAlleleReads+', '+obAnalyticDet.referenceAlleleReads
//
//         console.log("this is analytic details function");
//         d3.select("#analytic-result").append("div").html(panel).select("#panel-det").html(details);
//       }
//
//
//       //function to draw bar chart
//       function drawBar(k){
//         var bar_height = 20;
//         d3.select("#chart svg").append("g").attr("class","bar-rect-"+k).attr("transform","translate("+(margin.left)+","+(k*bar_height+margin.top)+")").selectAll("rect").data(data.genomicProfileList[k].mutationList).enter().append("rect")
//         .on("click",function(d){
//           d3.select(this).style("fill","red")
//           var obAnalyticDet = {
//           entrezGeneId: d.entrezGeneId,
//           geneSymbol: d.geneSymbol,
//           referenceGenome: d.referenceGenome,
//           chromosome: d.chromosome,
//           dnaStartPosition: d.dnaStartPosition,
//           dnaEndPosition: d.dnaEndPosition,
//           strand: d.strand,
//           variantClassification: d.variantClassification,
//           referenceAllele: d.referenceAllele,
//           variantAllele: d.variantAllele,
//           alternativeAlleleReads: d.alternativeAlleleReads,
//           referenceAlleleReads: d.referenceAlleleReads,
//           dbSnpRsId: d.dbSnpRsId,
//           dbSnpRsValStatus: d.dbSnpRsValStatus,
//           annotationTranscript: d.annotationTranscript,
//           transcriptStrand: d.transcriptStrand,
//           cDnaChange: d.cDnaChange,
//           codonChange: d.codonChange,
//           aaChange: d.aaChange,
//           otherTranscript: d.otherTranscript,
//           refseqMrnaId: d.refseqMrnaId,
//           refseqProtId: d.refseqProtId,
//           swissprotAccession: d.swissprotAccession,
//           swissprotEntry: d.swissprotEntry,
//           uniprotAaPosition: d.uniprotAaPosition,
//           uniprotRegion: d.uniprotRegion,
//           uniprotSite: d.uniprotSite,
//           vertebrateAaAlignment: d.vertebrateAaAlignment
//         }
//         analyticDetails(obAnalyticDet);
//         })
//         // .on("mouseover",function(d){
//         //     d3.select(this).style("opacity",".8");
//         //     tooltip.transition().style("opacity","1")
//         //     // console.log(d)
//         //     tooltip.html(d.geneSymbol)
//         //     .style("left",(d3.event.pageX)+"px")
//         //     .style("top",(d3.event.pageY)-15+"px")
//         // })
//         // .on("mouseout",function(d){
//         //     d3.select(this).style("opacity","1");
//         //     tooltip.transition().style("opacity","0")
//         // })
//         .attr({
//           width:width/(data.genomicProfileList[k].mutationList.length)-5,
//           x:function(d,i){ return i*(width/(data.genomicProfileList[k].mutationList.length))},
//           height:bar_height,
//           y:k*bar_height+5
//         }).style("fill","#575757").style("cursor","pointer");
//
//         d3.select("svg").append("g").attr("class","bar-text-"+k).attr("transform","translate("+(margin.left)+","+(k*bar_height+margin.top)+")").selectAll("text").data(data.genomicProfileList[k].mutationList).enter().append("text").text(function(d){
//             return d.chromosome.substring(3,5);
//         }).attr({
//           "text-anchor":"middle",
//           "font-size":"10px",
//           x:function(d,i){ return i*(width/(data.genomicProfileList[k].mutationList.length))+8},
//           y:k*bar_height+19,
//           "fill":"#FFF",
//           "font-weight":"bold",
//           "cursor":"pointer"
//         })
//         .on("click",function(d,i){
//           d3.select(".bar-rect-"+k).select("rect:nth-child("+(i+1)+")").style("fill","red");
//           var obAnalyticDet = {
//           entrezGeneId: d.entrezGeneId,
//           geneSymbol: d.geneSymbol,
//           referenceGenome: d.referenceGenome,
//           chromosome: d.chromosome,
//           dnaStartPosition: d.dnaStartPosition,
//           dnaEndPosition: d.dnaEndPosition,
//           strand: d.strand,
//           variantClassification: d.variantClassification,
//           referenceAllele: d.referenceAllele,
//           variantAllele: d.variantAllele,
//           alternativeAlleleReads: d.alternativeAlleleReads,
//           referenceAlleleReads: d.referenceAlleleReads,
//           dbSnpRsId: d.dbSnpRsId,
//           dbSnpRsValStatus: d.dbSnpRsValStatus,
//           annotationTranscript: d.annotationTranscript,
//           transcriptStrand: d.transcriptStrand,
//           cDnaChange: d.cDnaChange,
//           codonChange: d.codonChange,
//           aaChange: d.aaChange,
//           otherTranscript: d.otherTranscript,
//           refseqMrnaId: d.refseqMrnaId,
//           refseqProtId: d.refseqProtId,
//           swissprotAccession: d.swissprotAccession,
//           swissprotEntry: d.swissprotEntry,
//           uniprotAaPosition: d.uniprotAaPosition,
//           uniprotRegion: d.uniprotRegion,
//           uniprotSite: d.uniprotSite,
//           vertebrateAaAlignment: d.vertebrateAaAlignment
//         }
//         analyticDetails(obAnalyticDet);
//
//
//         })
//         // .on("mouseover",function(d){
//         //     d3.select(this).style("opacity",".8");
//         //     tooltip.transition().style("opacity","1")
//         //     // console.log(d)
//         //     tooltip.html(d.geneSymbol)
//         //     .style("left",(d3.event.pageX)+"px")
//         //     .style("top",(d3.event.pageY)-15+"px")
//         // })
//         // .on("mouseout",function(d){
//         //     d3.select(this).style("opacity","1");
//         //     tooltip.transition().style("opacity","0")
//         // })
//       }
//
//       //function to upadate the bar list
//       function drawBarUpdate(ob){
//         var width = ob.width;
//         console.log(ob);
//         d3.select(".bar-rect-"+ob.k).selectAll("rect").data(data.genomicProfileList[ob.k].mutationList)
//         .attr({
//           width:width-5,
//           x:function(d,i){ return i*(width)},
//         });
//
//         d3.select(".bar-text-"+ob.k).selectAll("text").data(data.genomicProfileList[ob.k].mutationList).text(function(d){
//           if (ob.val == "geneSymbol") {
//             return d.geneSymbol;
//           } else if (ob.val == "strand") {
//             return d.strand;
//           } else {
//             return d.chromosome.substring(3,5);
//           }
//         })
//         .attr({
//           "font-size":"10px",
//           x:function(d,i){ return i*(width)+ob.offset},
//         })
//         .on("click",function(d,i){
//           d3.select(".bar-rect-"+ob.k).select("rect:nth-child("+(i+1)+")").style("fill","red");
//           var obAnalyticDet = {
//           entrezGeneId: d.entrezGeneId,
//           geneSymbol: d.geneSymbol,
//           referenceGenome: d.referenceGenome,
//           chromosome: d.chromosome,
//           dnaStartPosition: d.dnaStartPosition,
//           dnaEndPosition: d.dnaEndPosition,
//           strand: d.strand,
//           variantClassification: d.variantClassification,
//           referenceAllele: d.referenceAllele,
//           variantAllele: d.variantAllele,
//           alternativeAlleleReads: d.alternativeAlleleReads,
//           referenceAlleleReads: d.referenceAlleleReads,
//           dbSnpRsId: d.dbSnpRsId,
//           dbSnpRsValStatus: d.dbSnpRsValStatus,
//           annotationTranscript: d.annotationTranscript,
//           transcriptStrand: d.transcriptStrand,
//           cDnaChange: d.cDnaChange,
//           codonChange: d.codonChange,
//           aaChange: d.aaChange,
//           otherTranscript: d.otherTranscript,
//           refseqMrnaId: d.refseqMrnaId,
//           refseqProtId: d.refseqProtId,
//           swissprotAccession: d.swissprotAccession,
//           swissprotEntry: d.swissprotEntry,
//           uniprotAaPosition: d.uniprotAaPosition,
//           uniprotRegion: d.uniprotRegion,
//           uniprotSite: d.uniprotSite,
//           vertebrateAaAlignment: d.vertebrateAaAlignment
//         }
//         analyticDetails(obAnalyticDet);
//         });
//       }
//
//
//
//      //loop to draw the test cases
//       for (var k = 0; k < data.genomicProfileList.length; k++) {
//         drawBar(k);
//       };
//
//
//       //user selection part
//
//       d3.select("#gene-selector").on("change",function(d,i){
//         var sel = d3.select(this).node().value;
//         console.log(sel);
//         geneSelector(sel);
//
//       });
//
//
//       d3.select("#chromosome-selector").on("change",function(d,i){
//         var sel = d3.select(this).node().value;
//         console.log(sel);
//         chromosomeSelector(sel);
//
//       });
//
//
//       d3.select("#clear").on("click",function(d,i){
//         d3.select("#gene-selector-result").selectAll("h5").remove();
//       });
//
//       d3.select("#clear-chromosome").on("click",function(d,i){
//         d3.select("#chromosome-selector-result").selectAll("h5").remove();
//       });
//
//       d3.select("#chromosome-no").on("click",function(d,i){
//
//         d3.selectAll("#chart svg").attr("width",1240);
//         for (var k = 0; k < data.genomicProfileList.length; k++) {
//           drawBarUpdate({k:k,val:"chromosome",width:24.4,offset:8});
//         };
//
//       });
//
//       d3.select("#gene-symbol").on("click",function(d,i){
//         d3.selectAll("#chart svg").attr("width",3770);
//         for (var k = 0; k < data.genomicProfileList.length; k++) {
//           drawBarUpdate({k:k,val:"geneSymbol",width:75,offset:30});
//         };
//       });
//
//       d3.select("#strand").on("click",function(d,i){
//         d3.selectAll("#chart svg").attr("width",3770);
//         for (var k = 0; k < data.genomicProfileList.length; k++) {
//           drawBarUpdate({k:k,val:"strand",width:75,offset:30});
//         };
//       });
//
//       d3.select("#reset").on("click",function(d,i){
//         d3.selectAll("#chart svg").selectAll("rect").style("fill","#575757");
//         d3.select("#analytic-result").selectAll("div").remove();
//
//       });
//
//     });
// }
//
// return { d3: d3Draw()}
// });
