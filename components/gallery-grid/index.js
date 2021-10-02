import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import MouseController from './mouse';
import keyController from './keys';
import Group from './cssGroup';
import Label from './cssLabel';
import MoveCamera from './camera';
export default class ThreeApp {

    constructor(container) {
        this.container = container;

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(45, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);
        this.camera.position.set(0, 0, 25);

        this.renderer = new CSS3DRenderer();//new THREE.WebGLRenderer({ antialias: true, alpha: true });
        // this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);
        this.renderer.domElement.style.width = "100%";
        this.renderer.domElement.style.position = "fixed";
        this.renderer.domElement.style.top = "0";
        this.renderer.domElement.style.left = "0";
        this.renderer.domElement.style.zIndex = "1";
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);


        this.orbit = new OrbitControls(this.camera, this.renderer.domElement);
        this.orbit.mouseButtons.LEFT = THREE.MOUSE.PAN;
        this.orbit.touches.ONE = THREE.TOUCH.PAN;
        this.orbit.enableDamping = true;
        this.orbit.dampingFactor = 0.05;
        this.orbit.enableRotate = false;
        this.orbit.enableZoom = false;

        this.label = new Label(this.scene);
        this.label.setText('Hi This is Text')
        this.label.hide();

        this.moveCamera = new MoveCamera(this.camera, this.orbit);
        this.mouseController = new MouseController(this.scene, this.camera, this.renderer.domElement, this.label);
        this.keyController = new keyController(this.renderer.domElement, this.camera, this.orbit);
    }

    async start(callback1, callback2) {
        this.group = new Group(this.scene, this.camera, this.data, this.label, callback1, callback2);

        this.animate()
        window.addEventListener('resize', this.resize.bind(this), false);
    }

    resize() {
        let width = this.container.clientWidth;
        let height = this.container.clientHeight;
        const aspect = width / height;
        this.camera.position.z = (aspect > 4) ? 40 / aspect : 25;
        this.camera.aspect = width / height;

        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    setData(tokens) {
        this.data = tokens;
    }

    animate() {
        this.group.tick();
        this.label.update();
        requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera);
        this.orbit.update()
    }

}