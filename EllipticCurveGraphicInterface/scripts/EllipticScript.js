
function main() {
    let graph1 = new WeierstrassGraph("calculator", 0, 0, 0, 1, 2);

    graph1.showCurve();
    graph1.addCurvePoint(1);
    graph1.addCurvePoint(2);
    graph1.addDraggablePoint([2,2],'XY');
    graph1.points['3'].onUpdate.push(function(that){
        console.log(that);
    });   
    graph1.addDynamicLine(graph1.points["1"],graph1.points["2"]);
    
    
    document.getElementById('button1').onclick = function () {
        graph1.loadGraphicState();
    };
    document.getElementById('button2').onclick = function () {
        graph1.saveGraphicState();
        console.log(graph1)
        
    };
}