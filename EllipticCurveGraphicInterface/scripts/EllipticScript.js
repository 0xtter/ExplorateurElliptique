
function main() {
    let graph1 = new WeierstrassGraph("test", 0, 0, 0, 1, 2);
    graph1.showCurve();

    // let i =0
    // this.setInterval(() => {
    //     graph1.setValueOfParameter("a_1",3)
    //     i++;
    // }, 10);

    document.getElementById('button1').onclick = function () {
        graph1.loadGraphicState();
    };
    
    document.getElementById('button2').onclick = function () {
        // graph1.saveGraphicState();
        console.log(graph1.getValueOfParameter('x_{1}'));
    };    
    
    document.getElementById('button5').onclick = function () {
        console.log(JSON.stringify(graph1.calculator.getExpressions()))
    };
    
    let areLinesVisible = true;

    document.getElementById('button6').onclick = function () {
        areLinesVisible ? graph1.hideLines():graph1.showLines();
        areLinesVisible = !areLinesVisible;
    };

    
    document.getElementById('button7').onclick = function () {
        graph1.addCurvePoint(0);
        graph1.addCurvePoint(2);
        graph1.showAdditionOfPoints(1,2);
        for(let i=3;i<13;i++){
            graph1.showAdditionOfPoints(1,i);
        }
    };

    let isP1Positive = true;
    let isP2Positive = true;
    
    document.getElementById('button3').onclick = function () {
        isP1Positive ? graph1.setValueOfParameter("y_{1}","y_{n1}"):graph1.setValueOfParameter("y_{1}","y_{p1}");
        isP1Positive = !isP1Positive;
    };

    document.getElementById('button4').onclick = function () {
        isP2Positive ? graph1.setValueOfParameter("y_{2}","y_{n2}"):graph1.setValueOfParameter("y_{2}","y_{p2}");
        isP2Positive = !isP2Positive;
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////


    
    let graph2 = new MontgomeryGraph("calculator2",6,2);
    graph2.showCurve();

    // let i =0
    // this.setInterval(() => {
    //     graph2.setValueOfParameter("_1",5*Math.cos(i/100))
    //     i++;
    // }, 10);

    document.getElementById('button9').onclick = function () {
        graph2.loadGraphicState();
    };
    
    document.getElementById('button10').onclick = function () {
        graph2.saveGraphicState();
    };    
    
    document.getElementById('button8').onclick = function () {
        console.log(JSON.stringify(graph2.calculator.getExpressions()))
    };
    
    let areLinesVisible2 = true;

    document.getElementById('button13').onclick = function () {
        areLinesVisible2 ? graph2.hideLines():graph2.showLines();
        areLinesVisible2 = !areLinesVisible2;
    };

    
    document.getElementById('button14').onclick = function () {
        graph2.addCurvePoint(-2);
        graph2.addCurvePoint(2);
        graph2.showAdditionOfPoints(1,2);
        for(let i=3;i<13;i++){
            graph2.showAdditionOfPoints(1,i);
        }
    };

    let isP1Positive2 = true;
    let isP2Positive2 = true;
    
    document.getElementById('button11').onclick = function () {
        isP1Positive2 ? graph2.setValueOfParameter("y_{1}","y_{n1}"):graph2.setValueOfParameter("y_{1}","y_{p1}");
        isP1Positive2 = !isP1Positive2;
    };

    document.getElementById('button12').onclick = function () {
        isP2Positive2 ? graph2.setValueOfParameter("y_{2}","y_{n2}"):graph2.setValueOfParameter("y_{2}","y_{p2}");
        isP2Positive2 = !isP2Positive2;
    };
}