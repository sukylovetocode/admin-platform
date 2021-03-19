<template>
    <div>
        <!-- These toggle the the different parts of the chair that can be edited, note data-option is the key that links to the name of the part in the 3D file -->
        <div class="options">
            <div
                :class="[
                    'option',
                    activeOption === 'back' ? '--is-active' : '',
                ]"
                data-option="back"
                @click="selectOption"
            >
                <img
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/legs.svg"
                    alt=""
                />
            </div>
            <div
                :class="['option', activeOption === 'sit' ? '--is-active' : '']"
                data-option="sit"
                @click="selectOption"
            >
                <img
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/cushions.svg"
                    alt=""
                />
            </div>
            <div
                :class="[
                    'option',
                    activeOption === 'bottom' ? '--is-active' : '',
                ]"
                data-option="bottom"
                @click="selectOption"
            >
                <img
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/base.svg"
                    alt=""
                />
            </div>
        </div>
        <div class="controls">
            <!-- This tray will be filled with colors via JS, and the ability to slide this panel will be added in with a lightweight slider script (no dependency used for this) -->
            <div id="js-tray" class="tray">
                <div id="js-tray-slide" class="tray__slide">
                    <div
                        class="tray__swatch"
                        v-for="(color, index) in COLORS"
                        :key="index"
                        :style="{
                            background: color.texture
                                ? 'url(' + color.texture + ')'
                                : '#' + color.color,
                        }"
                        @click="selectColor(color)"
                    ></div>
                </div>
            </div>
        </div>
        <div id="container"></div>
    </div>
</template>

<script>
// 依据：https://github.com/JChehe/blog/issues/44
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'; // 需要自己引入,官方提倡使用
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import {
    COLORS,
    INITIAL_MAP,
    BACKGROUND_COLOR,
    MODEL_PATH,
} from './settings.js';

export default {
    data() {
        this.COLORS = COLORS;
        return {
            renderer: null,
            model: null,
            initRotate: 0,
            activeOption: 'back',
        };
    },
    methods: {
        selectOption(e) {
            this.activeOption = e.currentTarget.dataset.option;
        },
        selectColor(color) {
            let new_mtl;

            if (color.texture) {
                let txt = new THREE.TextureLoader().load(color.texture);

                txt.repeat.set(color.size[0], color.size[1], color.size[2]);
                txt.wrapS = THREE.RepeatWrapping;
                txt.wrapT = THREE.RepeatWrapping;
                txt.encoding = THREE.sRGBEncoding;
                txt.flipY = false;

                new_mtl = new THREE.MeshPhongMaterial({
                    map: txt,
                    shininess: color.shininess ? color.shininess : 10,
                    //flatShading: true //glb的模型要加入这个参数，不然会渲染不出颜色c4d导出问题
                });
            } else {
                new_mtl = new THREE.MeshPhongMaterial({
                    color: parseInt('0x' + color.color),
                    shininess: color.shininess ? color.shininess : 10,
                });
            }
            this.setMaterial(this.model, this.activeOption, new_mtl);
        },
        setMaterial(parent, type, mtl) {
            parent.traverse((o) => {
                if (o.isMesh && o.nameID != null) {
                    if (o.nameID == type) {
                        o.material = mtl;
                    }
                }
            });
        },
        // Function - Add the textures to the models
        initColor(parent, type, mtl) {
            // 遍历
            parent.traverse((o) => {
                if (o.isMesh) {
                    if (o.name.includes(type)) {
                        o.material = mtl;
                        o.nameID = type; // Set a new property to identify this object
                    }
                }
            });
        },
        loadModel() {
            var that = this;
            // Init the object loader
            var loader = new GLTFLoader();

            loader.load(
                MODEL_PATH,
                function(gltf) {
                    that.model = gltf.scene;

                    // Set the models initial scale
                    that.model.scale.set(0.1, 0.1, 0.1);

                    // 旋转
                    that.model.rotation.y = Math.PI;

                    // Offset the y position a bit
                    that.model.position.y = -1;

                    // 设置接受投影
                    that.model.traverse((o) => {
                        if (o.isMesh) {
                            o.castShadow = true;
                            o.receiveShadow = true;
                        }
                    });

                    // 初始化材质
                    for (let object of INITIAL_MAP) {
                        that.initColor(that.model, object.childID, object.mtl);
                    }

                    // Add the model to the scene
                    that.scene.add(that.model);
                },
                undefined,
                function(error) {
                    console.error(error);
                }
            );
        },
        initScene() {
            // webgl构图
            this.container = document.getElementById('container'); // 获得容器

            /** 设置照相机 */
            let cameraFar = 5; // 设置一定距离保证其能够看到椅子

            this.camera = new THREE.PerspectiveCamera( // 正交照相机
                50,
                1920 / 1080,
                0.1,
                1000
            );
            this.camera.position.z = cameraFar;
            this.camera.position.x = 0;

            // 创建场景
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(BACKGROUND_COLOR);
            this.scene.fog = new THREE.Fog(BACKGROUND_COLOR, 50, 100);

            // Add lights
            var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
            hemiLight.position.set(0, 50, 0);
            // Add hemisphere light to scene
            this.scene.add(hemiLight);

            var dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
            dirLight.position.set(-8, 12, 8);
            dirLight.castShadow = true;
            dirLight.shadow.mapSize = new THREE.Vector2(2048, 2048);
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

            this.loadModel();

            this.renderer = new THREE.WebGLRenderer({
                antialias: true,
            }); // 创建渲染器，第一个场景，第二个渲染器
            this.renderer.setSize(1000, 800);
            this.renderer.shadowMap.enabled = true;
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.renderer.outputEncoding = THREE.sRGBEncoding;

            this.container.appendChild(this.renderer.domElement); // 插入渲染器

            // 增加旋转滚动控制
            this.controls = new OrbitControls(
                this.camera,
                this.renderer.domElement
            );
            this.controls.maxPolarAngle = Math.PI / 2;
            this.controls.minPolarAngle = Math.PI / 3;
            this.controls.enableDamping = true;
            this.controls.enablePan = false;
            this.controls.dampingFactor = 0.1;
            this.controls.autoRotate = true; // 设置true可让椅子自动旋转
            this.controls.autoRotateSpeed = 1; // 30
        },
        animate: function() {
            // 渲染更新
            this.controls.update();
            this.renderer.render(this.scene, this.camera);
            requestAnimationFrame(this.animate);
        },
    },
    mounted() {
        this.initScene();
        this.animate();
    },
};
</script>

<style lang="scss">
#js-tray-slide {
    display: flex;
}
.tray__swatch {
    height: 50px;
    width: 50px;
}
.options {
    display: flex;
    font-size: 0;
}
.option {
    width: 50px;
    margin: 10px;
    box-sizing: border-box;
    border: 2px solid transparent;
    img {
        width: calc(100% - 4px);
    }
}
.--is-active {
    border: 2px solid red;
}
</style>
