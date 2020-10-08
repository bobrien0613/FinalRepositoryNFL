
var drawPlot = function(penaltyData,target,xScale,yScale1,yScale2)
{

        target.selectAll("circle")
        .data(penaltyData)
        .enter()
        .append("circle")
        .attr("cx",function(penaltyData)
            {console.log("test4",penaltyData.NumTeam)
                return penaltyData.NumTeam * 10;
            })
        .attr("cy",function(penaltyData)
            {
                console.log("test",penaltyData.PenaltyYardsperGame)
        
                console.log("test1",penaltyData)
        
                return penaltyData.PenaltyYardsperGame *10
            })
        .attr("r",2.5)
    
}


var drawPlot2= function(penaltyData,target,xScale,yScale1,yScale2)
{

        target.selectAll("circle")
        .data(penaltyData)
        .enter()
        .append("circle")
        .attr("cx",function(penaltyData)
            {console.log('test4',penaltyData.NumTeam)
                return penaltyData.NumTeam * 10;
            })
        .attr("cy",function(penaltyData)
            {
                console.log("test",penaltyData.PenaltiesperGame)
        
                console.log("test1",penaltyData)
        
                return penaltyData.PenaltiesperGame *10
            })
        .attr("r",2.5)
    
}



var initGraph = function(penaltyData)
{
    console.log(penaltyData)
    var screen = {width:900,height:800}
    var margins={left:60,right:40,top:75,bottom:25}
    var graph={
        width:screen.width-margins.left-margins.right,
        height:screen.height-margins.top-margins.bottom
    }
    
    d3.select("#pGraph")
        .attr("width",screen.width)
        .attr("height",screen.height)
    
    var xScale = d3.scaleBand()
     .domain([function(penaltyData){
      return  penaltyData.Team}])
//    .domain([0,100])
    .range([screen.width,0])
    
    var yScale1 = d3.scaleLinear()
        .domain([0,80])
        .range([screen.height,0])
    
    var yScale2 = d3.scaleLinear()
        .domain([0,15])
        .range([screen.height,0])
     var target = d3.select("#pGraph")
    .append("g")
    .attr("id","#graph")
    .attr("transform",
          "translate("+(margins.left)+","+
                        margins.top+")");
    
   console.log(penaltyData)

//    drawPlot(penaltyData,target,xScale,yScale1,yScale2);
    drawPlot2(penaltyData,target,xScale,yScale1,yScale2);
    drawAxis(graph,margins,xScale,yScale1,yScale2)
    
}


var drawAxis=function(graphDim,margins,xScale,yScale1,yScale2){

    var xAxis = d3.axisBottom(xScale)
d3.selectAll("svg")
.append("g")
    .attr("class","axis")
    .attr("transform","translate(0," + (margins.top+graphDim.height) + ")")
    .call(xAxis);

    var yAxis = d3.axisLeft(yScale1)
    d3.selectAll("svg")
    .append("g")
    .attr("class","axis1")
    .attr("transform","translate(" +margins.left+"," +(margins.top)+")")
    .call(yAxis)
    
    var yAxis1 = d3.axisRight(yScale2)
    d3.selectAll("svg")
    .append("g")
    .attr("class","axis2")
    .attr("transform","translate(" +graphDim.width+"," +(margins.bottom)+")")
    .call(yAxis1)
                       }

var penaltyGraphPromise = d3.csv("penaltyGraph.csv")

var successFCN = function(penaltyData)
{
    console.log("final",penaltyData);
    console.log(penaltyData.Wins);
    initGraph(penaltyData);
    
}

var failFCN = function(error)
{
    console.log("error",error);
}


penaltyGraphPromise.then(successFCN,failFCN)