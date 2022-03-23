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
      this.saveGraphicState();
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
        { id: `point${this.pointId}`, latex: `(x_${this.pointId},y_${this.pointId})` }
      ]);
      return this.pointId;
    }
  
  }