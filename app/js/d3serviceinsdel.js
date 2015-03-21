onco.factory('D3ServiceInsDel', function(){

	function d3Draw(){

 	//variales 
 	genotypestates = [];
 	var chromotype = [];
 	var homostatus = 0; //0 for disabled
 	var heterostatus = 0;
 	var delstatus = 0;
 	var piestatus = 0;
 	var barstatus = 0;
 	var scatterstatus = 0;
 	var dataset = [{name:"homozygous",value:0},{name:"heterozygous",value:0},{name:"deletion",value:0}]; //carrier dataset charts 
 	console.log(dataset[0]);

 	function drawBarPanel(){
 		var panel = '<div class="separator"></div><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">Bar: Heterozygous v/s Homozygous v/s Deletion<button id="bar-close" class="btn btn-primary pull-right" data-dismiss="alert" aria-label="Close" aria-hidden="true">Close</button></h3></div><div class="panel-body" id="bar-chart"></div></div>';
 		d3.select("#result").append("div").attr("class","col-md-6 alert alert-dismissible").attr("id","bar-cover").attr("role","alert").html(panel);
 	}

 	function drawPiePanel(){
 		var panel = '<div class="separator"></div><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">Pie: Heterozygous v/s Homozygous v/s Deletion<button class="btn btn-primary pull-right" data-dismiss="alert" aria-label="Close" aria-hidden="true">Close</button></h3></div><div class="panel-body" id="pie-chart"></div></div>';
 		d3.select("#result").append("div").attr("class","col-md-6 alert alert-dismissible").attr("id","pie-cover").attr("role","alert").html(panel);
 	}

 	var tooltip = d3.select("body .container-fluid").append("div").attr("class","tooltip")
 	.style("position","absolute")
 	.style("padding","0 10px")
 	.style("background","white")
 	.style("opacity",0);
 	// function drawScatterPanel(){
 	// var panel = '<div class="separator"></div><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">Scatter: Heterozygous v/s Homozygous v/s Deletion<button id="pie-close" class="btn btn-primary pull-right">Close</button></h3></div><div class="panel-body" id="scatter-chart"></div></div>';
 	// d3.select("#result").append("div").attr("class","col-md-6").attr("id","scatter-cover").html(panel);
 	// }

 	d3.tsv("manny.tsv",function(error,data){

 		if(error){
 			console.log(error);
 		} else {
		//console.log(data[0]);

		//loop to get genotype states
		var counthomo = 0;
		var counthetero = 0;
		var countdel = 0;
		for (var i = 0; i < data.length; i++) {
			if(data[i].genotype == "--"){
				countdel++;
			} else if(data[i].genotype == "AA" || data[i].genotype == "TT" || data[i].genotype == "CC" || data[i].genotype == "GG"){
				counthomo++;
			} else {
				counthetero++;
			}
		};

		//loop to get genotype states
		var counthomo = 0;
		var counthetero = 0;
		var countdel = 0;
		for (var i = 0; i < data.length; i++) {
			if(data[i].genotype == "--"){
				countdel++;
			} else if(data[i].genotype == "AA" || data[i].genotype == "TT" || data[i].genotype == "CC" || data[i].genotype == "GG"){
				counthomo++;
			} else {
				counthetero++;
			}
		};


		for (var i = 0; i < data.length; i++) {
			var genestatus;
			if(data[i].genotype == "--"){
				genestatus = "del";
			} else if(data[i].genotype == "AA" || data[i].genotype == "TT" || data[i].genotype == "CC" || data[i].genotype == "GG"){
				genestatus = "homo";
			} else {
				genestatus = "hetero";
			}
			if(data[i].chromosome == "X" || data[i].chromosome == "Y" ||data[i].chromosome == "MT"){
				chromotype.push({chromosome:23,pos:data[i].position,status:genestatus});
			} else {
				chromotype.push({chromosome:data[i].chromosome,pos:data[i].position,status:genestatus});
			}
		};	

		console.log(chromotype);

		genotypestates.push({name:"homozygous",value:counthomo},{name:"heterozygous",value:counthetero},{name:"deletion",value:countdel});
		console.log(genotypestates);

		//function to draw pie chart
		function drawPie(){
			//svg parametes
			var w = 500;
			var h = 500;
			var radius = 250;
			var colors = d3.scale.category20c();	

			var pie = d3.layout.pie().value(function (d) {
				return d.value;
			});

			var arc = d3.svg.arc().outerRadius(radius);

			var myChart = d3.select("#pie-cover #pie-chart").append("svg")
			.attr("width",w).attr("height",h)
			.append("g")
			.attr("transform","translate("+(w-radius)+","+(h-radius)+")")
			.selectAll("path").data(pie(dataset)).enter().append("g")
			.attr("class","slice")
			.on("mouseover",function(d){
				console.log(d);
				d3.select(this).style("opacity",".8");
				tooltip.style("opacity","1")
				tooltip.html("<b>Name: "+d.data.name+" Value: "+d.value+"</b>")
				.style("left",(d3.event.pageX)+"px")
				.style("top",(d3.event.pageY)-15+"px")
			})
			.on("mouseout",function(d){
				d3.select(this).style("opacity","1");
				tooltip.style("opacity","0")
			});


			var slice = d3.selectAll("g.slice").append("path").attr("fill",function(d,i){
				return colors(i);
			}).attr("d",arc);

			var text = d3.selectAll("g.slice").append("text").text(function (d,i) {
				if(d.data.value != 0){
					return d.data.name;
				}
			}).attr("text-anchor","middle").attr("fill","white").attr("transform",function  (d) {
				d.innerRadius = 0;
				d.outerRadius = radius+100;
				return "translate("+arc.centroid(d)+")"
			});

		}

		//function to update pie chart
		function drawUpdatePie(){
			//svg parametes

			d3.select("#pie-cover #pie-chart").selectAll("svg").remove();

			drawPie();

		}


		//function to draw bar chart
		function drawBar(){

			//local variables svg parameters
			var margin = {top:50,bottom:50,right:50,left:150}
			var w = 500-margin.left-margin.right;
			var h = 500-margin.top-margin.bottom;

			var svg = d3.selectAll("#bar-cover #bar-chart").append("svg")
			.attr("width",w + margin.left + margin.right)
			.attr("height",h + margin.top + margin.bottom)
			.append("g")
			.attr("transform","translate("+margin.left+","+margin.top+")");

			//creating scales
			var yScale = d3.scale.linear()
			.domain([0,d3.max(genotypestates, function(d){ return d.value; })])
			.range([0,h]);

			//creating Axis
			var yAxisScale = d3.scale.linear()
			.domain([0,d3.max(genotypestates, function(d){ return d.value; })])
			.range([h,0]);

			var yAxis = d3.svg.axis().scale(yAxisScale).orient("left");
			var yAxisGen = d3.select("#bar-cover #bar-chart svg").append("g");
			yAxis(yAxisGen);

			yAxisGen.attr("transform","translate("+(margin.left)+","+margin.top+")");
			yAxisGen.selectAll("path").style({fill:"none",stroke:"#000"});
			yAxisGen.selectAll("line").style({stroke:"#000"});

			var xAxisScale = d3.scale.linear()
			.domain([0,genotypestates.length])
			.range([1,w]);

			var xAxis = d3.svg.axis().scale(xAxisScale).orient("bottom").ticks(3);
			var xAxisGen = d3.select("#bar-cover #bar-chart svg").append("g");
			xAxis(xAxisGen);

			xAxisGen.attr("transform","translate("+(margin.left)+","+(h+margin.top)+")");
			xAxisGen.selectAll("path").style({fill:"none",stroke:"#000"});
			xAxisGen.selectAll("text").data(dataset).text(function(d){ return d.name;})
			.attr({"text-anchor":"middle",x:50});
			xAxisGen.selectAll("line").remove();
			xAxisGen.select("g:nth-child(4)").remove();
			

			//drawing bars
			svg.selectAll("rect").data(dataset).enter().append("rect")
			.attr({
				x: function(d,i){ return i*(w/genotypestates.length)},
				y: function(d){ return h-yScale(d.value);},
				width:function(d){ return (w/(genotypestates.length))-2},
				height:function(d){return yScale(d.value);}
			}).style("fill","#4E8AD9").on("mouseover",function(d){
				console.log(d);
				d3.select(this).style("opacity",".8");
				tooltip.style("opacity","1")
				tooltip.html("<b>Name: "+d.name+" Value: "+d.value+"</b>")
				.style("left",(d3.event.pageX)+"px")
				.style("top",(d3.event.pageY)-15+"px")
			})
			.on("mouseout",function(d){
				d3.select(this).style("opacity","1");
				tooltip.style("opacity","0")
			});

		}
		//function to update bar chart
		function drawUpdateBar(){
			d3.select("#bar-cover #bar-chart").selectAll("svg").remove();
			drawBar();
		}

		
		d3.selectAll("#chart-panel").style("display","none");
		function chartPanel(){
			if(homostatus == 1 || heterostatus ==1 || delstatus ==1){
				d3.selectAll("#chart-panel").style("display","block");
			} else {
				piestatus = 0;
				barstatus = 0;
				scatterstatus = 0;
				d3.select("#pie").classed("active",false);
				d3.selectAll("#pie-cover").remove();
				d3.select("#bar").classed("active",false);
				d3.selectAll("#bar-cover").remove();
				d3.selectAll("#chart-panel").style("display","none");
				alert("Please select one of the analysis factor");
			}

		}

		//User Interaction

		
		d3.select("#hetero").on("click",function(){
			if(heterostatus == 0){
				heterostatus = 1;
				d3.select(this).classed("active",true);
				dataset[1].value = genotypestates[1].value;
				drawUpdatePie();
				drawUpdateBar();
			} else {
				heterostatus = 0;
				d3.select(this).classed("active",false);
				dataset[1].value = 0;
				drawUpdatePie();
				drawUpdateBar();
			}
			chartPanel();
		})
		d3.select("#homo").on("click",function(){
			if(homostatus == 0){
				homostatus = 1
				d3.select(this).classed("active",true);
				dataset[0].value = genotypestates[0].value;
				drawUpdatePie();
				drawUpdateBar();
			} else {
				homostatus = 0
				d3.select(this).classed("active",false);
				dataset[0].value= 0;
				drawUpdatePie();
				drawUpdateBar();		
			}
			chartPanel();
		})
		d3.select("#del").on("click",function(){
			if(delstatus == 0){
				delstatus =1
				d3.select(this).classed("active",true);
				dataset[2].value = genotypestates[2].value;
				drawUpdatePie();
				drawUpdateBar();
				
			} else {
				delstatus = 0
				d3.select(this).classed("active",false);
				dataset[2].value= 0;;
				drawUpdatePie();
				drawUpdateBar();
			}
			chartPanel();
		})
		d3.select("#pie").on("click",function(){
			if(piestatus == 0){
				d3.select(this).classed("active",true);
				drawPiePanel();
				drawPie();
				piestatus = 1;
			} else {
				d3.select(this).classed("active",false);
				d3.selectAll("#pie-cover").remove();
				piestatus = 0;
			}
		})
		d3.select("#bar").on("click",function(){
			if(barstatus == 0){
				d3.select(this).classed("active",true);
				drawBarPanel();
				drawBar();
				barstatus = 1;
			} else {
				d3.select(this).classed("active",false);
				d3.selectAll("#bar-cover").remove();
				barstatus = 0;
			}
		})
	}
});
}


return { d3: d3Draw()}
});


