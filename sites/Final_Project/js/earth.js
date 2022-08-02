let earth, clouds, clouds2, halo;

function loadEarth() {
    let material = new THREE.MeshPhongMaterial();
    material.map = loader.load('images/earth-texture.jpg');
    material.bumpMap = loader.load('images/earth-bump-map.jpg');
    material.bumpScale = 0.002;
    material.specularMap = loader.load('images/water.png');
    material.specular = new THREE.Color(0x333333);
    material.shininess = 15;

    let geometry = new THREE.SphereGeometry(0.5, 100, 100);

    let axis = new THREE.Vector3(0, 0, 1).normalize();
    earth = new THREE.Mesh(geometry, material);
    earth.rotateOnAxis(axis, -0.40909);

    scene.add(earth);

    clouds = new THREE.Mesh(
        new THREE.SphereGeometry(0.5005, 100, 100),
        new THREE.MeshPhongMaterial({
            map: loader.load('images/clouds.png'),
            transparent: true
        })
    );

    clouds.rotateOnAxis(axis, -0.40909);

    scene.add(clouds);

    clouds2 = new THREE.Mesh(
        new THREE.SphereGeometry(0.501, 100, 100),
        new THREE.MeshPhongMaterial({
            map: loader.load('images/clouds2.png'),
            transparent: true,
            opacity: 0.4
        })
    );

    clouds2.rotateOnAxis(axis, -0.40909);

    scene.add(clouds2);

    let haloMaterial = new THREEx.createAtmosphereMaterial();
    haloMaterial.uniforms.glowColor.value = new THREE.Color(0xE0F0FF);
	haloMaterial.uniforms.coeficient.value = 0.8;
	haloMaterial.uniforms.power.value = 4;

    halo = new THREE.Mesh(
        new THREE.SphereGeometry(0.504, 100, 100),
        haloMaterial
    );
    
    scene.add(halo);
}

function animate() {
    renderer.render(scene, camera);
    controls.update();

    amount = rotateAmount();
    earth.rotateY(amount);
    clouds.rotateY(amount * 1.1);
    clouds2.rotateY(amount * 0.85);

    updateArrows();

    requestAnimationFrame(animate);
}

window.addEventListener('load', () => {
    init();
    loadEarth();
    loadSpace("Earth");
    navigation("Earth");
    animate();
});