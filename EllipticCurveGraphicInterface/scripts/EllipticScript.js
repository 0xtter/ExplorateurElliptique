
function main() {
    let graph1 = new WeierstrassGraph("calculator", 0, 0, 0, 1, 2);
    graph1.showCurve();
    graph1.addCurvePoint(1);
    graph1.addCurvePoint(2);
    graph1.addDraggablePoint([3,2],'XY');
    graph1.addLine(1,1);
    graph1.lines['1'].linkLineToPoints(graph1.points['1'],graph1.points['2']);
    
    document.getElementById('button1').onclick = function () {
        graph1.loadGraphicState();
    };
    document.getElementById('button2').onclick = function () {
        graph1.saveGraphicState();
        console.log(graph1)
    };
}