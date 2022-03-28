
function main() {
    let graph1 = new WeierstrassGraph("calculator", 2, -6, 0, 1, 2);
    graph1.showCurve();
    // graph1.addDraggablePoint([3.1, 2], 'XY');
    // graph1.addLine(1, 1);
    graph1.addCurvePoint(1);
    // graph1.lines['1'].linkLineToPoints(graph1.points['1'], graph1.points['2']);
    // graph1.addCurvePoint(2);


    for (let i=1; i< 5; i++){
        graph1.addCurvePoint(i+1);
        graph1.addLine(1, 1);
        graph1.lines[`${i}`].linkLineToPoints(graph1.points['1'], graph1.points[`${i+1}`]);
    }

    graph1.points['3'].setPointAsSum(graph1.points['1'],graph1.points['2'])

    // graph1.addCurvePoint(4);
    // graph1.addLine(2,1);
    // graph1.lines['2'].linkLineToPoints(graph1.points['1'],graph1.points['3']);
    // graph1.addLine(2,1);
    // graph1.lines['3'].linkLineToPoints(graph1.points['1'],graph1.points['4']);
    // graph1.addLine(2,1);
    // graph1.lines['4'].linkLineToPoints(graph1.points['1'],graph1.points['5']);

    document.getElementById('button1').onclick = function () {
        graph1.loadGraphicState();
    };
    document.getElementById('button2').onclick = function () {
        graph1.saveGraphicState();
        console.log(graph1)
    };
}