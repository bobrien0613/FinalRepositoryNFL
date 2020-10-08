var drawtoBars = function(toData,target,graphDim,xScale,yScale2)
{
console.log(graphDim)
        target.selectAll("rect")
        .data(toData)
        .enter()
        .append("rect")
        .attr("x",function(toData)
            {console.log("test4",toData)
                return xScale(toData.Team);
            })
        .attr("id",function(toData)
            { return ("ID"+"drawtoBars");
            })
        .attr("y",function(toData)
            {
                console.log("test",toData.TurnOvers)
        
                console.log("test1",toData)
        
                return yScale2(toData.TurnOvers)
            })
        .attr("width",xScale.bandwidth)
        .attr("height",function(toData)
            {
//    console.log((graphDim.height))
                return graphDim.height-yScale2(toData.TurnOvers)
            })
console.log(graphDim)
        target.selectAll("rect")
        .data(toData)
        .enter()
        .append("rect")
        .attr("id",function(toData)
            { return ("ID"+"drawtoBars2");
            })
        .attr("x",function(toData)
            {console.log("test4",toData)
                return xScale(toData.Team);
            })
        .attr("y",function(toData)
            {
                console.log("test",toData.Wins)
        
                console.log("test1",toData)
        
                return yScale(toData.Wins)
            })
        .attr("width",xScale.bandwidth)
        .attr("height",function(toData)
            {
    console.log((graphDim.height))
                return graphDim.height-yScale(toData.Wins)
            })

    
}


var drawtoBars2= function(toData,target,graphDim,xScale,yScale)
{
console.log(graphDim)
        target.selectAll("rect")
        .data(toData)
        .enter()
        .append("rect")
        .attr("id",function(toData)
            { return ("ID"+"drawtoBars2");
            })
        .attr("x",function(toData)
            {console.log("test4",toData)
                return xScale(toData.Team);
            })
        .attr("y",function(toData)
            {
                console.log("test",toData.Wins)
        
                console.log("test1",toData)
        
                return yScale(toData.Wins)
            })
        .attr("width",xScale.bandwidth)
        .attr("height",function(toData)
            {
    console.log((graphDim.height))
                return graphDim.height-yScale(toData.Wins)
            })



}
var initGraph = function(toData)
{
    console.log(toData)
    var screen = {width:2000,height:800}
    var margins={left:70,right:70,top:75,bottom:25}
    var graph={
        width:screen.width-margins.left-margins.right,
        height:screen.height-margins.top-margins.bottom
    }
    
    d3.select("#toGraph")
        .attr("width",screen.width)
        .attr("height",screen.height)
    
    var xScale = d3.scaleBand()
     .domain(["Kansas City","San Francisco","Baltimore","Green Bay","New Orleans","New England","Seattle","Tennessee","Minnesota","Houston","Buffalo","LA Rams","Philadelphia","Dallas","Pittsburgh","Chicago","Tampa Bay","Atlanta","Indianapolis","Las Vegas","Denver","NY Jets","Cleveland","Jacksonville","Arizona"
,"Carolina","LA Chargers","Miami","NY Giants","Detroit","Washington","Cincinnati"])
//    .domain([0,100])
    .range([graph.width,0])
    .paddingInner(.5)
    
    var yScale = d3.scaleLinear()
        .domain([0,15])
        .range([graph.height,0])
    
    var yScale2 = d3.scaleLinear()
        .domain([0,4])
        .range([graph.height,0])
     var target = d3.select("#toGraph")
    .append("g")
    .attr("id","#graph")
    .attr("transform",
          "translate("+(margins.left)+","+
                        margins.top+")");
    
   console.log(toData)
console.log(graph)
    g0=target.append("g")
    .attr("transform","translate(35,0)")
      drawtoBars2(toData,target,graph,xScale,yScale);
    
   console.log("here")
    drawtoBars(toData,g0,graph,xScale,yScale2);

    drawtoAxis(graph,margins,xScale,yScale,yScale2);
    drawLabels(graph,margins)
    
}


var drawtoAxis=function(graphDim,margins,xScale,yScale,yScale2){

    var xAxis = d3.axisBottom(xScale);
    

    var axes = d3.select("#toGraph")
.append("g")
   axes.append("g")
//    axes.attr("class","axis")
    .attr("transform","translate("+margins.left+"," + (margins.top+graphDim.height) +")")
    .call(xAxis);

    var yAxis = d3.axisLeft(yScale);
       var yAxis1 = d3.axisRight(yScale2);
    
    
    var axes = d3.select("#toGraph")
    .append("g")
    
   d3.selectAll("#toGraph")
    .append("g")
    .attr("class","axis1")
    .attr("transform","translate(" +margins.left+"," +((margins.bottom)+50)+")")
    .call(yAxis)
    
 
    d3.selectAll("#toGraph")
    .append("g")
    .attr("class","axis2")
    .attr("transform","translate(" +(graphDim.width+106)+"," +((margins.bottom)+50)+")")
    .call(yAxis1)}

var drawLabels = function(graphDim,margins)
{
    var labels = d3.select("#toGraph")
    .append("g")
    .classed("labels",true)
    
    labels.append("text")
        .text("Turnovers vs. Games Won")
        .classed("title",true)
        .attr("text-anchor","middle")
        .attr("x",margins.left+(graphDim.width/2))
        .attr("y",margins.top)
    
    
    labels.append("g")
        .attr("transform","translate(20,"+(margins.top+(graphDim.height/2))+")")
        .append("text")
        .text("Wins in 2019")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("transform","rotate(270)")
    
    labels.append("g")
        .attr("transform","translate(2000,"+(margins.top+(graphDim.height/2))+")")
        .append("text")
        .text("Turnovers per Game")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("transform","rotate(90)")
}

var drawLegend4 = function(graphDim,margins)
{
    
}

var toPromise = d3.csv("toGraph2.csv")
var getTeam=function(Team){
    return Team.Team
}
var successFCN = function(toData)
{
    console.log("final",toData);
    console.log(toData.Team);
    initGraph(toData);
    
    var name = new Array();
    toData.forEach(function (item,index) {
        name.push(item.Team)
    });
    
    
    console.log(name);
    
}

var failFCN = function(error)
{
    console.log("error",error);
}


toPromise.then(successFCN,failFCN)