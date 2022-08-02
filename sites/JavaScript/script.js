let scene;
let polyhedrons;
let transforms = new Array(12);
for (let i = 0; i < transforms.length; i++) {
    transforms[i] = new Array(2);
}

function createTransforms() {
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 6; j++) {
            if (j == 0) transforms[j + 6 * i] = [0, 180 * i]
            else transforms[j + 6 * i] = [(180 + (j-1) * 72) % 360, 180 * (i + 1) - Math.acos(-Math.sqrt(5)/5) * (180/Math.PI)];
        }
    }
}


function init() {
    scene = document.querySelector("#scene");
    polyhedrons = document.querySelectorAll(".polyhedron");
    for (let i = 0; i < 2; i++) {
        let faces = polyhedrons[i].children;
        for (let j = 0; j < 12; j++) {
            faces[j].style.transform = `rotate(${transforms[j][0]}deg) rotateX(${transforms[j][1]}deg) translateZ(${8 + 4 * i}vw)`;
        }
    }
}

let centerX;
let centerY;

function centerCoordinate() {
    centerX = window.innerWidth / 2
    centerY = window.innerHeight / 2;
}

function rotationSpeed() {
    let scale = (window.innerWidth / window.screen.availWidth + window.innerHeight / window.screen.availHeight) / 2;
    polyhedrons[0].style['animation-duration'] = `${Math.max(Math.pow(11, scale) - 1, 1/120)}s`;
    polyhedrons[1].style['animation-duration'] = `${Math.max(11 - Math.pow(11, scale), 1/120)}s`;
}

function changePerspective(event) {
    let scale = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
    let distance = Math.sqrt(Math.pow(event.clientX - centerX, 2) + Math.pow(event.clientY - centerY, 2));
    let scaledDistance = distance / scale;
    scene.style.perspective = (32 - 16 * Math.pow(scaledDistance, 0.3)) + 'vw';
    for (let i = 0; i < 2; i++) {
        let faces = polyhedrons[i].children;
        for (let j = 0; j < 12; j++) {
            faces[j].style.transform = `rotate(${transforms[j][0]}deg) rotateX(${transforms[j][1]}deg) translateZ(${5.05 + 5 * scaledDistance + 4 * i}vw)`;
        }
    }
}

// use animationAPI to rotate, clientY to rotateY on polyhedrons


window.addEventListener('load', function() {
    createTransforms();
    init();
    centerCoordinate();
    rotationSpeed();
});

window.addEventListener('resize', function() {
    centerCoordinate();
    rotationSpeed();
});

window.addEventListener('mousemove', changePerspective);