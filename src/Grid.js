function GridParameter() {
    this.value=0;
    this.patternsMin = [0];
    this.patternsMax = [1];
    this.getValue = function(cell) {
        var cellMod = cell%this.patternsMin.length;
        return this.value*(this.patternsMax[cellMod]-this.patternsMin[cellMod])
                +this.patternsMin[cellMod];
    }
    this.addPattern = function(min, max) {
        this.patternsMin.push(min);
        this.patternsMax.push(max);
    }
};


function Grid() {
    this.gridSize = 10;
    this.node = new THREE.Object3D();
    this.geom = new THREE.PlaneBufferGeometry(1, 1);
    this.mtl = new THREE.MeshBasicMaterial({color: 0xffffff});
    this.cells = [];
    for(var c=0;c<this.gridSize*this.gridSize;c++) {
        this.cells.push(new THREE.Mesh(this.geom, this.mtl));
        this.node.add(this.cells[c]);
        this.cells[c].visible=true;
    }
    this.nbCols=0;
    this.nbRows=0;
    this.size=new GridParameter();
    this.size.value=0.5;
    //FIXME temp
    this.size.addPattern(1,0);

    this.setVisible = function(vis) {
        this.node.visible=vis;
    }
    this.isVisible = function() {
        return this.node.visible;
    }

    this.setColumns = function(cols) {
        this.nbCols=Math.floor(cols*(this.gridSize-1))+1;
        this.updateGrid();
    }
    this.getColumns = function() {
        return this.nbCols;
    }
    this.setRows = function(rows) {
        this.nbRows=Math.floor(rows*(this.gridSize-1))+1;
        this.updateGrid();
    }
    this.getRows = function() {
        return this.nbRows;
    }
    this.setSize = function(size) {
        if(size!=this.size.value) {
            this.size.value=size;
            this.updateGrid();
        }
    }
    this.getSize = function() {
        return this.size.value;
    }

    this.updateGrid = function() {
        var p=0;
        for(var c=0; c<this.gridSize; c++) {
            for(var r=0; r<this.gridSize; r++) {
                if(c<this.nbCols && r<this.nbRows) {
                    this.cells[r*this.gridSize+c].visible=true;
                    this.cells[r*this.gridSize+c].scale.set(
                                            this.size.getValue(p)/this.nbRows,
                                            this.size.getValue(p)/this.nbCols,
                                            1);
                    this.cells[r*this.gridSize+c].position.set(
                                                (r+0.5)/this.nbRows-0.5,
                                                (c+0.5)/this.nbCols-0.5,
                                                0);
                    p++;
                }
                else {
                    this.cells[r*this.gridSize+c].visible=false;
                }
            }
        }
    }
    this.setColumns(0);
    this.setRows(0);
    this.setSize(0.5);
}

