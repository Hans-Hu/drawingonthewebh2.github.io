// scaled numbers
// 4677.837 on x-axis (using the perihelion for all planets)
// 0.266 radius
let mars, halo;

function loadMars() {
    let material = new THREE.MeshPhongMaterial();
    material.map = loader.load('images/mars-texture.jpg');
    material.bumpMap = loader.load('images/mars-bump-map.png');
    material.bumpScale = 0.002;
    material.shininess = 5;

    let geometry = new THREE.SphereGeometry(0.266, 100, 100);

    let axis = new THREE.Vector3(0, 0, 1).normalize();
    mars = new THREE.Mesh(geometry, material);
    mars.rotateOnAxis(axis, -0.4396);

    scene.add(mars);

    let haloMaterial = new THREEx.createAtmosphereMaterial();
    haloMaterial.uniforms.glowColor.value = new THREE.Color(0xFFD0D0);
	haloMaterial.uniforms.coeficient.value = 0.8;
	haloMaterial.uniforms.power.value = 4;

    halo = new THREE.Mesh(
        new THREE.SphereGeometry(0.267, 100, 100),
        haloMaterial
    );
    
    scene.add(halo);
}

function animate() {
    renderer.render(scene, camera);
    controls.update();

    mars.rotateY(rotateAmount() * 0.972);

    updateArrows();

    requestAnimationFrame(animate);
}

window.addEventListener('load', () => {
    init();
    loadMars();
    loadSpace("Mars");
    navigation("Mars");
    animate();
});