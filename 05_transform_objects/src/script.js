import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 'cyan' })
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

// Position
// console.log(mesh.position.length())
// mesh.position.normalize() // length = 1
// mesh.position.x = 1
// mesh.position.y = -0.6
// mesh.position.z = 0.5
// mesh.position.set(1, -1.6, 0.5)

// Scale
// mesh.scale.x = 2;
// mesh.scale.y = 2;
// mesh.scale.z = 3;
// mesh.scale.set(2, 0.5, 0.5)

// Rotation
// mesh.rotation.reorder('YXZ')
// mesh.rotation.set(1, Math.PI / 2, Math.PI / 2)
// mesh.rotation.set(0, 0, 0)

// Axes helper
const axesHelper = new THREE.AxesHelper(50)
scene.add(axesHelper)

// Group
const group = new THREE.Group()
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 'red' })
)
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 'green' })
)
cube2.position.set(2, 0, 0)
const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 'blue' })
)
cube3.position.set(-2, 0, 0)
group.add(cube1, cube2, cube3)
group.scale.set(4, 4, 4)
group.rotation.set(1, 1, 0)


/** 
 * Sizes
*/
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.set(10, 10, 20)
camera.lookAt(group.position)

// camera.position.z = 3
// camera.position.y = 1
// camera.position.x = 1
// camera.position.set(3, 1, 7)
// camera.lookAt(mesh.position)
scene.add(camera)

// console.log(mesh.position.distanceTo(camera.position))


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)