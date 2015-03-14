bioJs.factory('D3Service', function(){
  
 function d3Draw (){
  
  var margin = {top:20,bottom:20,left:100,right:100};
  var width = 1000 - margin.left - margin.right;
  var height = 500 - margin.top - margin.bottom;;
  var maxDiff;
  var dnaStartEndPosition = [];


  d3.json("http://localhost/onco/app/webservice.json",function  (data) {
    
    for (var i = 0; i < data.genomicProfileList.length; i++) {
      for (var j = 0; j < data.genomicProfileList[i].mutationList.length; j++) {
        // dnaPosition.push({
        //   ch:data.genomicProfileList[i].mutationList[j].chromosome,
        //   start:data.genomicProfileList[i].mutationList[j].dnaStartPosition,
        //   end:data.genomicProfileList[i].mutationList[j].dnaEndPosition
        // });
        dnaStartEndPosition.push(data.genomicProfileList[i].mutationList[j].dnaStartPosition);
        dnaStartEndPosition.push(data.genomicProfileList[i].mutationList[j].dnaEndPosition);
      };
    };


    var xScale = d3.scale.linear()
                 .domain([0,d3.max(dnaStartEndPosition)])
                 .range([0,width]); 

    maxDiff = d3.max(dnaStartEndPosition)-d3.min(dnaStartEndPosition);

    var svg = d3.select("#chart").append("svg").attr("height",height + margin.top + margin.bottom)
    .attr("width",width)
    .style("background","#bbb");

    


    

    var yScale = d3.scale.linear()
                 .domain([0,50])
                 .range([height,0]); 

    var yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(50);
    var yAxisGen = d3.select("svg").append("g");
    yAxis(yAxisGen);

    yAxisGen.attr("transform","translate("+margin.left+","+(margin.top+3)+")");
    yAxisGen.selectAll("path").style({fill:"none",stroke:"#000"});
    yAxisGen.selectAll("line").style({stroke:"#000"});
    yAxisGen.selectAll("text").style("font-size","8px");

    function drawBar(k){
        var barwidth = 50;
        d3.select("svg").append("g").attr("transform","translate("+(k*barwidth+margin.left)+","+margin.top+")").selectAll("rect").data(data.genomicProfileList[k].mutationList).enter().append("rect")
      .attr({
        width:barwidth,
        height:function(){ return height/(data.genomicProfileList[k].mutationList.length)-2;},
        x:10+(k*barwidth),
        y:function(d,i){ return height-i*(height/(data.genomicProfileList[k].mutationList.length))}
      }).style("fill","green");
    }
    


      for (var k = 0; k < data.genomicProfileList.length; k++) {
        drawBar(k);
      };
   






    console.log(d3.min(dnaStartEndPosition));
    console.log(d3.max(dnaStartEndPosition));
    console.log(xScale(2000));

  });
}

 return { d3: d3Draw()}
});


