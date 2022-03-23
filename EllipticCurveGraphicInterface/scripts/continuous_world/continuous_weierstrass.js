/** Operation on Points on a Weierstrass Elliptic Curve which equation is :
 * Y^2 + a1 XY + a3 * Y = X^3 + a2 X^2 + a4 X + a6
 * 
 * For more explanations, please see : 
 * https://crypto.stanford.edu/pbc/notes/elliptic/explicit.html
*/


/**
 * Represent a general weierstrass elliptic curve which equation is:
 * 
 * Y^2 + a1 XY + a3 * Y = X^3 + a2 X^2 + a4 X + a6
 */
class Weierstrass {
    /**
     * Y^2 + a1 XY + a3 * Y = X^3 + a2 X^2 + a4 X + a6
     * 
     * @param {number} a1
     * @param {number} a3
     * @param {number} a2
     * @param {number} a4 
     * @param {number} a6
     * @throw All coefficients must be number type or non null.
     */
    constructor(a1, a3, a2, a4, a6) {
        // prevent from null value or non number value
        if (typeof(a1) != 'number' || typeof(a3) != 'number' || typeof(a2) != 'number' ||
            typeof(a4) != 'number' || typeof(a6) != 'number') {
                throw "All coefficients must be number type or non null.";
            }
        this.a1 = a1;
        this.a3 = a3;
        this.a2 = a2;
        this.a4 = a4;
        this.a6 = a6;
    }

    get getA1() {
        return this.a1;
    }

    get getA2() {
        return this.a2;
    }

    get getA3() {
        return this.a3;
    }

    get getA4() {
        return this.a4;
    }

    get getA6() {
        return this.a6;
    }

    toString() {
        return `Y^2 + ${this.a1} XY + ${this.a3} * Y = X^3 + ${this.a2} X^2 + ${this.a4} X + ${this.a6}`
    }

    /**
     * Check wether point is on the curve or not.
     * @param {Point} P - Point to check
     * @returns True if the point is ont Weierstrass curve. False otherwise.
     */
    isPointOnCurve(P) {
        let x = P.getX;
        let y = P.getY;
        let a1 = this.a1;
        let a3 = this.a3;
        let a2 = this.a2;
        let a4 = this.a4;
        let a6 = this.a6;
        let round2twodigits = (num) => {
            return Math.round( ( num + Number.EPSILON ) * 100 ) / 100;
        }
        return round2twodigits(y*y + a1*x*y + a3*y) == round2twodigits(x*x*x + a2*x*x + a4*x + a6);
    }

    /**
     * 
     * @param {number} x abscissa you want to get the ordinates on the curves
     * @returns {array} the two ordinates of x on the curve
     * @throws {string} if x is not a number or is null
     * @throws {string} if x has no image of the curve
     */
    getYfromX(x) {
        if (isNaN(x) || x == null) {
            throw `${x} is not a number.`;
        }
        let a1 = this.a1;
        let a3 = this.a3;
        let a2 = this.a2;
        let a4 = this.a4;
        let a6 = this.a6;

        let y1 = 0.5 * ( - Math.sqrt((a1*x + a3)**2 -4*(-a2*x**2 - a4*x - a6 -x**3)) + a1*(-x) );
        let y2 = 0.5 * ( Math.sqrt((a1*x + a3)**2 -4*(-a2*x**2 - a4*x - a6 -x**3)) + a1*(-x) );

        // check if x has an image on the curve
        if (isNaN(y1) || isNaN(y2)) {
            throw `${x} is not defined on the curve.`;
        }
        else {
            return [y1, y2];
        }
    }
}


class Point {
    /**
     * 
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        if (typeof(x) != "number" || typeof(y) != "number") {
            throw "Coordinates must by numbers.";
        }
        this.x = x;
        this.y = y;
    }

    /**
     * Get the abs of point
     * @return {number} x
     */
    get getX() {
        return this.x;
    }

    /**
     * Set the abs to a new value
     * @param {number} new_x
     * @throw InvalidArgument
     */
    set setX(new_x) {
        if (isNaN(new_x)) {
            throw `InvalidArgument: ${new_x} is not a number`;
        }
        this.x = new_x; 
    }

    /**
     * Get the ordinate of point
     * @return {number} y
     */
    get getY() {
        return this.y;
    }

    /**
     * Set the ord to a new value
     * @param {number} new_y
     * @throw InvalidArgument
     */
    set setY(new_y) {
        if (isNaN(new_y)) {
            throw `InvalidArgument: ${new_y} is not a number`;
        }
        this.y = new_y;
    }

    /**
     * @return {array} [x, y]
     */
    get getCoord() {
        return [this.x, this.y]
    }

    /**
     * @returns {string} String of the coordinates of the point.
     */
    toString() {
        return this.getCoord.toString();
    }

