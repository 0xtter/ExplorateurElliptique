function main2(){

    let graphmod = new ModCurveGraph("calc");

    let liste_points = [[3,3],[3,2],[0,4],[0,1],[1,3],[1,2]]; //à récuperer avec la fonction créée dans elliptic

    //affichage des points de la courbe
    graphmod.displayPoints(liste_points);
    graphmod.displayClickPoints(liste_points);
}