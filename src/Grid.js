function Grid() {
    this.node = new THREE.Object3D();
    this.geom = new THREE.PlaneGeometry(100, 100);
    this.mtl = new THREE.MeshBasicMaterial({color: 0xffffff});
    this.cube = new THREE.Mesh(this.geom, this.mtl);
    this.node.add(this.cube);

    this.setVisible = function(vis) {
        this.node.visible=vis;
    }
    this.isVisible = function() {
        return this.node.visible;
    }
}

