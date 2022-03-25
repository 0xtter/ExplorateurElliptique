class GraphLine {
    constructor(grad, b, id, graph) {
        this.graph = graph;
        this.H = [graph.calculator.HelperExpression({ latex: `grad_${id}` }), graph.calculator.HelperExpression({ latex: `b_${id}` })];
        this.grad = grad;
        this.b = b;
        this.id = id;
        this.onUpdate =[];
    }

    startUpdatingLine() {
        var eq;

        var that = this;
        
        this.HP[1].observe('numericValue', (function () {
            
            that.grad = that.H[0].numericValue;
            that.executeOnUpdate(that,this.graph);
            // try{
            //     eq = that.pointP.lineEqCoeffWithPoint(that.pointQ);
            // }catch(error){
            //     console.log(error)
            // }
            // calculator.updateLine(that.id, eq[0], eq[1])
        }))
        this.HQ[1].observe('numericValue', (function () {
            that.b = that.H[0].numericValue;
            that.executeOnUpdate(that,this.graph);
            // try{
            //     eq = that.pointQ.lineEqCoeffWithPoint(that.pointP);
            // }catch(error){
            //     console.log(error)
            // }
            // calculator.updateLine(that.id, eq[0], eq[1])
        }))
    }

    stopUpdatingLine(){
        this.H[0].unobserve('numericValue');
        this.H[1].unobserve('numericValue');
    }
    executeOnUpdate(that){
        this.onUpdate.forEach(element => element(that))
    }
}
