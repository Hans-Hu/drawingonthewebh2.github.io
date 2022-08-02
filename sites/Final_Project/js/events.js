window.addEventListener('resize', onWindowResize);

document.addEventListener('mousemove', onMouseMove, false);
document.addEventListener('pointerdown', onMouseDown, false);
document.addEventListener('pointerup', onMouseUp, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

let intersects, onObject = false;

function onMouseMove(event) {
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    intersects = raycaster.intersectObjects(planets);
    if (intersects.length > 0) {
        document.body.style.cursor = "pointer";
    } else {
        document.body.style.cursor = "default";
    }
}

function onMouseDown() {
    raycaster.setFromCamera(mouse, camera);
    intersects = raycaster.intersectObjects(planets);
    if (intersects.length > 0) {
        onObject = true;
    }
}

function onMouseUp() {
    raycaster.setFromCamera(mouse, camera);
    intersects = raycaster.intersectObjects(planets);
    if (intersects.length > 0 && onObject) {
        window.open(intersects[0].object.userData.URL, "_self");
    }
    onObject = false;
}