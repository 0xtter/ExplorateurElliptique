var pointColor = "#2d70b3";
var lineColor = "#000000";
var segemntColor = "#2d70b3";


/** Class representing a graphic calculator. */
class Graphic {
  /**
  * Represents a graphic calculator.
  * @constructor
  * @param {string} element - The ID of the HTML element where the calculator will be.
  */
  constructor(element) {
    try {
      this.element = document.getElementById(element);
    } catch (error) {
      throw error;
    }
    this.calculator = Desmos.GraphingCalculator(this.element);
    this.setup();

    this.pointId = 0;
    this.points = {};
    this.lineId = 0;
    this.lines = {};
    this.segmentID = 0;
    this.segments = {};
  }

  get getElement() {
    return this.element;
  }

  get getcalculator() {
    return this.calculator;
  }

  setup() {
    this.calculator.updateSettings({
      keypad: false,
      language: "fr",
      showResetButtonOnGraphpaper: true,
      //settingsMenu: false,
      border: false,
      expressionsCollapsed: true,
      autosize: true,
      //expressions: false
    });
  }

  saveGraphicState() {
    this.savedState = this.calculator.getState();
  }

  loadGraphicState() {
    this.calculator.setState(this.savedState);
  }

  getExpressionById(id) {
    return this.calculator.getExpressions().find(element => element.id == id)
  }

  /**
  * add a draggable point on the graph giving his coordinates
  * 
  * @param {array} P - The point coordinates as an array 
  * @return {number} return the id of the point created.
  */
  addDraggablePoint(P, Axis) {
    if (!Array.isArray(P)) {
      throw new Error("Wrong Inputs. 'P' must be an array");
    }
    else if (Axis != 'X' && Axis != 'Y' && Axis != 'XY' && Axis != 'NONE') {
      throw new Error("Wrong Inputs. 'Axis' must be either 'X','Y', 'XY' or 'NONE'");
    }

    try {
      this.pointId++;
      this.calculator.setExpressions([
        { id: `x_{${this.pointId}}`, latex: `x_{${this.pointId}}=${P[0]}` },
        { id: `y_{${this.pointId}}`, latex: `y_{${this.pointId}}=${P[1]}` },
        { id: `p_{${this.pointId}}`, latex: `(x_{${this.pointId}},y_{${this.pointId}})`, showLabel: true, dragMode: Axis }
      ]);
      return this.pointId;
    } catch (error) {
      throw new Error(`An error has occured creating the point : ${error}`);
    }
  }

  /**
  * add a static point (not draggable) on the graph giving his coordinates
  * 
  * @param {array} P - The point coordinates as an array 
  * @return {number} return the id of the point created.
  */
  addStaticPoint(P) {
    return this.addDraggablePoint(P, 'NONE');
  }

  /**
   * update a point position on the graph giving his id and his new coordinates
   * 
   * @param {number} id - The id of the point to update
   * @param {array} newP - The new point coordinates as an array
   */
  updatePoint(id, newP) {
    if (typeof id != "number" || !Array.isArray(newP)) {
      throw new Error("Wrong Inputs. 'id' must be a number and 'newP' must be an array");
    }

    if (id > this.pointId) {
      throw new Error(`Selected point : ${id} do not exist. Number of points : ${this.pointId}`);
    }

    try {
      this.calculator.setExpressions([
        { id: `x_{${id}}`, latex: `x_{${this.pointId}}=${newP[0]}` },
        { id: `y_{${id}}`, latex: `y_{${this.pointId}}=${newP[1]}` },
      ]); // à revoir le try (set expression ne va pas renvoyer une erreur si point existe pas)
    } catch (error) {
      throw new Error(`Point ${id} not found : ${error}`);
    }
  }

  /**
   * Change la valeur d'un paramètre par exemple : x_{i}, y_{i}, a_1, g_{i}, b_{i} etc...
   */
  setValueOfParameter(param, value) {
    this.calculator.setExpression({ id: `${param}`, latex: `${param}=${value}` })
  }

