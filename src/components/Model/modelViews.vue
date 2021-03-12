<template>
    <div>
        <!-- Just a quick notice to the user that it can be interacted with -->
        <span class="drag-notice" id="js-drag-notice"
            >Drag to rotate 360&#176;</span
        >
        <!-- These toggle the the different parts of the chair that can be edited, note data-option is the key that links to the name of the part in the 3D file -->
        <div class="options">
            <div class="option --is-active" data-option="legs">
                <img
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/legs.svg"
                    alt=""
                />
            </div>
            <div class="option" data-option="cushions">
                <img
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/cushions.svg"
                    alt=""
                />
            </div>
            <div class="option" data-option="base">
                <img
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/base.svg"
                    alt=""
                />
            </div>
            <div class="option" data-option="supports">
                <img
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/supports.svg"
                    alt=""
                />
            </div>
            <div class="option" data-option="back">
                <img
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/back.svg"
                    alt=""
                />
            </div>
        </div>
        <div id="container">
            <div class="controls">
                <!-- This tray will be filled with colors via JS, and the ability to slide this panel will be added in with a lightweight slider script (no dependency used for this) -->
                <div id="js-tray" class="tray">
                    <div id="js-tray-slide" class="tray__slide"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'; // 需要自己引入
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
export default {
    data() {
        return {
            camera: null,
            scene: null,
            renderer: null,
            mesh: null,
            theModel: null,
            loaded: false,
            initRotate: 0,
        };
    },
    methods: {
        initialRotation() {
            this.initRotate++;
            if (this.initRotate <= 120) {
                this.theModel.rotation.y += Math.PI / 60;
            } else {
                this.loaded = true;
            }
        },
        init() {
            var that = this;

            // 颜色数组
            const colors = [
                {
                    texture:
                        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/wood_.jpg',
                    size: [2, 2, 2],
                    shininess: 60,
                },
                {
                    texture:
                        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/fabric_.jpg',
                    size: [4, 4, 4],
                    shininess: 0,
                },
                {
                    texture:
                        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/pattern_.jpg',
                    size: [8, 8, 8],
                    shininess: 10,
                },
                {
                    texture:
                        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/denim_.jpg',
                    size: [3, 3, 3],
                    shininess: 0,
                },
                {
                    texture:
                        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/quilt_.jpg',
                    size: [6, 6, 6],
                    shininess: 0,
                },
                {
                    color: '131417',
                },
                {
                    color: '374047',
                },
                {
                    color: '5f6e78',
                },
                {
                    color: '7f8a93',
                },
                {
                    color: '97a1a7',
                },
                {
                    color: 'acb4b9',
                },
                {
                    color: 'DF9998',
                },
                {
                    color: '7C6862',
                },
                {
                    color: 'A3AB84',
                },
                {
                    color: 'D6CCB1',
                },
                {
                    color: 'F8D5C4',
                },
                {
                    color: 'A3AE99',
                },
                {
                    color: 'EFF2F2',
                },
                {
                    color: 'B0C5C1',
                },
                {
                    color: '8B8C8C',
                },
                {
                    color: '565F59',
                },
                {
                    color: 'CB304A',
                },
                {
                    color: 'FED7C8',
                },
                {
                    color: 'C7BDBD',
                },
                {
                    color: '3DCBBE',
                },
                {
                    color: '264B4F',
                },
                {
                    color: '389389',
                },
                {
                    color: '85BEAE',
                },
                {
                    color: 'F2DABA',
                },
                {
                    color: 'F2A97F',
                },
                {
                    color: 'D85F52',
                },
                {
                    color: 'D92E37',
                },
                {
                    color: 'FC9736',
                },
                {
                    color: 'F7BD69',
                },
                {
                    color: 'A4D09C',
                },
                {
                    color: '4C8A67',
                },
                {
                    color: '25608A',
                },
                {
                    color: '75C8C6',
                },
                {
                    color: 'F5E4B7',
                },
                {
                    color: 'E69041',
                },
                {
                    color: 'E56013',
                },
                {
                    color: '11101D',
                },
                {
                    color: '630609',
                },
                {
                    color: 'C9240E',
                },
                {
                    color: 'EC4B17',
                },
                {
                    color: '281A1C',
                },
                {
                    color: '4F556F',
                },
                {
                    color: '64739B',
                },
                {
                    color: 'CDBAC7',
                },
                {
                    color: '946F43',
                },
                {
                    color: '66533C',
                },
                {
                    color: '173A2F',
                },
                {
                    color: '153944',
                },
                {
                    color: '27548D',
                },
                {
                    color: '438AAC',
                },
            ];
            const TRAY = document.getElementById('js-tray-slide');
            // Function - Build Colors
            function buildColors(colors) {
                for (let [i, color] of colors.entries()) {
                    let swatch = document.createElement('div');
                    swatch.classList.add('tray__swatch');

                    if (color.texture) {
                        swatch.style.backgroundImage =
                            'url(' + color.texture + ')';
                    } else {
                        swatch.style.background = '#' + color.color;
                    }

                    swatch.setAttribute('data-key', i);
                    TRAY.append(swatch);
                }
            }
            buildColors(colors);

            // Swatches
            const swatches = document.querySelectorAll('.tray__swatch');

            for (const swatch of swatches) {
                swatch.addEventListener('click', selectSwatch);
            }

            function selectSwatch(e) {
                let color = colors[parseInt(e.target.dataset.key)];
                let new_mtl;

                if (color.texture) {
                    let txt = new THREE.TextureLoader().load(color.texture);

                    txt.repeat.set(color.size[0], color.size[1], color.size[2]);
                    txt.wrapS = THREE.RepeatWrapping;
                    txt.wrapT = THREE.RepeatWrapping;

                    new_mtl = new THREE.MeshPhongMaterial({
                        map: txt,
                        shininess: color.shininess ? color.shininess : 10,
                    });
                } else {
                    new_mtl = new THREE.MeshPhongMaterial({
                        color: parseInt('0x' + color.color),
                        shininess: color.shininess ? color.shininess : 10,
                    });
                }
                setMaterial(that.theModel, activeOption, new_mtl);
            }

            // Select Option
            const options = document.querySelectorAll('.option');
            var activeOption = 'legs';

            for (const option of options) {
                option.addEventListener('click', selectOption);
            }

            function selectOption(e) {
                let option = e.target.parentNode;
                activeOption = option.dataset.option;

                for (const otherOption of options) {
                    otherOption.classList.remove('--is-active');
                }
                option.classList.add('--is-active');
            }

            function setMaterial(parent, type, mtl) {
                parent.traverse((o) => {
                    if (o.isMesh && o.nameID != null) {
                        if (o.nameID == type) {
                            o.material = mtl;
                        }
                    }
                });
            }

            // webgl构图
            var container = document.getElementById('container'); // 获得容器

            let cameraFar = 5; // 设置一定距离保证其能够看到椅子

            this.camera = new THREE.PerspectiveCamera(
                50,
                1920 / 1080,
                0.1,
                1000
            );
            this.camera.position.z = cameraFar;
            this.camera.position.x = 0;

            const BACKGROUND_COLOR = 0xf1f1f1;

            const MODEL_PATH =
                'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/chair.glb';

            // Initial material
            const INITIAL_MTL = new THREE.MeshPhongMaterial({
                color: 0xf1f1f1,
                shininess: 10,
            });
            const INITIAL_MAP = [
                { childID: 'back', mtl: INITIAL_MTL },
                { childID: 'base', mtl: INITIAL_MTL },
                { childID: 'cushions', mtl: INITIAL_MTL },
                { childID: 'legs', mtl: INITIAL_MTL },
                { childID: 'supports', mtl: INITIAL_MTL },
            ];

            // Function - Add the textures to the models
            function initColor(parent, type, mtl) {
                parent.traverse((o) => {
                    if (o.isMesh) {
                        if (o.name.includes(type)) {
                            o.material = mtl;
                            o.nameID = type; // Set a new property to identify this object
                        }
                    }
                });
            }

            // Init the object loader
            var loader = new GLTFLoader();

            loader.load(
                MODEL_PATH,
                function(gltf) {
                    that.theModel = gltf.scene;

                    // Set the models initial scale
                    that.theModel.scale.set(2, 2, 2);

                    // 旋转
                    that.theModel.rotation.y = Math.PI;

                    // Offset the y position a bit
                    that.theModel.position.y = -1;

                    // 接受投影
                    that.theModel.traverse((o) => {
                        if (o.isMesh) {
                            o.castShadow = true;
                            o.receiveShadow = true;
                        }
                    });

                    // Set initial textures
                    for (let object of INITIAL_MAP) {
                        initColor(that.theModel, object.childID, object.mtl);
                    }

                    // Add the model to the scene
                    that.scene.add(that.theModel);
                },
                undefined,
                function(error) {
                    console.error(error);
                }
            );

            this.scene = new THREE.Scene(); // 创建场景
            this.scene.background = new THREE.Color(BACKGROUND_COLOR);
            this.scene.fog = new THREE.Fog(BACKGROUND_COLOR, 20, 100);

            // Add lights
            var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
            hemiLight.position.set(0, 50, 0);
            // Add hemisphere light to scene
            this.scene.add(hemiLight);

            var dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
            dirLight.position.set(-8, 12, 8);
            dirLight.castShadow = true;
            dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
            // Add directional Light to scene
            this.scene.add(dirLight);

            // Floor 增加地板进行投影
            var floorGeometry = new THREE.PlaneGeometry(5000, 5000, 1, 1);
            var floorMaterial = new THREE.MeshPhongMaterial({
                color: 0xeeeeee,
                shininess: 0,
            });

            var floor = new THREE.Mesh(floorGeometry, floorMaterial);
            floor.rotation.x = -0.5 * Math.PI;
            floor.receiveShadow = true;
            floor.position.y = -1;
            this.scene.add(floor);

            this.renderer = new THREE.WebGLRenderer({
                antialias: true,
            }); // 创建渲染器，第一个场景，第二个渲染器
            this.renderer.setSize(1000, 800);
            this.renderer.shadowMap.enabled = true;
            this.renderer.setPixelRatio(window.devicePixelRatio);

            container.appendChild(this.renderer.domElement); // 插入渲染器

            // Add controls
            this.controls = new OrbitControls(
                this.camera,
                this.renderer.domElement
            );
            this.controls.maxPolarAngle = Math.PI / 2;
            this.controls.minPolarAngle = Math.PI / 3;
            this.controls.enableDamping = true;
            this.controls.enablePan = false;
            this.controls.dampingFactor = 0.1;
            this.controls.autoRotate = false; // Toggle this if you'd like the chair to automatically rotate
            this.controls.autoRotateSpeed = 0.2; // 30
        },
        animate: function() {
            // 渲染更新
            this.controls.update();
            this.renderer.render(this.scene, this.camera);
            requestAnimationFrame(this.animate);
            // if (resizeRendererToDisplaySize(this.renderer)) {
            //     const canvas = this.renderer.domElement;
            //     this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
            //     this.camera.updateProjectionMatrix();
            // }

            if (this.theModel != null && this.loaded == false) {
                this.initialRotation();
                document
                    .getElementById('js-drag-notice')
                    .classList.add('start');
            }
        },
    },
    mounted() {
        this.init();
        this.animate();
    },
};
</script>

<style lang="css">
#js-tray-slide {
    display: flex;
}
.tray__swatch {
    height: 50px;
    width: 50px;
}
.options {
    display: flex;
}
.option {
    width: 50px;
}
</style>
