class DynamicLine {
    constructor(P, Q, id, graph) {
        this.HP = [graph.calculator.HelperExpression({ latex: `x_${P.id}` }), graph.calculator.HelperExpression({ latex: `y_${P.id}` })];
        this.HQ = [graph.calculator.HelperExpression({ latex: `x_${Q.id}` }), graph.calculator.HelperExpression({ latex: `y_${Q.id}` })];
        this.P = P;
        this.Q = Q;
        this.id = id;
    }

    startUpdatingLine(calculator) {
        this.pointP = new Point(0,0);
        this.pointQ = new Point(0,0);
        var eq;

        var that = this;
        
        this.HP[1].observe('numericValue', (function () {
            that.pointP.x = that.P.x;
            that.pointP.y = that.P.y;
            try{
                eq = that.pointP.lineEqCoeffWithPoint(that.pointQ);
            }catch(error){
                console.log(error)
            }
            calculator.updateLine(that.id, eq[0], eq[1])
        }))
        this.HQ[1].observe('numericValue', (function () {
            that.pointQ.x = that.HQ[0].numericValue;
            that.pointQ.y = that.HQ[1].numericValue;
            try{
                eq = that.pointQ.lineEqCoeffWithPoint(that.pointP);
            }catch(error){
                console.log(error)
            }
            calculator.updateLine(that.id, eq[0], eq[1])
        }))
    }

    stopUpdatingLine(calculator){
        this.P[1].unobserve('numericValue');
        this.P[1].unobserve('numericValue');
    }
}