  /**
   * renvoie la valeur d'un paramètre par exemple : x_{i}, y_{i}, a_1, g_{i}, b_{i} etc...
   */
  getValueOfParameter(param) {
    return this.calculator.model.expressionAnalysis;
  //   let hE = this.calculator.HelperExpression({id:`${param}`,latex:`${param}`})
  //   let Value;

  //   hE.observe('numericValue', (function () {
  //     return JSON.stringify(hE);
  // }))
  }

  /**
   * add a straight line on the graph giving : gradient, b of the equation Y = gradient * X + b
   * 
   * @param {number} gradient - The gradiant of the equation Y = gradient * X + b 
   * @param {number} b - The b of the equation Y = gradient * X + b 
   * @return {number} return the id of the line created.
   */
  addLine(gradient, b) {
    if (typeof gradient != "number" || typeof b != "number") {
      throw new Error("'grandiant' and 'b' must be numbers");
    }

    try {
      this.lineId++;
      this.calculator.setExpressions([
        { id: `g_{${this.lineId}}`, latex: `g_{${this.lineId}}=${gradient}` },
        { id: `b_{${this.lineId}}`, latex: `b_{${this.lineId}}=${b}` },
        { id: `l_{${this.lineId}}`, latex: `y_{l${this.lineId}} = g_{${this.lineId}}*x + b_{${this.lineId}}` }
      ]);
      return this.lineId;
    } catch (error) {
      throw new Error(`An error has occured creating the line : ${error}`);
    }
  }

  /**
   * add a straight line on the graph between two points 
   * 
   * @param {number} idP - The id of the first point 
   * @param {number} idQ - The id of the second point 
   * @return {number} - return the id of the line created.
   */
  addLineBetweenTwoPoints(idP, idQ) {
    if (typeof idP != "number" || typeof idQ != "number") {
      throw new Error("'idP' and 'idQ' must be numbers");
    }

    try {
      this.lineId++;
      this.calculator.setExpressions([
        { id: `g_{${this.lineId}}`, latex: `g_{${this.lineId}}=\\frac{(y_{${idP}}-y_{${idQ}})}{(x_{${idP}}-x_{${idQ}})}` },
        { id: `b_{${this.lineId}}`, latex: `b_{${this.lineId}}=y_{${idP}}-g_{${this.lineId}}x_{${idP}}` },
        { id: `l_{${this.lineId}}`, latex: `y_{l${this.lineId}} = g_{${this.lineId}}*x + b_{${this.lineId}}`, lineOpacity: 0.3 }
      ]);
      return this.lineId;
    } catch (error) {
      throw new Error(`An error has occured creating the line : ${error}`);
    }
  }

  /**
   * update a line position on the graph giving his id and his new coordinates
   * 
   * @param {number} id - The id of the line to update
   * @param {array} newP - The new point coordinates as an array
   */
  updateLine(id, newGradient, newB) {
    if (typeof id != "number" || typeof newGradient != "number" || typeof newB != "number") {
      throw new Error("Wrong Inputs. 'id', 'newline' and 'b' must be numbers");
    }

    if (id > this.lineId) {
      throw new Error(`Selected line : ${id} do not exist. Number of lines : ${this.lineId}`);
    }

    try {
      this.calculator.setExpressions([
        { id: `g_{${id}}`, latex: `g_{${id}}=${newGradient}` },
        { id: `b_{${id}}`, latex: `b_{${id}}=${newB}` },
      ]);
    } catch (error) {
      throw new Error(`Line ${id} not found : ${error}`);
    }
  }

