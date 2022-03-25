class GraphObject{
    constructor(id, graph) {
        this.graph = graph
        this.H;
        this.id = id;
        this.onUpdate =[];
    }

    executeOnUpdate(that){
        this.onUpdate.forEach(element => element(that))
    }
}