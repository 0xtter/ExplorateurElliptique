function main(){
    let graph1 = new WeierstrassGraph("calculator",6,2,3,1,2);
    graph1.showCurve();
    console.log(graph1.addDraggablePoint([2,1]));
    console.log(graph1.addLine(2,2))
    i=0
    console.log(graph1.calculator.getExpressions());
    console.log(graph1.calculator);
    window.setInterval(function () {
        graph1.updatePoint(1,[Math.cos(i/100),Math.sin(i/100)])
        graph1.updateLine(1,Math.cos(i/100),Math.sin(i/100))
        i = (i+1)%(Math.PI*200)
        //console.log(graph1.calculator.getExpressions())
    },15);

}