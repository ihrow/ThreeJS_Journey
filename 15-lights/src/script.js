import * as dat from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";
/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Lights
 */

// ======================
// Ambient Light
// ======================
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// ambientLight.color = new THREE.color(...)
// ambientLight.intensity = 0.5
ambientLight.visible = false;
scene.add(ambientLight);

const ambLightDebugFolder = gui.addFolder("Ambient Light").close();
ambLightDebugFolder.add(ambientLight, "intensity").min(0).max(1).step(0.01);
ambLightDebugFolder.add(ambientLight, "visible");

// ======================
// Directional Light
// ======================
const directionalLight = new THREE.DirectionalLight("cyan");
directionalLight.visible = false;
directionalLight.position.set(1, 0.5, 0);
scene.add(directionalLight);

const dirLightDebugFolder = gui.addFolder("Directional Light").close();
dirLightDebugFolder.add(directionalLight.position, "x").min(0).max(5).step(0.1);
dirLightDebugFolder.add(directionalLight.position, "y").min(0).max(5).step(0.1);
dirLightDebugFolder.add(directionalLight.position, "z").min(0).max(5).step(0.1);
dirLightDebugFolder.add(directionalLight, "visible");

// ======================
// Hemisphere Light
// ======================
const hemisphereLight = new THREE.HemisphereLight(0xe38282, 0x470cc4, 1);
hemisphereLight.visible = true;
scene.add(hemisphereLight);

const hemLightDebugFolder = gui.addFolder("Hemisphere Light").close();
hemLightDebugFolder.addColor(hemisphereLight, "color");
hemLightDebugFolder.addColor(hemisphereLight, "groundColor");
hemLightDebugFolder.add(hemisphereLight, "visible");

// ======================
// Point Light
// ======================
const pointLight = new THREE.PointLight(0xff9000, 0.5);
pointLight.visible = false;
scene.add(pointLight);

const pointLightDebugFolder = gui.addFolder("Point Light").close();
pointLightDebugFolder.add(pointLight.position, "x").min(0).max(5).step(0.1);
pointLightDebugFolder.add(pointLight.position, "y").min(0).max(5).step(0.1);
pointLightDebugFolder.add(pointLight.position, "z").min(0).max(5).step(0.1);
pointLightDebugFolder.add(pointLight, "intensity").min(0).max(1).step(0.01);
pointLightDebugFolder.add(pointLight, "distance").min(0).max(10).step(0.1);
pointLightDebugFolder.add(pointLight, "decay").min(0).max(10).step(0.1);
pointLightDebugFolder.add(pointLight, "visible");

// ======================
// Rect Area Light
// (only works with MeshStandartMaterial | MeshPhysicalMaterial)
// ======================
const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 5, 1, 1);
rectAreaLight.visible = false;
rectAreaLight.position.angleTo(new THREE.Vector3());
scene.add(rectAreaLight);
const rectLightDebugFolder = gui.addFolder("Rect Area Light").close();
rectLightDebugFolder.addColor(rectAreaLight, "color");
const rectLightPosFolder = rectLightDebugFolder.addFolder("position");
rectLightPosFolder.add(rectAreaLight.position, "x").min(-1).max(15).step(0.1);
rectLightPosFolder.add(rectAreaLight.position, "y").min(-1).max(15).step(0.1);
rectLightPosFolder.add(rectAreaLight.position, "z").min(-1).max(15).step(0.1);
const rectLightRotFolder = rectLightDebugFolder.addFolder("rotation");
rectLightRotFolder
  .add(rectAreaLight.rotation, "x")
  .min(-Math.PI)
  .max(Math.PI)
  .step(0.1);
rectLightRotFolder
  .add(rectAreaLight.rotation, "y")
  .min(-Math.PI)
  .max(Math.PI)
  .step(0.1);
rectLightRotFolder
  .add(rectAreaLight.rotation, "z")
  .min(-Math.PI)
  .max(Math.PI)
  .step(0.1);
rectLightDebugFolder.add(rectAreaLight, "intensity").min(0).max(10).step(0.1);
rectLightDebugFolder.add(rectAreaLight, "width").min(0).max(10).step(0.1);
rectLightDebugFolder.add(rectAreaLight, "height").min(0).max(10).step(0.1);
rectLightDebugFolder.add(rectAreaLight, "visible");

// ======================
// Spot Light
// ======================
const spotLight = new THREE.SpotLight(0x78ff0, 0.5, 10, Math.PI * 0.1, 0.25, 1);
spotLight.visible = false;
spotLight.position.set(0, 2, 3);
const spotLightDebugFolder = gui.addFolder("Spot Light").close();
spotLightDebugFolder.addColor(spotLight, "color");
spotLightDebugFolder.add(spotLight.position, "x").min(-1).max(15).step(0.1);
spotLightDebugFolder.add(spotLight.position, "y").min(-1).max(15).step(0.1);
spotLightDebugFolder.add(spotLight.position, "z").min(-1).max(15).step(0.1);
spotLightDebugFolder.add(spotLight, "intensity").min(0).max(10).step(0.1);
spotLightDebugFolder.add(spotLight, "distance").min(0).max(10).step(0.1);
spotLightDebugFolder.add(spotLight, "angle").min(0).max(1).step(0.001);
spotLightDebugFolder.add(spotLight, "penumbra").min(0).max(1).step(0.001);
spotLightDebugFolder.add(spotLight, "decay").min(0).max(10).step(0.1);
spotLightDebugFolder.add(spotLight, "visible");
scene.add(spotLight);
const spotLightTarget = gui.addFolder("Spot Light Target").close();
spotLightTarget.add(spotLight.target.position, "x").min(-1).max(15).step(0.1);
spotLightTarget.add(spotLight.target.position, "y").min(-1).max(15).step(0.1);
spotLightTarget.add(spotLight.target.position, "z").min(-1).max(15).step(0.1);
scene.add(spotLight.target);

/**
 * Light Helpers
 */
const hemisphereLightHelper = new THREE.HemisphereLightHelper(
  hemisphereLight,
  0.2
);
hemisphereLightHelper.visible = false;
scene.add(hemisphereLightHelper);

const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  0.2
);
directionalLightHelper.visible = false;
scene.add(directionalLightHelper);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
pointLightHelper.visible = false;
scene.add(pointLightHelper);

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
spotLightHelper.visible = false;
scene.add(spotLightHelper);

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
rectAreaLightHelper.visible = false;
scene.add(rectAreaLightHelper);

const helpersFolder = gui.addFolder("Helpers");
helpersFolder.add(hemisphereLightHelper, "visible").name("Hemisphere Light");
helpersFolder.add(directionalLightHelper, "visible").name("Directional Light");
helpersFolder.add(pointLightHelper, "visible").name("Point Light");
helpersFolder.add(spotLightHelper, "visible").name("Spot Light");
helpersFolder.add(rectAreaLightHelper, "visible").name("Rect Area Light");

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;

// Objects
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.position.x = -1.5;

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 32, 64),
  material
);
torus.position.x = 1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

scene.add(sphere, cube, torus, plane);

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
  sphere.rotation.y = 0.1 * elapsedTime;
  cube.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  cube.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
