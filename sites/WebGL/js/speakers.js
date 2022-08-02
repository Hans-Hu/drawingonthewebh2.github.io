let camera, scene, renderer, controls, light, loader, diaphragm;

function init() {
    scene = new THREE.Scene();

    let width = window.innerWidth;
    let height = window.innerHeight;

    camera = new THREE.PerspectiveCamera(12, width / height, 25, 1000);
    camera.position.set(0, 0, 27);
    scene.add(camera);

    scene.add(new THREE.AmbientLight(0x444444));

    light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 10, 0);
    scene.add(light);

    light = new THREE.DirectionalLight(0xffffff, 0.2);
    light.position.set(0, 0, 10);
    scene.add(light);

    light = new THREE.DirectionalLight(0xffffff, 0.2);
    light.position.set(0, -10, 0);
    scene.add(light);

    light = new THREE.DirectionalLight(0xffffff, 0.2);
    light.position.set(-10, 0, 0);
    scene.add(light);

    light = new THREE.DirectionalLight(0xffffff, 0.2);
    light.position.set(10, 0, 0);
    scene.add(light);

    light = new THREE.PointLight(0xffffff, 1);
    light.position.set(-4, 2, 6);
    scene.add(light);

    light = new THREE.PointLight(0xffffff, 1);
    light.position.set(4, 2, 6);
    scene.add(light);

    light = new THREE.PointLight(0xffffff, 1);
    light.position.set(0, 0, -25);
    scene.add(light);

    renderer = new THREE.WebGLRenderer({ alpha: 1, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio); // scale for device resolution
    renderer.setSize(width, height);

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    loader = new THREE.GLTFLoader();

    diaphragm = [];

    document.body.appendChild(renderer.domElement);
}

function modelLoader(url) {
    return new Promise((resolve, reject) => {
        loader.load(url, data => resolve(data), null, reject);
    });
}

let prevHeight = 0;

function animate() {
    renderer.render(scene, camera);
    controls.update();

    analyser.getByteTimeDomainData(dataArray);

    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
    }
    let height = (sum / dataArray.length - 128) / 1000 * audio.volume;

    for (let i = 0; i < diaphragm.length; i++) {
        diaphragm[i].position.y -= height - prevHeight;
    }
    
    prevHeight = height;

    requestAnimationFrame(animate);
}

async function speaker() {
    let gltf = await modelLoader('media/speaker/scene.gltf');

    let model = gltf.scene;
    model.position.y = -1;
    scene.add(model);
    model.traverse(n => {
        if (n.isMesh && (n.name == "mesh_1" || n.name == "mesh_2"))
            diaphragm.push(n);
        }
    );
    return model;
}

window.addEventListener('load', async () => {
    init();
    speaker1 = await speaker();
    speaker2 = await speaker();
    speaker1.position.x = 3;
    speaker2.position.x = -3;
    animate();
})

window.addEventListener('resize', () => {
    camera.aspect = (window.innerWidth / window.innerHeight);
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight)
});