    /**
     * Get the gradient of the line determined by this point and another point Q
     * 
     * @param {Point} Q Point
     * @return {number} gradient
     * @throw DivisionByZero: points are on the same abscissa
     */
    gradientWithPoint(Q) {
        let x1 = this.x;
        let y1 = this.y;
        let x2 = Q.getX;
        let y2 = Q.getY
        
        if (x2 - x1 == 0) {
            throw new Error(`DivisionByZero: points are on the same abscissa.`);
        }
        return (y2 - y1) / (x2 - x1);
    }

    /**
     * Calculate the two coefficients of the line determined with another point Q
     * 
     * @param {Point} Q
     * @return {array} the array [gradient, b] of the equation Y = gradient * X + b
     * @throw DivisionByZero: points are on the same abscissa
     * @see gradientWithPoint
     */
    lineEqCoeffWithPoint(Q) {
        let x1 = this.x;
        let y1 = this.y;
        let gradient = null;
        gradient = this.gradientWithPoint(Q);
        let b = - gradient * x1 + y1;
        return [gradient, b];
    }
}


/**
 * A point on a weierstrass curve
 */
class WeierstrassPoint extends Point {
    /**
     * 
     * @param {Weierstrass} curve 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(curve, x, y) {
        if (curve.constructor.name != "Weierstrass") {
            throw "The curve must be a Weierstrass curve object";
        }
        super(x, y);
        this.curve = curve;
        let isOnCurve = curve.isPointOnCurve(this)
        if (!isOnCurve) {
            throw "Point is not on the curve.";
        }
        this.isOnCurve = isOnCurve;
    }


    /**
     * @return {Weierstrass} the short weierstrqss curve associqted with the point
     */
    get getCurve() {
        return this.curve;
    }


    /**
     * 
     * @param {WeierstrassPoint} Q Point to compare to.
     * @returns {boolean} true if equals. false otherwise.
     */
    equals(Q) {
        if (curve.constructor.name != "Weierstrass") {
            return false;
        }
        return this.x == Q.getX && this.y == GainNode.getY && this.curve == Q.getCurve;
    }


    /**
     *  Calculate the two coefficients of the tangent at the point
     * 
     * @return {array} the array [gradient, b] of the tangent equation Y = gradient * X + b
     * @throw DivisionByZero
     */
     tanEqCoeff() {
        let x = this.x;
        let y = this.y;
        let a1 = this.curve.getA1;
        let a3 = this.curve.getA3;
        let a2 = this.curve.getA2;
        let a4 = this.curve.getA4;
        // calculate gradient of the tangent at the point
        let den = 2*y + a1*x + a3;
        if (den == 0) {
            throw "DivisionByZero";
        }
        let gradient = (3*x**2 + 2*a2*x - a1*y + a4) / den;
        let b = - gradient * x + y;
        return [gradient, b];
    }


    /**
     * 
     * @param {WeierstrassPoint} Q Point to add this object
     * @return {WeierstrassPoint} Resulting point of the addition
     * @throw The point is not on Weierstrass curve.
     */
    add(Q) {
        if (Q.constructor.name != "WeierstrassPoint") {
            throw "The point is not on Weierstrass curve."
        }
        if (this.equals(Q)) {
            console.log("Wrong usage, please consider using the double() method.");
            this.double();
        }
        let a1 = this.curve.getA1;
        let a3 = this.curve.getA3;
        let a2 = this.curve.getA2;
        let x1 = this.getX;
        let y1 = this.getY;
        let x2 = Q.getX;
        let gradient = this.gradientWithPoint(Q);

        let x3 = gradient**2 + a1*gradient - a2 - x1 - x2;
        let y3 = -a1*x3 - a3 - gradient*x3 + gradient*x1 - y1;
        let Result = new WeierstrassPoint(this.curve, x3, y3);
        return Result;
    }

    /**
     * 
     * @returns {WeierstrassPoint} the double of the point
     */
    double() {
        let tanGradient = this.tanEqCoeff()[0];
        let a1 = this.curve.getA1;
        let a2 = this.curve.getA2;
        let a3 = this.curve.getA3;
        let x3 = tanGradient**2 + tanGradient*a1 - a2 + 2*this.x;
        let y3 = -a1*x3 - a3 - tanGradient*x3 + tanGradient*this.x - this.y;
        console.log(x3, y3)
        let Result = new WeierstrassPoint(this.curve, x3, y3);
        return Result;
    }
}

// UTILISATION

// Y^2 + a1 XY + a3 * Y = X^3 + a2 X^2 + a4 X + a6

// // Short weierstrass : y2 = x3 + ax + b
// let a = 2;
// let b = 1;
// let curve = new Weierstrass(0, 0, 0, a, b);
// let P = new WeierstrassPoint(curve, 0, 1);
// let Q = new WeierstrassPoint(curve, 1.98, 3.567);

// console.log("P + Q = ", P.add(Q).toString())
// console.log("2P =", P.double().toString());
// console.log("2P =", P.double().toString());