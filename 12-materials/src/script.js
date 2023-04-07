import * as dat from "dat.gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Debug Panel
 */
const gui = new dat.GUI();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientcOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
const matcapTexture = textureLoader.load("/textures/matcaps/1.png");
const gradientTexture = textureLoader.load("/textures/gradients/5.jpg");
gradientTexture.minFilter = THREE.NearestFilter;
gradientTexture.magFilter = THREE.NearestFilter;
gradientTexture.generateMipmaps = false;

/**
 * Environment Map
 */
const cubeTextureLoader = new THREE.CubeTextureLoader();
const environmentMapTexture = cubeTextureLoader.load([
  "/textures/environmentMaps/0/px.jpg",
  "/textures/environmentMaps/0/nx.jpg",
  "/textures/environmentMaps/0/py.jpg",
  "/textures/environmentMaps/0/ny.jpg",
  "/textures/environmentMaps/0/pz.jpg",
  "/textures/environmentMaps/0/nz.jpg",
]);

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Materials
 */

// =====================
// Basic Material
// =====================
// const material = new THREE.MeshBasicMaterial();
// material.color.set(...)

// true | false;
// material.wireframe = true; // debug
// material.opacity = 0.5; // 0 - 1
// material.transparent = true; // true | false
// material.alphaMap = doorAlphaTexture; // alpha map
// material.map = doorColorTexture; // texture

// material.side - Which side of the face to render
// material.side = THREE.DoubleSide; // SingleSide | DoubleSide | BackSide

// const material = new THREE.MeshNormalMaterial(); // debug normals
// material.flatShading = true;

// =====================
// Matcap Material
// =====================
// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;

// =====================
// Depth Material
// =====================
// const material = new THREE.MeshDepthMaterial();

// =====================
// Lambert Material
// =====================
// const material = new THREE.MeshLambertMaterial();

// =====================
// Phong Material
// =====================
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;
// material.specular = new THREE.Color("blue");

// =====================
// Toon Material
// =====================
// const material = new THREE.MeshToonMaterial();
// material.gradientMap = gradientTexture;

// =====================
// Standart Material
// =====================
const material = new THREE.MeshStandardMaterial();

/**
 * Custom metalness and roughness values
 */
material.metalness = 0.45; // dont use with metalness map
material.roughness = 0.45; // dont use with roughness map
material.transparent = true;

/**
 * Basic Material
 */
material.map = doorColorTexture;

/**
 * Ambient Occlusion Map
 */
material.aoMap = doorAmbientcOcclusionTexture;
material.aoMapIntensity = 1;

/**
 * Displacement Map
 */
material.displacementMap = doorHeightTexture;
material.displacementScale = 0.03;

/**
 * Metalness Map
 */
material.metalnessMap = doorMetalnessTexture;

/**
 * Roughness Map
 */
material.roughnessMap = doorRoughnessTexture;

/**
 * Normal Map
 */
material.normalMap = doorNormalTexture;
const parameters = {
  x: 1,
  y: 1,
};
material.normalScale.set(parameters.x, parameters.y);

// Alpha Map
material.alphaMap = doorAlphaTexture;

// =====================
// Environmental Material
// =====================
// const material = new THREE.MeshStandardMaterial();
// material.metalness = 0.7;
// material.roughness = 0.2;
// material.envMap = environmentMapTexture;

gui.add(material, "roughness").min(0).max(1);
gui.add(material, "metalness").min(0).max(1);
gui.add(material, "aoMapIntensity").min(1).max(15);
gui.add(material, "displacementScale").min(0.01).max(0.2).step(0.01);
gui
  .add(parameters, "x")
  .min(1)
  .max(20)
  .step(0.1)
  .onChange(() => {
    material.normalScale.set(parameters.x, parameters.y);
  });
gui
  .add(parameters, "y")
  .min(1)
  .max(20)
  .step(0.1)
  .onChange(() => {
    material.normalScale.set(parameters.x, parameters.y);
  });

/**
 * Objects
 */
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material);
sphere.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
);

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material);
plane.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64, 128),
  material
);
torus.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
);

sphere.position.set(-1.5, 0, 0);
torus.position.set(1.5, 0, 0);
scene.add(sphere, plane, torus);

// Adding Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(2, 3, 4);
scene.add(ambientLight, pointLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  // sphere.rotation.set(0.15 * elapsedTime, 0.1 * elapsedTime, 0);
  // plane.rotation.set(0.15 * elapsedTime, 0.1 * elapsedTime, 0);
  // torus.rotation.set(0.15 * elapsedTime, 0.1 * elapsedTime, 0);

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
