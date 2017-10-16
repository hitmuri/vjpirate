
//OSC
var port = new osc.WebSocketPort({
    url: "ws://127.0.0.1:8211"
});

port.on("message", function(oscMessage) {
    console.log(oscMessage);
});

port.on("ready", function() {
    console.log("Websocket ready");
});

port.open();

var camera, scene, renderer;
var preview;
var grids = [];
var curGrid=undefined;

function Grid() {
    this.node = new THREE.Object3D();
    this.geom = new THREE.PlaneGeometry(100, 100);
    this.mtl = new THREE.MeshBasicMaterial({color: 0xffffff});
    this.cube = new THREE.Mesh(this.geom, this.mtl);
    this.node.add(this.cube);
}

function gridActive() {
    curGrid.node.visible=!curGrid.node.visible;
    var but = document.getElementById("grid-active");
    if(curGrid.node.visible) {
        but.classList.add("active");
    }
    else {
        but.classList.remove("active");
    }
}

function init() {
    preview  = document.getElementById("preview");

//CAMERA
    camera = new THREE.OrthographicCamera(-preview.clientWidth/2,
                                          preview.clientWidth/2,
                                          preview.clientHeight/2,
                                          -preview.clientHeight/2,
                                          1, 10000);
    camera.position.z = 10;

//SCENE
    scene = new THREE.Scene();

    var newGrid = new Grid();
    scene.add(newGrid.node);
    grids.push(newGrid);
    curGrid = newGrid;

//RENDERER
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(preview.clientWidth, preview.clientHeight);
    renderer.setClearColor(0x000000);
    preview.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = preview.clientWidth / preview.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(preview.clientWidth, preview.clientHeight);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

init();
animate();