  /**
   * add a straight line on the graph between two points 
   * 
   * @param {array} coordinatesX - An array of the x pos to link 
   * @param {array} coordinatesY - An array of the y pos to link 
   * @return {number} - return the id of the segment created.
   */
  addSegment(coordinatesX, coordinatesY) {
    if (!Array.isArray(coordinatesX) || !Array.isArray(coordinatesY)) {
      throw new Error(`'coordinatesX' and 'coordinatesY' must be arrays. Given : ${typeof coordinatesX} and ${typeof coordinatesY}`)
    }

    this.segmentID++;
    this.calculator.setExpression({
      id: `s_{${this.segmentID}}`,
      type: 'table',
      columns: [
        {
          latex: `s_{x${this.segmentID}}`,
          values: coordinatesX
        },
        {
          latex: `s_{y${this.segmentID}}`,
          values: coordinatesY,
          color: segemntColor,
          hidden: false,
          pointStyle: "OPEN",
          lineStyle: "DASHED",
          points: false,
          lines: true
        }
      ]
    });

    return this.segmentID;
  }

  /**
   * Hide all the lines
   */
  hideLines() {
    for (let id = 1; id <= this.lineId; id++) {
      this.calculator.setExpression({ id: `l_{${id}}`, hidden: true })
    }
  }

  /**
   * Show all the lines
   */
  showLines() {
    for (let id = 1; id <= this.lineId; id++) {
      this.calculator.setExpression({ id: `l_{${id}}`, hidden: false })
    }
  }
}

/** Class representing a real elliptic curve.*/
class RealCurveGraph extends Graphic {
  /**
  * Represents a graphic calculator.
  * @constructor
  * @param {string} element - The ID of the HTML element where the calculator will be.
  */
  constructor(element) {
    super(element);
  }

  /**
   * show the curve on the graph
   */
  showCurve() {
    throw new Error('You have to implement the method showCurve for this curve!');
  }

  /**
   * add a point on the curve giving his x position on the graph
   * @param {number} xPos - The point X coordinate 
   * @return {number} return the id of the point created.
   */
  addCurvePoint(xPos) {
    throw new Error('You have to implement the method addCurvePoint for this curve!');
  }

  /**
   * create a point in the expression list giving his x position, the expression of his y value(positive and negative)
   * @param {number} xPos - The point X coordinate 
   * @param {number} yPositiveExpression - The expression of the positive solution of y in latex
   * @param {number} yNegativeExpression - The expression of the negative solution of y in latex
   */
  addCurvePointInExpressions(xPos,yPositiveExpression,yNegativeExpression,){
    this.calculator.setExpressions([
      {id: `x_{${this.pointId}}`, latex: `x_${this.pointId}=${xPos}` },
      {id: `y_{p${this.pointId}}`, latex: `y_{p${this.pointId}}=${yPositiveExpression}` },
      {id: `y_{n${this.pointId}}`, latex: `y_{n${this.pointId}}=${yNegativeExpression}` },
      {id: `y_{${this.pointId}}`, latex: `y_{${this.pointId}} = y_{p${this.pointId}}` },
      {id: `p_{${this.pointId}}`, latex: `p_{${this.pointId}}=(x_{${this.pointId}},y_{${this.pointId}})` }
    ]);
  }
}

/** Class representing a real Weierstrass elliptic curve.*/
class WeierstrassGraph extends RealCurveGraph {
  /**
   * Y^2 + a1 XY + a3 * Y = X^3 + a2 X^2 + a4 X + a6
   * 
   * @constructor
   * @param {string} element - The ID of the HTML element where the calculator will be.
   * @param {number} a1
   * @param {number} a3
   * @param {number} a2
   * @param {number} a4 
   * @param {number} a6 
   */
  constructor(element, a1, a3, a2, a4, a6) {
    if (typeof (a1) != 'number' || typeof (a3) != 'number' || typeof (a2) != 'number' ||
      typeof (a4) != 'number' || typeof (a6) != 'number') {
      throw new Error("All coefficients must be a number type.");
    }
    super(element)
    this.a1 = a1;
    this.a3 = a3;
    this.a2 = a2;
    this.a4 = a4;
    this.a6 = a6;
  }

