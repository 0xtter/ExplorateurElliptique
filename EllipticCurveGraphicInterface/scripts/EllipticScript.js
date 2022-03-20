function main() {
    let graph1 = new WeierstrassGraph("calculator", 0, 0, 0, 1, 2);
    graph1.showCurve();
    console.log(graph1.addCurvePoint(1));
    console.log(graph1.addCurvePoint(2));
    // console.log(graph1.getElementById('y_1'));
    // console.log(graph1.calculator.HelperExpression({latex: 'x_1'}).getProperty());
    
    graph1.addLine(2,1);
    
    graph1.updateLine(1,1,1);
    graph1.addDynamicLine(2,1)  
    i = 0

    var a = graph1.calculator.HelperExpression({ latex: 'x_1' });
    console.log(a)

    a.observe('numericValue', function (evt) {
        var calculatorRect = graph1.element.getBoundingClientRect();
        graph1.element.addEventListener('mousemove', function (evt) {
            pos=graph1.calculator.pixelsToMath({
                    x: evt.clientX - calculatorRect.left,
                    y: evt.clientY - calculatorRect.top
                });
                graph1.updateLine(1,1,1);
        },{ once: true });
    });
    // window.setInterval(function () {
    //     graph1.updatePoint(1,[Math.cos(i/100),Math.sin(i/100)])
    //     graph1.updateLine(1,Math.cos(i/100),Math.sin(i/100))
    //     i = (i+1)%(Math.PI*200)
    //     //console.log(graph1.calculator.getExpressions())
    // },15);
    document.getElementById('button1').onclick = function () {
        graph1.loadGraphicState();
    };
    document.getElementById('button2').onclick = function () {
        graph1.saveGraphicState();
        console.log(graph1.calculator.getExpressions())
        
    };
}