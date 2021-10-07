import * as THREE from 'three';
import gsap from 'gsap';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';


const rows = 7;
const cols = 9;
const offset = 1;
const w = 4;
const gap = 1.8;
const N = rows * cols;
const D = w + gap; // Distance Between Cards

export default class Group {

    constructor(scene, canvas, camera, data, label, callback1, callback2) {
        this.scene = scene;
        this.camera = camera;
        this.canvas = canvas;
        this.center = new THREE.Vector2(0, 0); // Camera Position : [center.x  D - D/2 , center.x  D + D/2]
        this.data = data;
        this.label = label;
        this.cards = [];
        this.gifCounter = 0;
        this.buildGroup(this.data);
        this.created = false;
        this.callback1 = callback1;
        this.callback2 = callback2;

        let mouseClicked = false;
        this.canvas.addEventListener('pointerdown', () => {
            mouseClicked = true;
        });

        this.canvas.addEventListener('pointermove', (e) => {
            mouseClicked = false;

            const vec = new THREE.Vector3(); // create once and reuse
            const pos = new THREE.Vector3(); // create once and reuse
            const offset = this.getOffset(this.canvas);
            vec.set(
                ((e.clientX - offset.left) / this.canvas.clientWidth) * 2 - 1,
                - ((e.clientY - offset.top) / this.canvas.clientHeight) * 2 + 1,
                0.5);

            vec.unproject(this.camera);

            vec.sub(this.camera.position).normalize();

            const distance = - this.camera.position.z / vec.z;

            pos.copy(this.camera.position).add(vec.multiplyScalar(distance));


            for (var i = 0; i < rows; ++i) {
                for (var j = 0; j < cols; ++j) {

                    if (!this.cards[i][j]) return;
                    const card = this.cards[i][j];

                    if (card.position.x < pos.x + 2 &&
                        card.position.x > pos.x - 2 &&
                        card.position.y < pos.y + 2 &&
                        card.position.y > pos.y - 2) { // Mouse Over Card
                        card.userData.hover = true; // Asign Hover Status

                        this.showLabel(card);
                        gsap.to(card.scale, { duration: 0.5, x: 0.1, y: 0.1, z: 0.1 });
                        gsap.to(this.label.plane.scale, { duration: 0.5, x: 0.038, y: 0.038, z: 0.038 });
                        this.cardWithLabel = card;
                    } else {
                        card.userData.hover = false;
                        if (this.cardWithLabel && !this.cardWithLabel.userData.hover) {
                            this.label.hide()
                            this.cardWithLabel = null;
                            gsap.to(card.scale, { duration: 0.5, x: 0.075, y: 0.075, z: 0.075 });
                            gsap.to(this.label.plane.scale, { duration: 0.5, x: 0.028, y: 0.028, z: 0.028 })
                        }
                    }

                }
            }

        });

        this.canvas.addEventListener('pointerup', () => {
            if (mouseClicked && this.cardWithLabel) {
                this.handleClick(this.cardWithLabel);
            }
        });


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


    reBuild(data) {
        this.data = [];
        this.data = data;
        this.gifCounter = 0;
        if (data.length === 0) {
            this.canvas.style.visibility = 'hidden'
            return;
        }
        this.canvas.style.visibility = 'visible'
        for (let i = 0; i < rows; ++i) {
            for (let j = 0; j < cols; ++j) {
                const card = this.cards[i][j];
                card.userData.fileNumber = (i * cols + j) % data.length;
                card.element.src = data[card.userData.fileNumber].image_original_url;
            }
        }
    }

    buildGroup(data) {
        const img = document.createElement('img');
        img.classList.add('element');
        const object = new CSS3DObject(img);
        object.scale.multiplyScalar(0.075)

        for (let i = 0; i < rows; ++i) {
            this.cards[i] = [];
            for (let j = 0; j < cols; ++j) {
                const card = object.clone();
                card.name = `card_${i}_${j}`;
                card.userData.fileNumber = (i * cols + j) % data.length;
                card.element.src = data[card.userData.fileNumber].image_original_url;

                // card.element.onmousedown = () => { this.handleClick(card); }
                // card.element.onmouseenter = () => {
                //     this.showLabel(card)
                // }

                card.position.x = (j - Math.floor(cols / 2)) * (w + gap);
                card.position.y = (i - Math.floor(rows / 2)) * (w + gap) - offset * j;
                this.scene.add(card);
                this.cards[i][j] = card;
            }
        }
    }

    removeCards() {
        for (let i = 0; i < rows; ++i) {
            for (let j = 0; j < cols; ++j) {
                this.scene.remove(this.cards[i][j])
            }
            this.cards[i] = [];
        }
    }

    handleClick(card) {
        card.scale.set(0.075,0.075,0.075);
        this.label.plane.scale.set(0.028,0.028,0.028)
        /* Handle Image Click Event */
        this.callback1()
        this.callback2(this.data[card.userData.fileNumber])
    }

    showLabel(card) {
        const pos = new THREE.Vector3();
        card.getWorldPosition(pos);
        this.label.setPosition(pos.x, pos.y);
        if (this.data[card.userData.fileNumber].owner.user !== null) {
            this.label.setText(`${this.data[card.userData.fileNumber].token_id} ${this.data[card.userData.fileNumber].owner.user.username}`)
        } else {
            this.label.setText(this.data[card.userData.fileNumber].token_id)
        }
        this.label.show();
    }

    range(camPos, center) {
        return (center * D + D / 2 > camPos && camPos > center * D - D / 2) ? true : false;
    }

    getCameraState() {
        let state = { x: 0, y: 0 }
        if (this.range(this.camera.position.x, this.center.x + 1)) { state.x = 1; this.center.x++ }
        if (this.range(this.camera.position.x, this.center.x - 1)) { state.x = -1; this.center.x-- }
        if (this.range(this.camera.position.y, this.center.y + 1)) { state.y = 1; this.center.y++ }
        if (this.range(this.camera.position.y, this.center.y - 1)) { state.y = -1; this.center.y-- }
        return state;
    }

    tick() {
        // -1 for right and down, 1 for up and left
        const { x, y } = this.getCameraState();
        if (x === 0 && y === 0) return;

        if (x === 1) {
            for (let i = 0; i < rows; ++i) {
                this.cards[i][0].position.x = this.cards[i][cols - 1].position.x + D;
                this.updateGif(this.cards[i][0]);
            }
        }

        if (x === -1) {
            for (let i = 0; i < rows; ++i) {
                this.cards[i][cols - 1].position.x = this.cards[i][0].position.x - D;
                this.updateGif(this.cards[i][cols - 1]);
            }
        }

        if (y === 1) {
            for (let j = 0; j < cols; ++j) {
                this.cards[0][j].position.y = this.cards[rows - 1][j].position.y + D;
                this.updateGif(this.cards[0][j]);
            }
        }

        if (y === -1) {
            for (let j = 0; j < cols; ++j) {
                this.cards[rows - 1][j].position.y = this.cards[0][j].position.y - D;
                this.updateGif(this.cards[rows - 1][j]);
            }
        }

        const newCards = [];

        for (let i = 0; i < rows; ++i) {
            newCards[i] = [];
            for (let j = 0; j < cols; ++j) {

                const _i = (i + y === -1) ? rows - 1 :
                    (i + y === rows) ? 0 : i + y;

                const _j = (j + x === -1) ? cols - 1 :
                    (j + x === cols) ? 0 : j + x;

                newCards[i][j] = this.cards[_i][_j];
                newCards[i][j].name = this.cards[_i][_j].name;
            }
        }
        this.cards = newCards;
    }

    updateGif(card) {
        if (this.gifCounter === this.data.length) this.gifCounter = 0;
        card.element.src = this.data[this.gifCounter].image_original_url;
        card.userData.fileNumber = this.gifCounter;
        ++this.gifCounter;
    }
}