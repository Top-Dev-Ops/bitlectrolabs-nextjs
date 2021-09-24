import * as THREE from 'three';

export default class Label {

    constructor(scene) {
        this.posX = 0;
        this.text = "Hell";
        this.canvas = document.createElement('canvas');
        this.canvas.width = 500;
        this.canvas.height = 100;
        this.ctx = this.canvas.getContext("2d");


        this.position = new THREE.Vector3();

        this.plane = new THREE.Mesh(
            new THREE.PlaneGeometry(4, 0.7),
            new THREE.MeshBasicMaterial({})
        );
        this.plane.position.z = 0.001;
        this.plane.name = 'plane'
        scene.add(this.plane);
    }

    show() { this.plane.visible = true };
    hide() { this.plane.visible = false };

    createMap() {

    }

    setPosition(x, y) {
        this.plane.position.x = x;
        this.plane.position.y = y;
    }

    setText(text) {
        this.text = "#3298    #3298"
        // this.text = `${text}     ${text}`;
        this.posX = this.canvas.width / 3 * 2;
    }

    update() {
        this.posX += 0.8;

        this.ctx.fillStyle = "#ffffff";
        this.ctx.fillRect(0, 0, 500, 100);
        this.ctx.font = "60px Arial";
        this.ctx.fillStyle = "#000000";
        this.ctx.fillText(this.text, this.canvas.width - this.posX, 70);

        const textWidth = this.ctx.measureText(this.text).width;
        if (this.posX + textWidth > this.canvas.width) {
            this.ctx.font = "60px Platform";
            this.ctx.fillStyle = "#000000";
            this.ctx.fillText(this.text, 2 * this.canvas.width - this.posX, 70);
        }

        if (this.posX > this.canvas.width * 2) this.posX = this.canvas.width;

        const texture = new THREE.CanvasTexture(this.canvas);
        texture.needsUpdate = true;
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
        texture.anisotropy = 16;
        this.plane.material.map = texture;
        // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}