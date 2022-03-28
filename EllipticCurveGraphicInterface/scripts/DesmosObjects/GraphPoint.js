class GraphPoint extends GraphObject{
    constructor(x, y, id, graph) {
        super(id,graph);
        this.x = x;
        this.y = y;
        this.H = [this.graph.calculator.HelperExpression({ latex: `x_{${id}}` }), this.graph.calculator.HelperExpression({ latex: `y_{${id}}` })];
    }

    startUpdatingPoint() {
        var that = this;

        this.H[0].observe('numericValue', (function () {
            that.x = that.H[0].numericValue;
            that.executeOnUpdate(that,this.graph);
        }))

        this.H[1].observe('numericValue', (function () {
            that.y = that.H[1].numericValue;
            that.executeOnUpdate(that,this.graph);
        }))

    }

    stopUpdatingPoint() {
        this.H[0].unobserve('numericValue');
        this.H[1].unobserve('numericValue');
    }
    
    setPointAsSum(P,Q){
        let pointP = new Point(P.x, P.y);
        let pointQ = new Point(Q.x, Q.y);
        console.log(pointP.ad)
    }
}

class WeierstrassGraphPoint extends GraphPoint{
    constructor(x, y, id, graph) {
        super(x, y, id, graph);
    }

    setPointAsSum(P,Q){
        P.addFunctionAtUpdate(function (P, Q) {
            // let pointP = new WeierstrassPoint(P.x, P.y);
            // let pointQ = new WeierstrassPoint(Q.x, Q.y);
            // try {
            //     let sum = pointP.add(pointQ);
            //     console.log(sum)
            //     this.graph.updatePoint(this.id, sum)
            // } catch (error) {
            //     console.warn(error)
            // }
        }, [P, Q])

        Q.addFunctionAtUpdate(function (P, Q) {
            // let pointQ = new Point(Q.x, Q.y);
            // let pointP = new Point(P.x, P.y);
            // try {
            //     let sum = pointQ.add(pointP);
            //     console.log(sum)
            //     this.graph.updatePoint(this.id, sum)
            // } catch (error) {
            //     console.warn(error)
            // }
        }, [P, Q])
    }

}

// class CurvePoint extends GraphPoint{
//     constructor(x,y,id,graph){
//         super(x,y,id,graph)
//         this.HY = this.graph.calculator.HelperExpression({ latex: `y_{n${id}}` });//graph.getExpressionById(`y_n${id}`);
//     }

//     startUpdatingPoint() {
//         var that = this;

//         this.H[0].observe('numericValue', (function () {
//             that.x = that.H[0].numericValue;
//         }))

//         this.H[1].observe('numericValue', (function () {
//             that.y = that.H[1].numericValue;
//             // var calculatorRect = that.graph.element.getBoundingClientRect();
//             // that.graph.element.addEventListener('mousemove', function (evt) {
//             //     var pos = that.graph.calculator.pixelsToMath({
//             //         x: evt.clientX - calculatorRect.left,
//             //         y: evt.clientY - calculatorRect.top
//             //     });
//             //     var positiveDistance = Math.sqrt((pos.x-that.x)**2 + (pos.y-that.H[1].numericValue)**2)
//             //     var negativeDistance = Math.sqrt((pos.x-that.x)**2 + (pos.y-that.HY.numericValue)**2)
                
//             //     if (positiveDistance<=negativeDistance){
//             //         that.y = that.H[1].numericValue;
//             //         that.graph.calculator.setExpression({ id: `point${that.id}`, latex: `(x_${that.id},y_${that.id})`});
//             //     }
//             //     else{
//             //         that.y = that.HY.numericValue;
//             //         that.graph.calculator.setExpression({ id: `point${that.id}`, latex: `(x_${that.id},y_{n${that.id}})`});
//             //         return
//             //     }
                
//             // }, { once: true });
//             // console.log(that)
//         }))
//     }

//     stopUpdatingLine() {
//         this.H[0].unobserve('numericValue');
//         this.H[1].unobserve('numericValue');
//     }
// }