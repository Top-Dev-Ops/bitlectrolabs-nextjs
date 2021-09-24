import * as THREE from 'three';

export default class MouseController {
    constructor(scene, camera, canvas, label) {
        this.scene = scene;
        this.camera = camera;
        this.canvas = canvas;
        this.label = label;
        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();

        canvas.addEventListener('pointermove', this.onMouseMove.bind(this))
        canvas.addEventListener('pointerup', this.onMouseUp.bind(this))
        canvas.addEventListener('pointerdown', this.onMouseDown.bind(this))
    }


    getOffset(el) {
        let x = 0;
        let y = 0;
        while (el && !Number.isNaN(el.offsetLeft) && !Number.isNaN(el.offsetTop)) {
            x += el.offsetLeft - el.scrollLeft;
            y += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
        }
        return { top: y, left: x };
    }

    onMouseUp(event) {

    }

    onMouseDown(event) {
        // if (event.which > 0) return; // Force Return
        if (event.which !== 1) return; // Only Left Button
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);
        if (intersects.length > 0) {
            const name = intersects[0].object.name;
            if (name === 'plane') return;
            const pos = new THREE.Vector3();
            intersects[0].object.getWorldPosition(pos);
            this.label.setPosition(pos.x, pos.y);
            this.label.setText(name)
            this.label.show();
        } else {
            // this.label.hide();
        }
    }

    onMouseMove(event) {
        const offset = this.getOffset(this.canvas);
        this.mouse.x = ((event.clientX - offset.left) / this.canvas.clientWidth) * 2 - 1;
        this.mouse.y = - ((event.clientY - offset.top) / this.canvas.clientHeight) * 2 + 1;
    }

}