  /**
   * show/update the Weierstrass curve on the graph
   */
  showCurve() {
    this.calculator.setExpressions(JSON.parse(weierestrassGraph));
    this.saveGraphicState();
  }

  /**
   * add a point on the curve giving his x position on the graph
   * @param {number} xPos - The point X coordinate 
   * @return {number} return the id of the point created.
   */
  addCurvePoint(xPos) {
    this.pointId++;
    this.addCurvePointInExpressions(
      xPos,
      `\\frac{1}{2}(\\sqrt{(a_{1}x_{${this.pointId}}+a_{3})^{2}+4(a_{2}x_{${this.pointId}}^{2}+a_{4}x_{${this.pointId}}+a_{6}+x_{${this.pointId}}^{3})}-a_{3}-a_{1}x_{${this.pointId}})`,
      `\\frac{1}{2}(-\\sqrt{(a_{1}x_{${this.pointId}}+a_{3})^{2}+4(a_{2}x_{${this.pointId}}^{2}+a_{4}x_{${this.pointId}}+a_{6}+x_{${this.pointId}}^{3})}-a_{3}-a_{1}x_{${this.pointId}})`
    );
    return this.pointId;
  }

  /**
   * shows the addition of two point given their id
   *
   * @param {number} idP - The id of the first point 
   * @param {number} idQ - The id of the second point  
   * @return {number} return the id of the point created
   * @return {number} return the id of line created 
   * @return {number} return the id of the segment created
   **/
  showAdditionOfPoints(idP, idQ) {
    this.pointId++;

    let idL = this.addLineBetweenTwoPoints(idP, idQ);

    this.calculator.setExpressions([
      { id: `x_{${this.pointId}}`, latex: `x_{${this.pointId}}=g_{${idL}}^{2}+a_{1}g_{${idL}}-a_{2}-x_{${idP}}-x_{${idQ}}` },
      { id: `y_{${this.pointId}}`, latex: `y_{${this.pointId}}=-a_{1}x_{${this.pointId}}-a_{3}-g_{${idL}}x_{${this.pointId}}+g_{${idL}}x_{${idP}}-y_{${idP}}` },
      { id: `y_{n${this.pointId}}`, latex: `y_{n${this.pointId}}=g_{${idL}}x_{${this.pointId}}-g_{${idL}}x_{${idP}}+y_{${idP}}` },
      { id: `p_{${this.pointId}}`, latex: `p_{${this.pointId}} = (x_{${this.pointId}},y_{${this.pointId}})`, pointStyle: "POINT", color: pointColor, pointSize: 15 },
      { id: `p_{n${this.pointId}}`, latex: `p_{${this.pointId}} = (x_{${this.pointId}},y_{n${this.pointId}})`, pointStyle: "OPEN", color: pointColor }
    ]);

    this.addSegment([`x_{${this.pointId}}`, `x_{${this.pointId}}`], [`y_{${this.pointId}}`, `y_{n${this.pointId}}`]);
    return this.pointId, this.lineId, this.segmentID;
  }

    
  /**
   * shows the tangent at the point P
   *
   * @param {number} idP - The id of the point 
   * @return {number} return the id of the line created
   **/
  addTangent(idP) {
    this.lineId++;

    this.calculator.setExpressions([
      { id: `x_{${this.pointId}}`, latex: `x_{${this.pointId}}=g_{${idL}}^{2}+a_{1}g_{${idL}}-a_{2}-x_{${idP}}-x_{${idQ}}` },
      { id: `y_{${this.pointId}}`, latex: `y_{${this.pointId}}=-a_{1}x_{${this.pointId}}-a_{3}-g_{${idL}}x_{${this.pointId}}+g_{${idL}}x_{${idP}}-y_{${idP}}` },
      { id: `y_{n${this.pointId}}`, latex: `y_{n${this.pointId}}=g_{${idL}}x_{${this.pointId}}-g_{${idL}}x_{${idP}}+y_{${idP}}` },
      { id: `p_{${this.pointId}}`, latex: `p_{${this.pointId}} = (x_{${this.pointId}},y_{${this.pointId}})`, pointStyle: "POINT", color: pointColor, pointSize: 15 },
      { id: `p_{n${this.pointId}}`, latex: `p_{${this.pointId}} = (x_{${this.pointId}},y_{n${this.pointId}})`, pointStyle: "OPEN", color: pointColor }
    ]);

    this.addSegment([`x_{${this.pointId}}`, `x_{${this.pointId}}`], [`y_{${this.pointId}}`, `y_{n${this.pointId}}`]);
    return this.pointId, this.lineId, this.segmentID;
  }

