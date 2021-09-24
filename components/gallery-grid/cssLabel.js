import * as THREE from 'three';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';

export default class Label {

    constructor(scene) {

        const label = document.createElement('div');
        label.classList.add('labelElement')

        this.posX = 0;
        this.plane = new CSS3DObject(label);
        this.plane.scale.multiplyScalar(0.028)
        scene.add(this.plane);
    }

    show() { this.plane.visible = true };
    hide() { this.plane.visible = false };

    createMap() {

    }

    setPosition(x, y) {
        this.plane.position.x = x;
        this.plane.position.y = y;
        this.plane.position.z = 0.1;
        console.log(x, y)
    }

    setText(text) {
        this.plane.element.innerHTML = `${text}`;
    }

    update() {
        // this.posX += 1;
        // this.text.position.x = this.posX;
    }
}