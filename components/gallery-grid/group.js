import * as THREE from 'three';


export default class Group {

    constructor(scene, camera, data) {
        this.scene = scene;
        this.camera = camera;
        this.data = data

        this.offset = 1;

        this.imageWidth = 4;

        this.imageGap = 6;  // imageWidth + Gap

        this.numOfImages = Math.ceil(Math.sqrt(data.length)) // Number of Images In Group

        this.groupWidth = (this.numOfImages - 1) * this.imageGap + this.imageWidth;

        this.groupGap = this.groupWidth + (this.imageGap - this.imageWidth); // GroupWidth + Gap

        this.totalWidth = 2 * this.groupGap + this.groupWidth;

        this.numOfGroups = 7;

        this.buildGroups();
    }

    reAlign(activeGroupNumber) {
        const restGroups = this.groups.filter(group => group.name !== `${activeGroupNumber}`);
        let count = 0;
        for (let i = 0; i < this.numOfGroups; ++i) {
            for (let j = 0; j < this.numOfGroups; ++j) {
                if (i === Math.floor(this.numOfGroups / 2) && j === Math.floor(this.numOfGroups / 2)) continue;
                const g = restGroups[count];

                g.position.x = this.groups[activeGroupNumber].position.x - this.groupGap * (Math.ceil(this.numOfGroups / 2) - 1) + j * this.groupGap;

                g.position.y = this.groups[activeGroupNumber].position.y - this.groupGap * (Math.ceil(this.numOfGroups / 2) - 1) + i * this.groupGap;
                count++;
            }
        }
    }

    buildGroups() {
        this.groups = [];

        for (let i = 0; i < this.numOfGroups; ++i) {
            for (let j = 0; j < this.numOfGroups; ++j) {
                const g = this.createGroup(`${i * this.numOfGroups + j}`);
                g.position.x = -this.groupGap * (Math.ceil(this.numOfGroups / 2) - 1) + j * this.groupGap;
                g.position.y = -this.groupGap * (Math.ceil(this.numOfGroups / 2) - 1) + i * this.groupGap;
                this.groups.push(g);
            }
        }
        // this.reAlign('2');
    }

    createGroup(groupName) {
        const _group = new THREE.Group();
        _group.name = groupName;

        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(this.imageWidth, this.imageWidth),
            new THREE.MeshBasicMaterial({})
        );

        for (var i = 0; i < this.numOfImages; ++i) {
            for (let j = 0; j < this.numOfImages; ++j) {
                const m = plane.clone();
                m.material = new THREE.MeshBasicMaterial({
                    map: this.data[i * this.numOfImages + j]
                });
                m.material.needsUpdate = true;
                m.name = `#id_${i * this.numOfImages + j + 1}`
                m.position.x = -(this.groupWidth - this.imageWidth) / 2 + j * this.imageGap;
                m.position.y = (this.groupWidth - this.imageWidth) / 2 - this.imageGap * i - this.offset * j;
                _group.add(m);
            }
        }
        this.scene.add(_group);
        return _group;
    }



    tick() {
        this.groups.forEach(group => {
            const d = Math.sqrt(
                Math.pow((this.camera.position.x - group.position.x), 2) +
                Math.pow((this.camera.position.y - group.position.y), 2)
            );
            if (d < this.groupWidth) {
                this.reAlign(group.name);
            }
        });
    }


}