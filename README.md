## Three JS Jorney Course

<details>
<summary>&nbsp;03 - Creating a Basic Scene</summary>

- Creating objects with materials and geometries.
- Adding objects to the scene.
- Adding a camera to the scene.
    - Moving the camera.
- Creating a canvas to render the scene.
- Adding a renderer to the canvas.

![](https://i.imgur.com/vrN5kCo.png)

</details>
04 - Local Server / Vite
<details>
<summary>&nbsp;05 - Transform objects</summary>

- Moving objects.
```js
    Object.position.set(x, y, z)
    // x - left and right
    // y - up and down
    // z - forward and backward
```
- Axes helper.
```js
    const axesHelper = new THREE.AxesHelper(5)
    scene.add(axesHelper)
```
- Scaling objects.
```js
    Object.scale.set(x, y, z)
```
- Rotating objects.
```js
    mesh.rotation.reorder('YXZ')
    // To rotate in the order of Y, X and Z
    // To avoid the gimbal lock

    Object.rotation.set(x, y, z)
    // Math.PI = 180º
```
- Pointing objects.
```js
    camera.lookAt(mesh.position)
    // Point the camera to the object
```
- Grouping objects.
```js
    const group = new THREE.Group()
    scene.add(group)

    group.add(mesh1, mesh2, mesh3)
    // Add objects to the group
```
![](https://i.imgur.com/HeMqFqS.png)

</details>
