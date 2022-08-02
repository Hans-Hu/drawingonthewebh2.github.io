let camera, scene, renderer, raycaster, controls, starfield, light, planets, loader, date, mouse;

let rotateAmount = () => date.getTime() * 0.000000000000001 * (Math.max(temperature, 0) + 20) / 40;

function init() {
    getTemperature();

    scene = new THREE.Scene();

    date = new Date()

    planets = [];

    let width = window.innerWidth;
    let height = window.innerHeight;

    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 250000);
    camera.position.z = 4;
    scene.add(camera);

    scene.add(new THREE.AmbientLight(0x050505));

    light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(-100,0,0);
    scene.add(light);

    renderer = new THREE.WebGLRenderer({ alpha: 1, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    raycaster = new THREE.Raycaster();

    loader = new THREE.TextureLoader();

    mouse = new THREE.Vector2();

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.minDistance = 1.4;
    controls.maxDistance = 50;
    controls.listenToKeyEvents(window);
    controls.screenSpacePanning = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.15;
    controls.keyPanSpeed = 1000; // ~3 times the speed of light in this scale

    document.body.appendChild(renderer.domElement);
}

function loadSpace(planet) {
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
        let material = new THREE.MeshBasicMaterial({
            color: 0xFFFFFF
        });

        let venus, earth, mars;
        if (planet != "Venus") {
            venus = new THREE.Mesh(
                new THREE.TextGeometry('Venus', {
                    font: font,
                    size: 0.5,
                    height: 0.1,
                }),
                material
            );
            venus.userData = { URL: "venus.html"};
            planets.push(venus);
            scene.add(venus);
        }
        if (planet != "Earth") {
            earth = new THREE.Mesh(
                new THREE.TextGeometry('Earth', {
                    font: font,
                    size: 0.5,
                    height: 0.1,
                }),
                material
            );
            earth.userData = { URL: "earth.html"};
            planets.push(earth);
            scene.add(earth);
        }
        if (planet != "Mars") {
            mars = new THREE.Mesh(
                new THREE.TextGeometry('Mars', {
                    font: font,
                    size: 0.5,
                    height: 0.1,
                }),
                material
            );
            mars.userData = { URL: "mars.html"};
            planets.push(mars);
            scene.add(mars);
        }

        switch(planet) {
            case "Venus":
                earth.position.set(3109.245, 0, -1);
                earth.rotation.y = -Math.PI / 2;

                mars.position.set(7787.082, 0, -1);
                mars.rotation.y = -Math.PI / 2;
                break;
            case "Earth":
                venus.position.set(-3109.245, 0, 1);
                venus.rotation.y = Math.PI / 2;

                mars.position.set(4677.837, 0, -1);
                mars.rotation.y = -Math.PI / 2;
                break;
            case "Mars":
                venus.position.set(-7787.082, 0, 1);
                venus.rotation.y = Math.PI / 2;

                earth.position.set(-4677.837, 0, 1);
                earth.rotation.y = Math.PI / 2;
                break;
        }
    });
}