/***************************************************************************
 *  exprsui.js
 *  Part of ExprSUI
 *  2017-  Florent Berthaut
 *  hitmuri.net
 ****************************************************************************/
/*
 *  This program is free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 2 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program; if not, write to the Free Software
 *  Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.
 */

var camera, scene, renderer;

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

init();
animate();

function Grille() {
    this.node = new THREE.Object3D();

}

function init() {


//CAMERA
    camera = new THREE.OrthographicCamera(window.innerWidth/window.innerHeight,
                                          10, 100000);
    camera.position.z = 1000;

//SCENE
    scene = new THREE.Scene();

    var light = new THREE.PointLight(0xffffff, 2.5, 10000, 10);
    light.position.set(0,0,1000);
    scene.add(light);




//RENDERER
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);
    document.body.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
