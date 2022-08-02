let camera, scene, renderer, raycaster, controls, mouse, light, planets;

function init() {
    scene = new THREE.Scene();

    planets = [];

    let width = window.innerWidth;
    let height = window.innerHeight;

    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 250000);
    camera.position.z = 1000;
    scene.add(camera);

    scene.add(new THREE.AmbientLight(0x050505));

    light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(-100,0,0);
    scene.add(light);

    renderer = new THREE.WebGLRenderer({ alpha: 1, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.maxDistance = 25000;
    controls.listenToKeyEvents(window);
    controls.screenSpacePanning = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.keyPanSpeed = 10;

    document.body.appendChild(renderer.domElement);
}

function loadSpace() {
    let loader = new THREE.TextureLoader();

    starfield = new THREE.Mesh(
        new THREE.SphereGeometry(100000, 100, 100), 
        new THREE.MeshBasicMaterial({
            map: loader.load('images/starmap.jpg'),
            //map: loader.load('images/starmap-4k.jpg'),
            side: THREE.BackSide
        })
    );

    scene.add(starfield);

    let fontLoader = new THREE.FontLoader();

    fontLoader.load( 'fonts/comfortaa_light.json', function (font) {
        let geometry = new THREE.TextGeometry('Venus', {
            font: font,
            size: 50,
            height: 10,
        });
        let material = new THREE.MeshBasicMaterial({
            color: 0xFFFFFF
        });
    
        let venus = new THREE.Mesh(geometry, material);
        venus.position.set(-3109.245, 0, 0);
        venus.userData = { URL: "venus.html"};

        planets.push(venus);
        scene.add(venus);

        geometry = new THREE.TextGeometry('Earth', {
            font: font,
            size: 50,
            height: 10,
        });

        let earth = new THREE.Mesh(geometry, material);
        earth.position.set(0, 0, 0);
        earth.userData = { URL: "earth.html"};

        planets.push(earth);
        scene.add(earth);

        geometry = new THREE.TextGeometry('Mars', {
            font: font,
            size: 50,
            height: 10,
        });

        let mars = new THREE.Mesh(geometry, material);
        mars.position.set(4677.837, 0, 0);
        mars.userData = { URL: "mars.html"};

        planets.push(mars);
        scene.add(mars);
    });
}

function animate() {
    renderer.render(scene, camera);
    controls.update();

    requestAnimationFrame(animate);
}

window.addEventListener('load', () => {
    init();
    loadSpace();
    animate();
});