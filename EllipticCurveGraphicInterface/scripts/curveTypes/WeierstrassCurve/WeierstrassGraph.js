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
      { id: `p_{${this.pointId}}`, latex: `p_{${this.pointId}} = (x_{${this.pointId}},y_{${this.pointId}})`, pointStyle: "POINT", color: this.pointColor, pointSize: 15 },
      { id: `p_{n${this.pointId}}`, latex: `p_{n${this.pointId}} = (x_{${this.pointId}},y_{n${this.pointId}})`, pointStyle: "OPEN", color: this.pointColor }
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
      { id: `p_{${this.pointId}}`, latex: `p_{${this.pointId}} = (x_{${this.pointId}},y_{${this.pointId}})`, pointStyle: "POINT", color: this.pointColor, pointSize: 15 },
      { id: `p_{n${this.pointId}}`, latex: `p_{n${this.pointId}} = (x_{${this.pointId}},y_{n${this.pointId}})`, pointStyle: "OPEN", color: this.pointColor }
    ]);

    this.addSegment([`x_{${this.pointId}}`, `x_{${this.pointId}}`], [`y_{${this.pointId}}`, `y_{n${this.pointId}}`]);
    return this.pointId, this.lineId, this.segmentID;
  }

  /**
   * shows the double of a point given his id
   *
   * @param {number} idP - The id of the first point 
   * @return {number} return the id of the point created
   * @return {number} return the id of line created 
   * @return {number} return the id of the segment created
   **/
  showDoublingPoint(idP) {
    this.pointId++;

    let idL = this.addTangent(idP);

    this.calculator.setExpressions([
      { id: `x_{${this.pointId}}`, latex: `x_{${this.pointId}}=g_{${idL}}^{2}+g_{${idL}}a_{1}-a_{2}-2x_{${idP}}` },
      { id: `y_{${this.pointId}}`, latex: `y_{${this.pointId}}=-a_{1}x_{${this.pointId}}-a_{3}-g_{${idL}}x_{${this.pointId}}+g_{${idL}}x_{${idP}}-y_{${idP}}` },
      { id: `y_{n${this.pointId}}`, latex: `y_{n${this.pointId}}=g_{${idL}}x_{${this.pointId}}-g_{${idL}}x_{${idP}}+y_{${idP}}` },
      { id: `p_{${this.pointId}}`, latex: `p_{${this.pointId}} = (x_{${this.pointId}},y_{${this.pointId}})`, pointStyle: "POINT", color: this.pointColor, pointSize: 15 },
      { id: `p_{n${this.pointId}}`, latex: `p_{n${this.pointId}} = (x_{${this.pointId}},y_{n${this.pointId}})`, pointStyle: "OPEN", color: this.pointColor }
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
    if (typeof idP != "number") {
      throw new Error("'idP' must be a number");
    }

    try {
      this.lineId++;
      this.calculator.setExpressions([
        { id: `g_{${this.lineId}}`, latex: `g_{${this.lineId}}=\\frac{3x_{${idP}}^{2}+2a_{2}x_{${idP}}-a_{1}y_{${idP}}+a_{4}}{2y_{${idP}}+a_{1}x_{${idP}}+a_{3}}` },
        { id: `b_{${this.lineId}}`, latex: `b_{${this.lineId}}=y_{${idP}}-g_{${this.lineId}}x_{${idP}}` },
        { id: `l_{${this.lineId}}`, latex: `y_{l${this.lineId}} = g_{${this.lineId}}*x + b_{${this.lineId}}`, lineOpacity: 1 }
      ]);
      return this.lineId;
    } catch (error) {
      throw new Error(`An error has occured creating the line : ${error}`);
    }
  }
}