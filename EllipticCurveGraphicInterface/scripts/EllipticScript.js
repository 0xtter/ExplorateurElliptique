
function main() {
    let graph1 = new WeierstrassGraph("calculator", 0, 0, 0, 1, 2);
    console.log(graph1)
    let graph2 = new WeierstrassGraph("calculator2", 0, 0, 0, 6, 2);
    graph1.showCurve();
    graph2.showCurve();
    console.log(graph1.addCurvePoint(1));
    console.log(graph1.addCurvePoint(2));
    console.log(graph1.addDraggablePoint([2,2],'XY'));
    
    graph1.saveGraphicState();

    p1 = new GraphPoint(0,0,3,graph1)
    console.log(p1.x)
    p1.startUpdatingPoint(graph1.calculator);   
    graph1.addDynamicLine(graph1.points["1"],graph1.points["2"]);
    console.log(graph1.getExpressionById('a_1'))
    
    
    document.getElementById('button1').onclick = function () {
        graph1.loadGraphicState();
    };
    document.getElementById('button2').onclick = function () {
        graph1.saveGraphicState();
        console.log(graph1)
        
    };
    console.log(444);
    console.log(555);
}