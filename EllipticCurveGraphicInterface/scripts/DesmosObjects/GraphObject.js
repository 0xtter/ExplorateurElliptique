class GraphObject{
    constructor(id, graph) {
        this.graph = graph
        this.H;
        this.id = id;
        this.onUpdate =[];
        this.args= [];
    }

    executeOnUpdate(){
        for(let i=0;i<this.onUpdate.length;i++){
            this.onUpdate[i].apply(6,this.args[i]);
        }
    }

    addFunctionAtUpdate(funct,args){
        this.onUpdate.push(funct);
        this.args.push(args);
    }
}