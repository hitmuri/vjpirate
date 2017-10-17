
//create gui callbacks

var actBut = document.getElementById("grid-active");
actBut.onmousedown = vjp.gridActive.bind(vjp);

var colsSli = document.getElementById("grid-cols");
colsSli.onmousedown = vjp.gridCols.bind(vjp);

