class DynamicLine {
    constructor(idP, idQ, id, calculator) {
        this.P = [calculator.HelperExpression({ latex: `x_${idP}` }), calculator.HelperExpression({ latex: `y_${idP}` })];
        this.Q = [calculator.HelperExpression({ latex: `x_${idQ}` }), calculator.HelperExpression({ latex: `y_${idQ}` })];
        this.id = id;
    }

    startUpdatingLine(calculator) {
        this.objP = new Point(0,0);
        this.objQ = new Point(0,0);
        var eq;

        var that = this;
        
        this.P[1].observe('numericValue', (function () {
            that.objP.x = that.P[0].numericValue;
            that.objP.y = that.P[1].numericValue;
            eq = that.objP.lineEqCoeffWithPoint(that.objQ);
            calculator.updateLine(that.id, eq[0], eq[1])
        }))
        this.Q[1].observe('numericValue', (function () {
            that.objQ.x = that.Q[0].numericValue;
            that.objQ.y = that.Q[1].numericValue;
            eq = that.objQ.lineEqCoeffWithPoint(that.objP);
            calculator.updateLine(that.id, eq[0], eq[1])
        }))
    }

    stopUpdatingLine(calculator){
        this.P[1].unobserve('numericValue');
        this.P[1].unobserve('numericValue');
    }
}