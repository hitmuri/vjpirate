
function VjPirate() {
    this.grids = [];


    this.gridActive = function() {
        this.curGrid.setVisible(!this.curGrid.isVisible());
        var but = document.getElementById("grid-active");
        if(this.curGrid.isVisible()) {
            but.classList.add("active");
        }
        else {
            but.classList.remove("active");
        }
    }

    this.gridCols = function() {
        var colsSli = document.getElementById("grid-cols");
        this.curGrid.setColumns(colsSli.value/100);
    }

    this.gridRows = function() {
        var rowsSli = document.getElementById("grid-rows");
        this.curGrid.setRows(rowsSli.value/100);
    }

    this.gridSize = function() {
        var colsSli = document.getElementById("grid-size");
        this.curGrid.setSize(sizeSli.value/100);
    }

    this.preview  = document.getElementById("preview");
    this.width = this.preview.clientWidth;
    this.height =this.preview.clientHeight;

    //CAMERA
    this.camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5,
                                               1, 10000);
    this.camera.position.z = 10;

    //SCENE
    this.scene = new THREE.Scene();

    var newGrid = new Grid();
    this.scene.add(newGrid.node);
    this.grids.push(newGrid);
    this.curGrid = newGrid;
    this.curGrid.setColumns(3);

    //RENDERER
    this.renderer = new THREE.WebGLRenderer({antialias:true});
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.preview.clientWidth, this.preview.clientHeight);
    this.renderer.setClearColor(0x000000);
    this.preview.appendChild(this.renderer.domElement);

    this.onWindowResize = function() {
        this.renderer.setSize(this.preview.clientWidth, 
                              this.preview.clientHeight);
        this.camera.aspect = this.preview.clientWidth 
                             / this.preview.clientHeight;
        this.camera.updateProjectionMatrix();
    }

    window.addEventListener('resize', this.onWindowResize.bind(this), false);

    this.animate = function() {
        requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera);
    }

    this.animate();

}

var vjp = new VjPirate();

