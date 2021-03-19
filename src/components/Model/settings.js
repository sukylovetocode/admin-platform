import * as THREE from 'three';
export const COLORS = [
    {
        texture: 'http://localhost:8080/fabric_.jpg',
        size: [4, 4, 4],
        shininess: 10,
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
];

export const BACKGROUND_COLOR = 0xf1f1f1;
//切记 要想能够成功覆盖材质，必须在blender中渲染以及实现UV贴图后导出
export const MODEL_PATH = 'http://localhost:8080/chair004.glb';
// 初始化材质
const INITIAL_BOTTOM_MTL = new THREE.MeshPhongMaterial({
    color: 0x7c6862,
    shininess: 20,
});
const INITIAL_BACK_MTL = new THREE.MeshPhongMaterial({
    color: 0x131417,
    shininess: 20,
});
const INITIAL_SIT_MTL = new THREE.MeshPhongMaterial({
    color: 0xf8d5c4,
    shininess: 20,
});
export const INITIAL_MAP = [
    { childID: 'bottom', mtl: INITIAL_BOTTOM_MTL },
    { childID: 'back', mtl: INITIAL_BACK_MTL },
    { childID: 'sit', mtl: INITIAL_SIT_MTL },
];
