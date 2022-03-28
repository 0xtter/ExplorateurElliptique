class GraphLine extends GraphObject {
    constructor(grad, b, id, graph) {
        super(id, graph);
        this.H = [graph.calculator.HelperExpression({ latex: `g_${id}` }), graph.calculator.HelperExpression({ latex: `b_${id}` })];
        this.grad = grad;
        this.b = b;
    }

    startUpdatingLine() {
        var that = this;

        this.H[0].observe('numericValue', (function () {
            that.grad = that.H[0].numericValue;
            that.executeOnUpdate(that, this.graph);
        }))
        this.H[1].observe('numericValue', (function () {
            that.b = that.H[0].numericValue;
            that.executeOnUpdate(that, this.graph);
        }))
    }

    linkLineToPoints(P, Q) {
        P.addFunctionAtUpdate(function (Q, line) {
            let pointP = new Point(this.x, this.y);
            let pointQ = new Point(Q.x, Q.y);
            try {
                let eq = pointP.lineEqCoeffWithPoint(pointQ);
                line.graph.updateLine(line.id, eq[0], eq[1]);
            } catch (error) {
                console.warn(error)
            }
        }, [Q, this])

        Q.addFunctionAtUpdate(function (P, line) {
            let pointQ = new Point(this.x, this.y);
            let pointP = new Point(P.x, P.y);
            try {
                let eq = pointQ.lineEqCoeffWithPoint(pointP);
                line.graph.updateLine(line.id, eq[0], eq[1]);
            } catch (error) {
                console.warn(error)
            }
        }, [P, this])
    }



    stopUpdatingLine() {
        this.H[0].unobserve('numericValue');
        this.H[1].unobserve('numericValue');
    }
}
