import * as THREE from 'three';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';

const rows = 7;
const cols = 9;
const offset = 1;
const w = 4;
const gap = 1.8;
const N = rows * cols;
const D = w + gap; // Distance Between Cards

export default class Group {

    constructor(scene, camera, data, label, callback1, callback2) {
        this.scene = scene;
        this.camera = camera;
        this.center = new THREE.Vector2(0, 0); // Camera Position : [center.x  D - D/2 , center.x  D + D/2]
        this.data = data;
        this.label = label;
        this.cards = [];
        this.gifCounter = 0;
        this.buildGroup();
        this.marqueeShow = false;
        this.callback1 = callback1;
        this.callback2 = callback2;
    }


    buildGroup() {
        const img = document.createElement('img');
        img.classList.add('element');
        const object = new CSS3DObject(img);
        object.scale.multiplyScalar(0.075)

        for (let i = 0; i < rows; ++i) {
            this.cards[i] = [];
            for (let j = 0; j < cols; ++j) {
                const card = object.clone();
                card.name = `card_${i}_${j}`;
                card.userData.fileNumber = (i * cols + j) % this.data.length;
                card.element.src = this.data[card.userData.fileNumber].image_original_url;
                
                card.element.onmousedown = () => { this.handleClick(card); }
                card.element.onmouseenter = () =>{
                    this.showLabel(card)
                }
                // card.element.onmouseleave = () =>{this.label.hide()}

                card.position.x = (j - Math.floor(cols / 2)) * (w + gap);
                card.position.y = (i - Math.floor(rows / 2)) * (w + gap) - offset * j;
                this.scene.add(card);
                this.cards[i][j] = card;
            }
        }
    }


    handleClick(card) {
        /* Handle Image Click Event */
        this.callback1(false)
        this.callback2(this.data[card.userData.fileNumber])
    }

    showLabel(card){
        this.marqueeShow = true;
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