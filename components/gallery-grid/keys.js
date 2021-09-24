import gsap from 'gsap';

export default class KeyController {

    constructor(canvas, camera, orbit) {
        this.canvas = canvas;
        this.camera = camera;
        this.orbit = orbit;
        this.keySpeed = 1;
        this.movingTimeout = -1;
        this.direction = { x: 0, y: 0 };
        this.FPS = 50;

        window.addEventListener('keydown', this.keyDown.bind(this));
        window.addEventListener('keyup', this.keyUp.bind(this));
        window.addEventListener('contextmenu', this.onContextMenu.bind(this));
    }

    onContextMenu(event) {
        event.preventDefault();
    }

    keyDown(event) {
        this.direction = { x: 0, y: 0 }
        switch (event.keyCode) {
            case 39:
                this.direction.x = -1;
                break;
            case 37:
                this.direction.x = 1;
                break;
            case 38:
                this.direction.y = -1;
                break;
            case 40:
                this.direction.y = 1;
                break;
            default:
                this.direction = { x: 0, y: 0 }
                break
        }

        if (this.direction.x === 0 && this.direction.y === 0) return;

        this.startMoving();
    }


    keyUp() {
        clearTimeout(this.movingTimeout);
        this.movingTimeout = -1;
    }


    startMoving() {
        if (this.movingTimeout !== -1) return
        this.loop()
    }

    loop() {

        this.camera.position.x+= this.direction.x * this.keySpeed;
        this.camera.position.y+= this.direction.y * this.keySpeed;
        this.orbit.target.set(this.camera.position.x, this.camera.position.y, 0)
        
        // const _x = this.camera.position.x + this.direction.x * this.keySpeed;
        // const _y = this.camera.position.y + this.direction.y * this.keySpeed;
        // gsap.to(this.camera.position, { duration: 1.2, x: _x, y: _y });
        // gsap.to(this.orbit.target, { duration: 1.2, x: _x, y: _y })

        this.movingTimeout = window.setTimeout(this.loop.bind(this), 1000 / this.FPS, this.direction);
    }


}