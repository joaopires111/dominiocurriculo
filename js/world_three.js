//IMPORTS
import * as THREE from 'three';
import { GLTFLoader } from 'gtlf';
import { OrbitControls } from 'orbit';
const duneUrl = new URL('../assets/models/dune2.gltf', import.meta.url);

//VARIABLES
const renderer = new THREE.WebGLRenderer();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
const ambientlight = new THREE.AmbientLight(0xffffff, 0.5);
const directionlight1 = new THREE.DirectionalLight(0xffffff, 0.8);
const dlighthelper1 = new THREE.CameraHelper(directionlight1.shadow.camera);
const assetLoader = new GLTFLoader();
const axis = new THREE.Vector3(1,0,0);
const controls = new OrbitControls(camera, renderer.domElement);

//CODE
function StartRenderer() {
    renderer.shadowMap.enabled = true;
    //renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Optional: Use a softer shadow type
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x040016);
    document.body.appendChild(renderer.domElement);
}
StartRenderer();

function CameraAndScene() {
    camera.position.set(0, 2, 2);
    //camera.lookAt(scene.position);
    //camera.setRotationFromAxisAngle(axis, -0.25*Math.PI);
}
CameraAndScene();

function lightsAndEffects() {
    scene.add(ambientlight);
    scene.add(directionlight1);
    //scene.add(dlighthelper1);

    directionlight1.position.set(-3, 5, 0);
    directionlight1.castShadow = true;

    scene.fog = new THREE.FogExp2(0xffffff, 0.03);
/*     const loader = new THREE.TextureLoader();
    loader.load('assets/img/rosa.jpg', function(texture) {
    scene.background = texture;
}); */
}
lightsAndEffects();

function GLTFloader() {

    assetLoader.load(duneUrl.href, function (gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.receiveShadow = true;
            }
        });
        gltf.scene.position.set(0, 0, 0);
        gltf.scene.scale.set(0.2, 0.2, 0.2);
        scene.add(gltf.scene);
    }, undefined, function (error) {
        console.error(error);
    });
}
GLTFloader();

function animate(){
    //width: 1536 Screen Height: 864
    renderer.render(scene, camera);
}

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})

renderer.setAnimationLoop(animate);