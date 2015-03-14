bioJs.factory('D3Service', function(){

  function d3Draw (){

    var margin = {top:20,bottom:20,left:20,right:20};
    var width = 1240 - margin.left - margin.right;
    var height = 150 - margin.top - margin.bottom;;
    var dnaStartEndPosition = [];
    var geneSymbol = [];
    


    d3.json("http://localhost/onco/app/webservice.json",function  (data) {

      for (var i = 0; i < data.genomicProfileList.length; i++) {
        for (var j = 0; j < data.genomicProfileList[i].mutationList.length; j++) {
          geneSymbol.push(data.genomicProfileList[i].mutationList[j].geneSymbol);
          dnaStartEndPosition.push(data.genomicProfileList[i].mutationList[j].dnaStartPosition);
          dnaStartEndPosition.push(data.genomicProfileList[i].mutationList[j].dnaEndPosition);
        };
      };

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

     geneSymbol.sort();

     geneSymbol = unique(geneSymbol);

     console.log(geneSymbol);

     //gene selector
     d3.select("#gene-selector").selectAll("option").data(geneSymbol).enter()
     .append("option").text(function(d){ return d;})

      var tooltip = d3.select("body").append("div").attr("class","tooltip")
          .style("position","absolute")
          .style("padding","0 10px")
          .style("background","white")
          .style("opacity",0);

      var svg = d3.select("#chart").append("svg").attr("height",height + margin.top + margin.bottom)
      .attr("width",width + margin.left + margin.right)
      .style("background","#bbb");


      var xScale = d3.scale.linear()
      .domain([1,50])
      .range([1,width]); 

      // var xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(48)
      // var xAxisGen = d3.select("svg").append("g");
      // xAxis(xAxisGen);

      // xAxisGen.attr("transform","translate("+margin.left+","+(height)+")");
      // xAxisGen.selectAll("path").style({fill:"none",stroke:"#000"});
      // xAxisGen.selectAll("line").style({stroke:"#000"});
      // xAxisGen.selectAll("line").attr("y2",-(height-margin.top));
      // xAxisGen.selectAll("text").style("font-size","8px");



      var yScale = d3.scale.linear()
      .domain([0,data.genomicProfileList.length])
      .range([height,0]); 

      // var yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(3)
      // var yAxisGen = d3.select("svg").append("g");
      // yAxis(yAxisGen);

      // yAxisGen.attr("transform","translate("+margin.left+","+(margin.top)+")");
      // yAxisGen.selectAll("path").style({fill:"none",stroke:"#000"});
      // yAxisGen.selectAll("line").style({stroke:"#000"});
      // yAxisGen.selectAll("text").style("font-size","8px");

      function drawBar(k){
        var bar_height = 20;
        d3.select("svg").append("g").attr("transform","translate("+(margin.left)+","+(k*bar_height+margin.top)+")").selectAll("rect").data(data.genomicProfileList[k].mutationList).enter().append("rect")
        .on("mouseover",function(d){
            d3.select(this).style("opacity",".8");
            tooltip.transition().style("opacity","1")
            console.log(d)
            tooltip.html(d.geneSymbol)
            .style("left",(d3.event.pageX)+"px")
            .style("top",(d3.event.pageY)-15+"px")
        })
        .on("mouseout",function(d){
            d3.select(this).style("opacity","1");
            tooltip.transition().style("opacity","0")
        })
        .attr({
          width:width/(data.genomicProfileList[k].mutationList.length)-5,
          x:function(d,i){ return i*(width/(data.genomicProfileList[k].mutationList.length))},
          height:bar_height,
          y:k*bar_height+5
        }).style("fill","#575757").style("cursor","pointer");

        d3.select("svg").append("g").attr("transform","translate("+(margin.left)+","+(k*bar_height+margin.top)+")").selectAll("text").data(data.genomicProfileList[k].mutationList).enter().append("text").text(function(d){
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
        .on("mouseover",function(d){
            d3.select(this).style("opacity",".8");
            tooltip.transition().style("opacity","1")
            console.log(d)
            tooltip.html(d.geneSymbol)
            .style("left",(d3.event.pageX)+"px")
            .style("top",(d3.event.pageY)-15+"px")
        })
        .on("mouseout",function(d){
            d3.select(this).style("opacity","1");
            tooltip.transition().style("opacity","0")
        });
      }


      for (var k = 0; k < data.genomicProfileList.length; k++) {
        drawBar(k);
      };

      console.log(d3.min(dnaStartEndPosition));
      console.log(d3.max(dnaStartEndPosition));
      console.log(xScale(2000));


      //user selection part

      d3.select("#gene-selector").on("change",function(d,i){
        var sel = d3.select(this).node().value;
        console.log(sel);
        geneSelector(sel);
        
      });

      d3.select("#clear").on("click",function(d,i){
        d3.select("#gene-selector-result").selectAll("h5").remove();
      });

    });
}

return { d3: d3Draw()}
});


