import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Textures
 */
// const image = new Image();
// const texture = new THREE.Texture(image);
// image.onload = () => {
//     texture.needsUpdate = true;
// };
// image.src = "/textures/door/color.jpg";

const loadingManager = new THREE.LoadingManager();
// loadingManager.onStart = () => {
//   console.log("onStart");
// };
// loadingManager.onLoad = () => {
//   console.log("onLoaded");
// };
// loadingManager.onProgress = () => {
//   console.log("onProgress");
// };
// loadingManager.onError = () => {
//   console.log("onError");
// };
const textureLoader = new THREE.TextureLoader(loadingManager);
// const colorTexture = textureLoader.load("/textures/door/color.jpg");
const colorTexture = textureLoader.load("/textures/minecraft.png");
// const colorTexture = textureLoader.load("/textures/checkerboard-8x8.png");
// const colorTexture = textureLoader.load(
//   "/textures/checkerboard-1024x1024.png"
// );
const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const heightTexture = textureLoader.load("/textures/door/height.jpg");
const normalTexture = textureLoader.load("/textures/door/normal.jpg");
const ambientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg");

// Repeat
colorTexture.repeat.x = 2;
colorTexture.repeat.y = 3;
// Wrap
colorTexture.wrapS = THREE.MirroredRepeatWrapping;
colorTexture.wrapT = THREE.MirroredRepeatWrapping;
// Offset
// colorTexture.offset.x = 0.5;
// colorTexture.offset.y = 0.5;
// Rotation
// colorTexture.rotation = Math.PI * 0.25;
// Center
// colorTexture.center.x = 0.5;
// colorTexture.center.y = 0.5;

// Disabling mipmaps if using nearest filter
colorTexture.generateMipmaps = false;

// Minification filter
colorTexture.minFilter = THREE.NearestFilter;

// Magnification filter
colorTexture.magFilter = THREE.NearestFilter;

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
// const geometry = new THREE.SphereGeometry(1, 32, 32);
console.log(geometry.attributes.uv);
const material = new THREE.MeshBasicMaterial({ map: colorTexture });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

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
camera.position.z = 1;
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

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
