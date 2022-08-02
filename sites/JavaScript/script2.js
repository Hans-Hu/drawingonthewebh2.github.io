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
let yBrowserRatio;

function centerCoordinate() {
    centerX = window.innerWidth / 2
    centerY = window.innerHeight / 2;
    yBrowserRatio = window.innerHeight / 180;
}

function mouseCoordinate(event) {
    let xPos = event.clientX;
    let yPos = event.clientY

    changePerspective(xPos, yPos)
    rotateMouse(yPos);
    lastMove = Date.now();
}

function rotationSpeed() {
    let scale = (window.innerWidth / window.screen.availWidth + window.innerHeight / window.screen.availHeight) / 2 - 0.01;
    let scales = new Array(2);
    scales[0] = polyhedronsTiming[0].duration;
    scales[1] = polyhedronsTiming[1].duration;
    polyhedronsTiming[0].duration = Math.max(Math.pow(11, scale) - 1, 1/120) * 1000;
    polyhedronsTiming[1].duration = Math.max(11 - Math.pow(11, scale), 1/120) * 1000;
    startRotate([polyhedronsTiming[0].duration / scales[0], polyhedronsTiming[1].duration / scales[1]]);
}

function rotateMouse(yPos) {
    let yRotation = 90 - Math.ceil(yPos / yBrowserRatio);
    movements[0] = [{transform: `rotateX(${10 + yRotation}deg) rotateY(0deg)`}, {transform: `rotateX(${10 + yRotation}deg) rotateY(360deg)`}]
    movements[1] = [{transform: `rotateX(${-10 + yRotation}deg) rotateY(0deg)`}, {transform: `rotateX(${-10 + yRotation}deg) rotateY(360deg)`}]
    startRotate();
}

function changePerspective(xPos, yPos) {
    let scale = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
    let distance = Math.sqrt(Math.pow(xPos - centerX, 2) + Math.pow(yPos - centerY, 2));
    let scaledDistance = distance / scale;
    scene.style.perspective = (32 - 16 * Math.pow(scaledDistance, 0.3)) + 'vw';
    for (let i = 0; i < 2; i++) {
        let faces = polyhedrons[i].children;
        for (let j = 0; j < 12; j++) {
            faces[j].style.transform = `rotate(${transforms[j][0]}deg) rotateX(${transforms[j][1]}deg) translateZ(${5.05 + 5 * scaledDistance + 4 * i}vw)`;
        }
    }
}

let movements;
let polyhedronsTiming;
let rotates = new Array(2);
let lastMove = 0;

function startRotate(scales, timeElapsed) {
    if (scales === undefined) {
        scales = [1, 1]
    }
    for (let i = 0; i < polyhedrons.length; i++) {
        let startTime = 0;
        if (rotates[i] !== undefined) {
            startTime = rotates[i].currentTime * scales[i];
            // looks smoother on firefox since mouse polling rate is limited to 60fps
            if (Date.now() - lastMove < 1000/60)
                startTime += Date.now() - lastMove;
            else
                startTime += 1000/60
        }
        rotates[i] = polyhedrons[i].animate(
            movements[i],
            polyhedronsTiming[i]
        );
        rotates[i].currentTime = startTime;
    }
}

function rotationLoop() {
    movements = [
        [{transform: 'rotateX(10deg) rotateY(0deg)'}, {transform: 'rotateX(10deg) rotateY(360deg)'}],
        [{transform: 'rotateX(-10deg) rotateY(0deg)'}, {transform: 'rotateX(-10deg) rotateY(360deg)'}]
    ];

    polyhedronsTiming = [
        {duration: 6000, iterations: Infinity},
        {duration: 8000, iterations: Infinity}
    ];
    
    startRotate();
}

window.addEventListener('load', function() {
    createTransforms();
    init();
    rotationLoop();
    centerCoordinate();
    rotationSpeed();
});

window.addEventListener('resize', function() {
    centerCoordinate();
    rotationSpeed();
});

window.addEventListener('mousemove', mouseCoordinate);