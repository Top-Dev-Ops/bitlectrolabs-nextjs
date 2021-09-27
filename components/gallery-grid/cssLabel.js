import * as THREE from 'three';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';

export default class Label {

    constructor(scene) {

        const label = document.createElement('div');
        label.classList.add('labelElement')
        const p = document.createElement('p');
        label.appendChild(p);

        this.plane = new CSS3DObject(label);
        this.plane.scale.multiplyScalar(0.028)
        scene.add(this.plane);
        this.element = label;
        this.element.setAttribute('pointer_events', 'none');
    }

    show() { this.plane.visible = true };
    hide() { this.plane.visible = false };

    createMap() {

    }

    setPosition(x, y) {
        this.plane.position.x = x;
        this.plane.position.y = y;
        this.plane.position.z = 0.001;
    }

    setText(text) {
        this.plane.element.childNodes[0].innerHTML = `${text}`;
    }

    update() {
        // this.posX += 1;
        // this.text.position.x = this.posX;
    }
}