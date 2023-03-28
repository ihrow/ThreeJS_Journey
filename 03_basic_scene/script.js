const scene = new THREE.Scene();

/*
    Geometry is the shape of the object. (box geometry)
    Material is the appearance of the object. (basic material)
*/
const geometry = new THREE.BoxGeometry(1, 1, 1); 
const material = new THREE.MeshBasicMaterial({
    color: 'cyan'
});

/*
    Mesh is a combination of geometry and material.
*/
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/*
    Sizes is an object that contains the width and height of the scene.
*/
const sizes = {
    width: 800,
    height: 600
}

/*
    Camera is a virtual camera that is used to view the scene.
    First parameter is the field of view (FOV) in degrees.
    Second parameter is the aspect ratio (width / height).
*/
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height); 
scene.add(camera);
camera.position.z = 3; // Move the camera back 3 units.
// camera.position.x = 1; // Move the camera right 1 unit.
// camera.position.y = 1; // Move the camera up 1 unit.

/*
    Renderer is used to render the scene.
    First parameter is the canvas element.
*/
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas
});
renderer.setSize(sizes.width, sizes.height); // Set the size of the renderer.
renderer.render(scene, camera); // Render the scene.

