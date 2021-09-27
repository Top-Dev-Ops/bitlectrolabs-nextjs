import gsap from 'gsap';

export default class KeyController {

    constructor(canvas, camera, orbit) {
        this.canvas = canvas;
        this.camera = camera;
        this.orbit = orbit;
        this.keySpeed = 8;
        this.movingTimeout = -1;
        this.direction = { x: 0, y: 0 };
        this.hSpeed = 0;
        this.vSpeed = 0;
        this.FPS = 50;

        window.addEventListener('keydown', this.keyDown.bind(this));
        window.addEventListener('keyup', this.keyUp.bind(this));
        window.addEventListener('contextmenu', this.onContextMenu.bind(this));
        this.animate();
    }

    onContextMenu(event) {
        event.preventDefault();
    }

    keyDown(event) {
        this.direction = { x: 0, y: 0 }
        switch (event.keyCode) {
            case 39:
                this.direction.x = 1;
                break;
            case 37:
                this.direction.x = -1;
                break;
            case 38:
                this.direction.y = 1;
                break;
            case 40:
                this.direction.y = -1;
                break;
            default:
                this.direction = { x: 0, y: 0 };
                break;
        }

        if (this.direction.x === 0 && this.direction.y === 0) return;

        this.startMoving();
    }


    keyUp() {
        clearTimeout(this.movingTimeout);
        this.movingTimeout = -1;
    }

    mouseDown(dir) {
        this.direction = { x: 0, y: 0 }
        switch (dir) {
            case 'right':
                this.direction.x = 1;
                break;
            case 'left':
                this.direction.x = -1;
                break;
            case 'up':
                this.direction.y = 1;
                break;
            case 'down':
                this.direction.y = -1;
                break;
            default:
                this.direction = { x: 0, y: 0 };
                break;
        }

        if (this.direction.x === 0 && this.direction.y === 0) return;

        this.startMoving();
    }

    mouseUp() {
        clearTimeout(this.movingTimeout);
        this.movingTimeout = -1;
    }


    startMoving() {
        if (this.movingTimeout !== -1) return
        this.loop()
    }

    loop() {
        this.hSpeed = this.direction.x * 0.4;
        this.vSpeed = this.direction.y * 0.4;
        this.movingTimeout = window.setTimeout(this.loop.bind(this), 1000 / this.FPS, this.direction);
    }

    animate() {
        this.hSpeed *= 0.97;
        this.vSpeed *= 0.97;
        this.camera.position.x += this.hSpeed;
        this.camera.position.y += this.vSpeed;
        this.orbit.target.set(this.camera.position.x, this.camera.position.y, 0);
        requestAnimationFrame(this.animate.bind(this));
    }
}