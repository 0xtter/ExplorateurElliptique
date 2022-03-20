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
      settingsMenu: false,
      showResetButtonOnGraphpaper: true,
      //expressions: false
    });
  }

  saveGraphicState() {
    this.savedState = this.calculator.getState();
  }

  loadGraphicState() {
    this.calculator.setState(this.savedState);
  }

  getElementById(id) {
    return this.calculator.getExpressions().find(element => element.id == id)
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
    this.pointCount = 0;
    this.lineCount = 0;
    this.dynamicLines = [];
    super.setup();
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
   * add a static point (not draggable) on the graph giving his coordinates
   * 
   * @param {array} P - The point coordinates as an array 
   * @return {number} return the id of the point created.
   */
  addStaticPoint(P) {
    return this.addDraggablePoint(P, 'NONE');
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
      this.pointCount++;
      this.calculator.setExpression({ id: `point${this.pointCount}`, latex: `(${P})`, showLabel: true, dragMode: Axis });
      return this.pointCount;
    } catch (error) {
      throw new Error(`An error has occured creating the point : ${error}`);
    }

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

    if (id > this.pointCount) {
      throw new Error(`Selected point : ${id} do not exist. Number of points : ${this.pointCount}`);
    }

    try {
      this.calculator.setExpression({ id: `point${id}`, latex: `(${newP})` }); // à revoir le try (set expression ne va pas renvoyer une erreur si point existe pas)
    } catch (error) {
      throw new Error(`Point ${id} not found : ${error}`);
    }
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
      this.lineCount++;
      this.calculator.setExpression({ id: `line${this.lineCount}`, latex: `y = ${gradient}*x + ${b}` });
      return this.lineCount;
    } catch (error) {
      throw new Error(`An error has occured creating the line : ${error}`);
    }
  }

  /**
   * update a lin position on the graph giving his id and his new coordinates
   * 
   * @param {number} id - The id of the line to update
   * @param {array} newP - The new point coordinates as an array
   */
  updateLine(id, newGradient, newB) {
    if (typeof id != "number" || typeof newGradient != "number" || typeof newB != "number") {
      throw new Error("Wrong Inputs. 'id', 'newline' and 'b' must be numbers");
    }

    if (id > this.lineCount) {
      throw new Error(`Selected line : ${id} do not exist. Number of lines : ${this.lineCount}`);
    }

    try {
      this.calculator.setExpression({ id: `line${this.lineCount}`, latex: `y = ${newGradient}*x + ${newB}` }); // à revoir le try (set expression ne va pas renvoyer une erreur si point existe pas)
    } catch (error) {
      throw new Error(`Line ${id} not found : ${error}`);
    }
  }

/**
 * add a line linked to 2 points on the curve giving the id of these points
 * @param {array} idP - The first point's id 
 * @param {array} idQ - The second point's id 
 * @return {number} return the id of the line created.
 */
  addDynamicLine(idP, idQ) { //focntion lancée dans un thread?
    var P = [this.calculator.HelperExpression({ latex: 'x_1' }), this.calculator.HelperExpression({ latex: 'y_1' })];
    var Q = [this.calculator.HelperExpression({ latex: 'x_2' }), this.calculator.HelperExpression({ latex: 'y_2' })];

    console.log(P)

    P[0].observe('numericValue', (function () {
      var x1 = P[0].numericValue;
      var y1 = P[1].numericValue;
      var x2 = Q[0].numericValue;
      var y2 = Q[1].numericValue;
      console.log(this)
    }).call(this))
    Q[0].observe('numericValue', (function () {
      var x1 = P[0].numericValue;
      var y1 = P[1].numericValue;
      var x2 = Q[0].numericValue;
      var y2 = Q[1].numericValue;
      console.log(x2, y2)
    }).call(this))
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
    this.calculator.setExpressions([
      { id: 'a_1', latex: `a_1=${this.a1}` },
      { id: 'a_2', latex: `a_2=${this.a2}` },
      { id: 'a_3', latex: `a_3=${this.a3}` },
      { id: 'a_4', latex: `a_4=${this.a4}` },
      { id: 'a_6', latex: `a_6=${this.a6}` },
      { id: 'curve', latex: 'y^2 + a_1 xy + a_3 * y = x^3 + a_2 * x^2 + a_4*x + a_6' }
    ]);
  }
  /**
   * add a point on the curve giving his x position on the graph
   * @param {number} xPos - The point X coordinate 
   * @return {number} return the id of the point created.
   */
  addCurvePoint(xPos) {
    this.pointCount++;
    this.calculator.setExpressions([
      { id: `x_${this.pointCount}`, latex: `x_${this.pointCount}=${xPos}` },
      { id: `y_${this.pointCount}`, latex: `y_{${this.pointCount}}=\\frac{1}{2}(\\sqrt{(a_{1}x_{${this.pointCount}}+a_{3})^{2}+4(a_{2}x_{${this.pointCount}}^{2}+a_{4}x_{${this.pointCount}}+a_{6}+x_{${this.pointCount}}^{3})}-a_{3}-a_{1}x_{${this.pointCount}})` },
      { id: `point${this.pointCount}`, latex: `(x_${this.pointCount},y_${this.pointCount})` }
    ]);
    return this.pointCount;
  }

}