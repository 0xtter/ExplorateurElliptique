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
      //expressions: false
    });
  }

  saveGraphicState(){
    this.savedState = this.calculator.getState();
  }

  loadGraphicState(){
    this.calculator.setState(this.savedState);
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
    super.setup();
  }

  /**
   * show the curve on the graph
   */
  showCurve() {
    throw new Error('You have to implement the method showCurve!');
  }

  /**
   * add a static point (not draggable) on the graph giving his coordinates
   * 
   * @param {array} P - The point coordinates as an array 
   * @return {number} return the id of the point created.
   */
  addStaticPoint(P) {
    if (!Array.isArray(P)) {
      throw new Error("Wrong Inputs. 'P' must be an array");
    }

    try {
      this.pointCount++;
      this.calculator.setExpression({ id: `point${this.pointCount}`, latex: `(${P})`, showLabel: true });
      return this.pointCount;
    } catch (error) {
      throw new Error(`An error has occured creating the point : ${error}`);
    }

  }

  /**
   * add a draggable point on the graph giving his coordinates
   * 
   * @param {array} P - The point coordinates as an array 
   * @return {number} return the id of the point created.
   */
  addDraggablePoint(P,Axis = 'XY') {
    if (!Array.isArray(P)) {
      throw new Error("Wrong Inputs. 'P' must be an array");
    }

    try {
      this.pointCount++;
      this.calculator.setExpression({ id: `point${this.pointCount}`, latex: `(${P})`, showLabel: true, dragMode: Desmos.DragModes.XY });
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
   * show the Weierstrass curve on the graph
   */
  showCurve() {
    this.calculator.setExpression({ id: `curve`, latex: `y^2 + ${this.a1} xy + ${this.a3} * y = x^3 + ${this.a2} * x^2 + ${this.a4}*x + ${this.a6}` });
    this.saveGraphicState();
  }
}