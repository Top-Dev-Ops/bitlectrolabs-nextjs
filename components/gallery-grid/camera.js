import gsap from 'gsap';

export default class MoveCamera {

    constructor(camera, orbit) {
        this.camera = camera;
        this.orbit = orbit;
        this.speed = 8
    }


    toRight() {
        const _x = this.camera.position.x + this.speed;
        gsap.to(this.camera.position, { duration: 1.2, x: _x });
        gsap.to(this.orbit.target, { duration: 1.2, x: _x })
    }

    toLeft() {
        const _x = this.camera.position.x - this.speed;
        gsap.to(this.camera.position, { duration: 1.2, x: _x });
        gsap.to(this.orbit.target, { duration: 1.2, x: _x })

    }

    toUp() {
        const _y = this.camera.position.y + this.speed;
        gsap.to(this.camera.position, { duration: 1.2, y: _y });
        gsap.to(this.orbit.target, { duration: 1.2, y: _y })

    }

    toDown() {
        const _y = this.camera.position.y - this.speed;
        gsap.to(this.camera.position, { duration: 1.2, y: _y });
        gsap.to(this.orbit.target, { duration: 1.2, y: _y })
    }



}