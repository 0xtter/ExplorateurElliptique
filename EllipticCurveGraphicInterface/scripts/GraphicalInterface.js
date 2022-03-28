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
      settingsMenu: false,
      border: false,
      expressionsCollapsed: true,
      // autoResize:true,
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
        { id: `x_${this.pointId}`, latex: `x_${this.pointId}=${P[0]}` },
        { id: `y_${this.pointId}`, latex: `y_${this.pointId}=${P[1]}` },
        { id: `point${this.pointId}`, latex: `(x_${this.pointId},y_${this.pointId})`, showLabel: true, dragMode: Axis }
      ]);
      let point = new GraphPoint(P[0], P[1], this.pointId, this);
      point.startUpdatingPoint();
      this.points[this.pointId] = point;
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
      this.lineId++;
      this.calculator.setExpressions([
        { id: `grad_${this.lineId}`, latex: `g_${this.lineId}=${gradient}` },
        { id: `b_${this.lineId}`, latex: `b_${this.lineId}=${b}` },
        { id: `line${this.lineId}`, latex: `y = g_${this.lineId}*x + b_${this.lineId}`, showLabel: true }
      ]);
      let line = new GraphLine(gradient, b, this.lineId, this);
      line.startUpdatingLine()
      this.lines[this.lineId] = line;
      return this.lineId;
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

    if (id > this.lineId) {
      throw new Error(`Selected line : ${id} do not exist. Number of lines : ${this.lineId}`);
    }

    try {
      this.calculator.setExpression({ id: `line${this.lineId}`, latex: `y = ${newGradient}*x + ${newB}` }); // à revoir le try (set expression ne va pas renvoyer une erreur si point existe pas)
    } catch (error) {
      throw new Error(`Line ${id} not found : ${error}`);
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
    // this.saveGraphicState();
  }
  /**
   * add a point on the curve giving his x position on the graph
   * @param {number} xPos - The point X coordinate 
   * @return {number} return the id of the point created.
   */
  addCurvePoint(xPos) {
    this.pointId++;
    this.calculator.setExpressions([
      { id: `x_${this.pointId}`, latex: `x_${this.pointId}=${xPos}` },
      { id: `y_${this.pointId}`, latex: `y_{${this.pointId}}=\\frac{1}{2}(\\sqrt{(a_{1}x_{${this.pointId}}+a_{3})^{2}+4(a_{2}x_{${this.pointId}}^{2}+a_{4}x_{${this.pointId}}+a_{6}+x_{${this.pointId}}^{3})}-a_{3}-a_{1}x_{${this.pointId}})` },
      { id: `y_{n${this.pointId}}`, latex: `y_{n${this.pointId}}=\\frac{1}{2}(-\\sqrt{(a_{1}x_{${this.pointId}}+a_{3})^{2}+4(a_{2}x_{${this.pointId}}^{2}+a_{4}x_{${this.pointId}}+a_{6}+x_{${this.pointId}}^{3})}-a_{3}-a_{1}x_{${this.pointId}})` },
      { id: `point${this.pointId}`, latex: `(x_${this.pointId},y_${this.pointId})` }
    ]);
    let point = new GraphPoint(xPos, 0, this.pointId, this);
    point.startUpdatingPoint()
    this.points[this.pointId] = point;
    return this.pointId;
  }
}
