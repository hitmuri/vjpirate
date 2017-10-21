
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
        console.log("blup");
    }

    this.preview  = document.getElementById("preview");

    //CAMERA
    this.camera = new THREE.OrthographicCamera(-this.preview.clientWidth/2,
                                               this.preview.clientWidth/2,
                                               this.preview.clientHeight/2,
                                               -this.preview.clientHeight/2,
                                               1, 10000);
    this.camera.position.z = 10;

    //SCENE
    this.scene = new THREE.Scene();

    var newGrid = new Grid();
    this.scene.add(newGrid.node);
    this.grids.push(newGrid);
    this.curGrid = newGrid;

    //RENDERER
    this.renderer = new THREE.WebGLRenderer({antialias:true});
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.preview.clientWidth, this.preview.clientHeight);
    this.renderer.setClearColor(0x000000);
    this.preview.appendChild(this.renderer.domElement);

    this.onWindowResize = function() {
        this.camera.aspect = this.preview.clientWidth 
                             / this.preview.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.preview.clientWidth, 
                              this.preview.clientHeight);
    }

    window.addEventListener('resize', this.onWindowResize.bind(this), false);

    this.animate = function() {
        requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera);
    }

    this.animate();

}

var vjp = new VjPirate();

