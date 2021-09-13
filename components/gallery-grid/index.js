import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import MouseController from './mouse';
import Group from './group';


export default class ThreeApp {

    constructor(container) {
        this.container = container;

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(35, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);
        this.camera.position.set(0, 0, 20);

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
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
        this.orbit.dampingFactor = 0.08;
        this.orbit.enableZoom = false;
        this.orbit.enableRotate = false;

        new MouseController(this.scene, this.camera, this.renderer.domElement);
    }

    async start() {
        const envTexture = await new RGBELoader().setDataType(THREE.UnsignedByteType).loadAsync('./env.hdr');
        var pmremGenerator = new THREE.PMREMGenerator(this.renderer);
        pmremGenerator.compileEquirectangularShader();
        this.scene.environment = pmremGenerator.fromEquirectangular(envTexture).texture;
        envTexture.dispose();
        pmremGenerator.dispose();

        // this.scene.add(new THREE.AxesHelper(3))

        this.group = new Group(this.scene, this.camera, 6);


        this.animate()
        window.addEventListener('resize', this.resize.bind(this), false);
    }

    resize() {
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }

    animate() {
        this.group.tick();
        requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera);
        this.orbit.update()
    }

    moveCamera(direction) {
        const px = this.camera.position.x;
        const py = this.camera.position.y;

        switch (direction) {
            case 'up':
                gsap.to(this.camera.position, { duration: 0.5, y: py + 2 })
                gsap.to(this.orbit.target, { duration: 0.5, y: py + 2 })
                break;
            case 'down':
                gsap.to(this.camera.position, { duration: 0.5, y: py - 2 })
                gsap.to(this.orbit.target, { duration: 0.5, y: py - 2 })
                break;
            case 'left':
                gsap.to(this.camera.position, { duration: 0.5, x: px - 2 });
                gsap.to(this.orbit.target, { duration: 0.5, x: px - 2 });
                break;
            case 'right':
                gsap.to(this.camera.position, { duration: 0.5, x: px + 2 })
                gsap.to(this.orbit.target, { duration: 0.5, x: px + 2 })
                break;
        }
    }

}