let venusArrow, earthArrow, marsArrow, venusArrowPos, earthArrowPos, marsArrowPos, venusPosition, earthPosition, marsPosition, cameraAngle;

function navigation(planet) {
    cameraAngle = new THREE.Vector3(0, 0, 0);

    switch(planet) {
        case "Venus":
            venusPosition = new THREE.Vector3(0, 0, 0);
            earthPosition = new THREE.Vector3(3109.245, 0, 0);
            marsPosition = new THREE.Vector3(7787.082, 0, 0);
            break;
        case "Earth":
            venusPosition = new THREE.Vector3(-3109.245, 0, 0);
            earthPosition = new THREE.Vector3(0, 0, 0);
            marsPosition = new THREE.Vector3(4677.837, 0, 0);
            break;
        case "Mars":
            venusPosition = new THREE.Vector3(-7787.082, 0, 0);
            earthPosition = new THREE.Vector3(-4677.837, 0, 0);
            marsPosition = new THREE.Vector3(0, 0, 0);
            break;
    }

    let origin = new THREE.Vector3(0, 0, 0);
    venusArrowPos = new THREE.Vector3(-0.2, -0.3, -1); // since the arrow position is moved, need to adjust for that
    let direction = venusArrowPos.normalize().sub(origin);

    venusArrow = new THREE.ArrowHelper(direction.normalize(), origin, 0.1, 0xFFFFFF);
    venusArrow.position.set(-0.2, -0.3, -1);
    camera.add(venusArrow);



    earthArrowPos = new THREE.Vector3(0, -0.3, -1);
    direction = earthArrowPos.normalize().sub(origin);

    earthArrow = new THREE.ArrowHelper(direction.normalize(), origin, 0.1, 0xFFFFFF);
    earthArrow.position.set(0, -0.3, -1);
    camera.add(earthArrow);



    marsArrowPos = new THREE.Vector3(0.2, -0.3, -1);
    direction = marsArrowPos.normalize().sub(origin);

    marsArrow = new THREE.ArrowHelper(direction.normalize(), origin, 0.1, 0xFFFFFF);
    marsArrow.position.set(0.2, -0.3, -1);
    camera.add(marsArrow);
}

function updateArrows() {
    camera.getWorldDirection(cameraAngle);

    let direction = venusArrowPos.clone().sub(venusPosition.clone().sub(camera.position).normalize().sub(cameraAngle).normalize());
    venusArrow.setDirection(direction);
    venusArrow.rotateX(Math.PI);

    direction = earthArrowPos.clone().sub(earthPosition.clone().sub(camera.position).normalize().sub(cameraAngle).normalize());
    earthArrow.setDirection(direction);
    earthArrow.rotateX(Math.PI);

    direction = marsArrowPos.clone().sub(marsPosition.clone().sub(camera.position).normalize().sub(cameraAngle).normalize());
    marsArrow.setDirection(direction);
    marsArrow.rotateX(Math.PI);
}