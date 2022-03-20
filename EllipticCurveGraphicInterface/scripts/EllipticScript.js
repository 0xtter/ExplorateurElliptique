function main() {
    let graph1 = new WeierstrassGraph("calculator", -2, 2, 3, 1, 2);
    graph1.showCurve();
    // console.log(graph1.addDraggablePoint([2,1], 'X'));
    // console.log(graph1.addLine(2, 2))
    i = 0

    graph1.calculator.setExpression({
        id: 'x_1',
        latex: 'x_1=1'
    });

    graph1.calculator.setExpression({
        id: 'y_1',
        latex: 'y_{1}=\\frac{1}{2}(\\sqrt{(a_{1}x_{1}+a_{3})^{2}+4(a_{2}x_{1}^{2}+a_{4}x_{1}+a_{6}+x_{1}^{3})}-a_{3}-a_{1}x_{1})'
    });

    graph1.calculator.setExpression({
        id: 'y_1n',
        latex: 'y_{1n}=\\frac{1}{2}(-\\sqrt{(a_{1}x_{1}+a_{3})^{2}+4(a_{2}x_{1}^{2}+a_{4}x_{1}+a_{6}+x_{1}^{3})}-a_{3}-a_{1}x_{1})'
    });

    graph1.calculator.setExpression({
        id: 'x_2',
        latex: 'x_2=2'
    });

    graph1.calculator.setExpression({
        id: 'y_2',
        latex: 'y_{2}=\\frac{1}{2}(\\sqrt{(a_{1}x_{2}+a_{3})^{2}+4(a_{2}x_{2}^{2}+a_{4}x_{2}+a_{6}+x_{2}^{3})}-a_{3}-a_{1}x_{2})'
    });

    graph1.calculator.setExpression({
        id: 'customPoint1',
        latex: '(x_2,y_2)'
    });

    graph1.calculator.setExpression({
        id: 'customPoint2',
        latex: '(x_1,y_1)'
    });

    var a = graph1.calculator.HelperExpression({ latex: 'x_1' });
    console.log(a)

    a.observe('numericValue', function (evt) {
        var calculatorRect = graph1.element.getBoundingClientRect();
        graph1.element.addEventListener('mousemove', function (evt) {
            console.log(
                graph1.calculator.pixelsToMath({
                    x: evt.clientX - calculatorRect.left,
                    y: evt.clientY - calculatorRect.top
                })
            );
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