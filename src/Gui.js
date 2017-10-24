
//create gui callbacks

var actBut = document.getElementById("grid-active");
actBut.onmousedown = vjp.gridActive.bind(vjp);

var colsSli = document.getElementById("grid-cols");
colsSli.oninput = vjp.gridCols.bind(vjp);

var rowsSli = document.getElementById("grid-rows");
rowsSli.oninput = vjp.gridRows.bind(vjp);

var sizeSli = document.getElementById("grid-size");
sizeSli.oninput = vjp.gridSize.bind(vjp);
