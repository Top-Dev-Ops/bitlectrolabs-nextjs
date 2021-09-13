import * as THREE from 'three';


export default class Group {

    constructor(scene, camera, numOfInputImages) {
        this.scene = scene;
        this.camera = camera;
        this.offset = 0.8;
        this.imageWidth = isMobile() ? 2 : 3.5;
        this.imageGap = isMobile() ? 3 : 5;
        this.numOfImages = Math.ceil(Math.sqrt(numOfInputImages))
        this.groupWidth = (this.numOfImages - 1) * this.imageGap + this.imageWidth;

        this.groupGap = this.groupWidth + (this.imageGap - this.imageWidth);
        this.totalWidth = 2 * this.groupGap + this.groupWidth;


        this.buildGroups();
    }

    reAlign(activeGroupNumber) {
        const restGroups = this.groups.filter(group => group.name !== `${activeGroupNumber}`);
        let count = 0;
        for (let i = 0; i < 3; ++i) {
            for (let j = 0; j < 3; ++j) {
                if (i === 1 && j === 1) continue;
                const g = restGroups[count];
                g.position.x = this.groups[activeGroupNumber].position.x - (this.totalWidth - this.groupWidth) / 2 + j * this.groupGap;
                g.position.y = this.groups[activeGroupNumber].position.y - (this.totalWidth - this.groupWidth) / 2 + i * this.groupGap;
                count++;
            }
        }
    }

    buildGroups() {
        this.groups = [];

        for (let i = 0; i < 3; ++i) {
            for (let j = 0; j < 3; ++j) {
                const g = this.createGroup(`${i * 3 + j}`);
                g.position.x = -(this.totalWidth - this.groupWidth) / 2 + j * this.groupGap;
                g.position.y = -(this.totalWidth - this.groupWidth) / 2 + i * this.groupGap;
                this.groups.push(g);
            }
        }
        // this.reAlign('2');
    }

    createGroup(groupName) {
        const _group = new THREE.Group();
        _group.name = groupName;
        const t1 = new THREE.TextureLoader().load(`images/${Math.ceil(Math.random() * 10) % 2 + 1}.png`);

        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(this.imageWidth, this.imageWidth),
            new THREE.MeshBasicMaterial({ map: t1 })
        );

        for (var i = 0; i < this.numOfImages; ++i) {
            for (let j = 0; j < this.numOfImages; ++j) {
                const m = plane.clone();
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



function isMobile() {
    var checker = {
        Android: function Android() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function BlackBerry() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function iOS() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function Opera() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function Windows() {
            return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
        },
        any: function any() {
            return (
                checker.Android() ||
                checker.BlackBerry() ||
                checker.iOS() ||
                checker.Opera() ||
                checker.Windows()
            );
        },
    };
    return checker.any() ? true : false;
}

function isPortrait() {
    var portrait;
    if (window.matchMedia("(orientation: portrait)").matches) {
        portrait = true;
    }
    if (window.matchMedia("(orientation: landscape)").matches) {
        portrait = false;
    }
    return portrait;
}