// scaled numbers
// -3109.245 on x-axis (using the perihelion for all planets)
// 0.47495 radius
let venus, halo;

function loadVenus() {
    let material = new THREE.MeshPhongMaterial();
    material.map = loader.load('images/venus-texture.jpg');
    material.bumpMap = loader.load('images/venus-bump-map.png');
    material.bumpScale = 0.002;
    material.shininess = 15;

    let geometry = new THREE.SphereGeometry(0.47495, 100, 100);

    let axis = new THREE.Vector3(0, 0, 1).normalize();
    venus = new THREE.Mesh(geometry, material);
    venus.rotateOnAxis(axis, -3.0955);

    scene.add(venus);

    let atmosphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.47595, 100, 100),
        new THREE.MeshLambertMaterial({
            color: 0xFFFFF0,
            transparent: true,
            opacity: 0.3
        })
    )

    scene.add(atmosphere);

    let haloMaterial = new THREEx.createAtmosphereMaterial();
    haloMaterial.uniforms.glowColor.value = new THREE.Color(0xFFF0E0);
	haloMaterial.uniforms.coeficient.value = 0.8;
	haloMaterial.uniforms.power.value = 4;

    halo = new THREE.Mesh(
        new THREE.SphereGeometry(0.47895, 100, 100),
        haloMaterial
    );
    
    scene.add(halo);
}

function animate() {
    renderer.render(scene, camera);
    controls.update();

    venus.rotateY(rotateAmount() * 0.0041);

    updateArrows();

    requestAnimationFrame(animate);
}

window.addEventListener('load', () => {
    init();
    loadVenus();
    loadSpace("Venus");
    navigation("Venus");
    animate();
});