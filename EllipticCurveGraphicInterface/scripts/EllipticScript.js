
function main() {
    let graph1 = new WeierstrassGraph("test", 0, 0, 0, 1, 2);
    graph1.showCurve();
    graph1.addCurvePoint(0);
    graph1.addCurvePoint(2);
    graph1.addDraggablePoint([3.1, 2], 'XY');
    graph1.showAdditionOfPoints(1,2)

    document.getElementById('button1').onclick = function () {
        graph1.loadGraphicState();
    };
    document.getElementById('button2').onclick = function () {
        graph1.saveGraphicState();
        // console.log(JSON.stringify(graph1.calculator.getExpressions()))
    };


    
}