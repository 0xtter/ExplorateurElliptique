
function main() {
    let graph1 = new WeierstrassGraph("calculator", 2, -6, 0, 1, 2);
    graph1.showCurve();
    // graph1.addDraggablePoint([3.1, 2], 'XY');
    // graph1.addLine(1, 1);
    //let graph1 = new WeierstrassGraph("calculator", 0, 0, 0, 1, 2);
    let graphMod = new ModCurveGraph("calculator");
    /*graph1.showCurve();
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
    };*/



    //******************************************************************************************
    //*                          COURBE MODULAIRE                                              *
    //******************************************************************************************
    let liste_points = [[3,3],[3,2],[0,4],[0,1],[1,3],[1,2]]; //à récuperer avec la fonction créée dans elliptic

    //affichage des points de la courbe
    graphMod.display_points(liste_points);



    // Find the pixel coordinates of the graphpaper origin:
    graphMod.calculator.mathToPixels({ x: 0, y: 0 });
    // Find the math coordinates of the mouse
    var calculatorRect = calculator.getBoundingClientRect();
    document.addEventListener('click', function(evt) {
        var coordonnees_souris = graphMod.calculator.pixelsToMath({
            x: evt.clientX - calculatorRect.left,
            y: evt.clientY - calculatorRect.top
        })
        var x = coordonnees_souris.x;
        var y = coordonnees_souris.y;
        var x_arrondi = Math.round(x);
        var y_arrondi = Math.round(y);
        liste_points.forEach(function(item) {
            if ((x_arrondi==item[0]) && (y_arrondi==item[1])){
                console.log("x: ",x);
                console.log(x_arrondi);
                console.log("y: ",y);
                console.log(y_arrondi);
            };
        });
        
    });
    
}