  /**
   * shows the addition of two point given their id
   *
   * @param {number} idP - The id of the first point 
   * @param {number} idQ - The id of the second point  
   * @return {number} return the id of the point created
   * @return {number} return the id of line created 
   * @return {number} return the id of the segment created
   **/
   showDoublingPoint(idP, idQ) {
    this.pointId++;

    let idL = this.addLineBetweenTwoPoints(idP, idQ);

    this.calculator.setExpressions([
      { id: `x_{${this.pointId}}`, latex: `x_{${this.pointId}}=g_{${idL}}^{2}+a_{1}g_{${idL}}-a_{2}-x_{${idP}}-x_{${idQ}}` },
      { id: `y_{${this.pointId}}`, latex: `y_{${this.pointId}}=-a_{1}x_{${this.pointId}}-a_{3}-g_{${idL}}x_{${this.pointId}}+g_{${idL}}x_{${idP}}-y_{${idP}}` },
      { id: `y_{n${this.pointId}}`, latex: `y_{n${this.pointId}}=g_{${idL}}x_{${this.pointId}}-g_{${idL}}x_{${idP}}+y_{${idP}}` },
      { id: `p_{${this.pointId}}`, latex: `p_{${this.pointId}} = (x_{${this.pointId}},y_{${this.pointId}})`, pointStyle: "POINT", color: pointColor, pointSize: 15 },
      { id: `p_{n${this.pointId}}`, latex: `p_{${this.pointId}} = (x_{${this.pointId}},y_{n${this.pointId}})`, pointStyle: "OPEN", color: pointColor }
    ]);

    this.addSegment([`x_{${this.pointId}}`, `x_{${this.pointId}}`], [`y_{${this.pointId}}`, `y_{n${this.pointId}}`]);
    return this.pointId, this.lineId, this.segmentID;
  }
}

/** Class representing a modular elliptic curve.*/
class ModCurveGraph extends Graphic {
  /**
  * Represents a graphic calculator.
  * @constructor
  * @param {string} element - The ID of the HTML element where the calculator will be.
  */
  constructor(element) {
    super(element);
  }

  displayPoints(list_points) {
    var that = this;
    list_points.forEach(function (item) {
      that.addStaticPoint(item);
    });
  }

  displayClickPoints(list_point){
    var that = this;
    // Find the pixel coordinates of the graphpaper origin:
    that.calculator.mathToPixels({ x: 0, y: 0 });
    // Find the math coordinates of the mouse
    var calculatorRect = this.element.getBoundingClientRect();
    document.addEventListener('click', function(evt) {
        var coordonnees_souris = that.calculator.pixelsToMath({
          x: evt.clientX - calculatorRect.left,
          y: evt.clientY - calculatorRect.top
        })
        var x = coordonnees_souris.x;
        var y = coordonnees_souris.y;
        var x_arrondi = Math.round(x);
        var y_arrondi = Math.round(y);
        list_point.forEach(function(item) {
            if ((x_arrondi==item[0]) && (y_arrondi==item[1])){
                console.log([x_arrondi,y_arrondi]) 
            };
        });
        
    });
  }

  stopClickPoints(){
    document.removeEventListener('click');
  }
}  
