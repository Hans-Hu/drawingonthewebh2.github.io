const canvas = document.getElementById('c1');
const context = canvas.getContext('2d');

const canvas2 = document.getElementById('c2');
const context2 = canvas2.getContext('2d');

const lines = document.querySelectorAll('.lines');
const duplicates = document.querySelectorAll('.duplicates');
const speed = document.querySelectorAll('.speed');
const spacing = document.querySelectorAll('.spacing');

const backgroundColor = document.getElementById('background');
const lineColor = document.getElementById('line-color');

let bColor = backgroundColor.value;
let lColor = lineColor.value;

let width;
let height;
let angle;

let posX;
let posY;

// # of duplicates
// TODO: account for scaling
let d = 4;
// # of lines in horizontal direction
let n = 10;
// spacing between lines
let spacingMultiplier = 1;

// used to move lines
let m = 0;
let m2 = 0;

// speed of line movement
let s = 0.07;

let pxScale = window.devicePixelRatio;

function updatePosition(event) {
    posX = event.layerX * pxScale;
    posY = event.layerY * pxScale;
}

canvas.addEventListener('mousemove', updatePosition);

function updateVariableText() {
    lines[0].innerHTML = n;
    duplicates[0].innerHTML = d;
    speed[0].innerHTML = s;
    spacing[0].innerHTML = spacingMultiplier;
}

function buttonSetup() {
    backgroundColor.addEventListener('change', function() {
        bColor = backgroundColor.value;
    });

    lineColor.addEventListener('change', function() {
        lColor = lineColor.value;
    });

    lines[1].addEventListener('click', function() {
        n += 1;
        updateVariableText();
    });
    duplicates[1].addEventListener('click', function() {
        d += 1;
        updateVariableText();
    });
    speed[1].addEventListener('click', function() {
        s = Math.round((s + 0.01 + Number.EPSILON) * 100) / 100
        s.toFixed(2);
        updateVariableText();
    });
    spacing[1].addEventListener('click', function() {
        spacingMultiplier += 1;
        updateVariableText();
    });

    lines[2].addEventListener('click', function() {
        n = Math.max(n - 1, 1);
        updateVariableText();
    });
    duplicates[2].addEventListener('click', function() {
        d = Math.max(d - 1, 1);
        updateVariableText();
    });
    speed[2].addEventListener('click', function() {
        s = Math.max(Math.round((s - 0.01 + Number.EPSILON) * 100) / 100, 0.01);
        s.toFixed(2);
        updateVariableText();
    });
    spacing[2].addEventListener('click', function() {
        spacingMultiplier = Math.max(spacingMultiplier - 1, 1);
        updateVariableText();
    });
}

function setup() {
    updateVariableText();
    buttonSetup();

    width = canvas.width;
    height = canvas.height;

    posX = width / 2 * pxScale;
    posY = height / 2 * pxScale;

    angle = Math.atan(width / height);

    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    canvas2.style.width = width + 'px';
    canvas2.style.height = height + 'px';

    canvas.width = width * pxScale;
    canvas.height = height * pxScale;
    canvas2.width = width * pxScale;
    canvas2.height = height * pxScale;


    context.scale(pxScale, pxScale);
    context2.scale(pxScale, pxScale);

    draw();
}

function draw() {
    context.clearRect(0, 0, width, height);
    context2.clearRect(0, 0, width, height);

    context.fillStyle = bColor;
    context.fillRect(0, 0, width, height);

    let diamondWidth = width / (4 * n);

    context.lineWidth = diamondWidth * Math.cos(angle);
    context.strokeStyle = lColor;

    let diamond;
    let x = width / (4 * n);
    let y = height / (4 * n);

    for (let i = 0; i < 2 * n / spacingMultiplier; i++) {
        diamond = new Path2D();
        diamond.moveTo(width / 2 - (2 * i * x * spacingMultiplier + m * x) % (width), height / 2);
        diamond.lineTo(width / 2, height / 2 - (2 * i * y * spacingMultiplier + m * y) % (height));
        diamond.lineTo(width / 2 + (2 * i * x * spacingMultiplier + m * x) % (width), height / 2);
        diamond.lineTo(width / 2, height / 2 + (2 * i * y * spacingMultiplier + m * y)  % (height));
        diamond.closePath();

        context.stroke(diamond);
    }

    context.save();

    let circlePath = new Path2D();
    circlePath.arc(width/2, height/2, Math.min(width, height) * 0.5 / 2, 0, 2 * Math.PI );
    context.clip(circlePath);

    context.fillRect(0, 0, width, height);

    for (let i = 0; i < n / spacingMultiplier; i++) {
        diamond = new Path2D();
        diamond.moveTo((2 * i * x * spacingMultiplier + m2 * x) % (width / 2), height / 2);
        diamond.lineTo(width / 2, (2 * i * y * spacingMultiplier + m2 * y) % (height / 2));
        diamond.lineTo(width - (2 * i * x * spacingMultiplier + m2 * x) % (width / 2), height / 2);
        diamond.lineTo(width / 2, height - (2 * i * y * spacingMultiplier + m2 * y) % (height / 2));
        diamond.closePath();

        context.stroke(diamond);
    }

    context.restore();

    let imageData = context.getImageData((Math.min(Math.max(posX - width / (2 * d) * pxScale, 0), (width - width / d)  * pxScale)), (Math.min(Math.max(posY - height / (2 * d) * pxScale, 0), (height - height / d)  * pxScale)), (width / d) * pxScale, (height / d) * pxScale);
    let newImageData = context2.createImageData((width / d) * pxScale, (height / d) * pxScale);

    // invert color
    for (let i = 0; i < imageData.data.length; i += 4) {
        newImageData.data[i] = 255 - imageData.data[i];
        newImageData.data[i + 1] = 255 - imageData.data[i + 1];
        newImageData.data[i + 2] = 255 - imageData.data[i + 2];
        newImageData.data[i + 3] = 255;
    }

    for (let i = 0; i < d; i++) {
        for (let j = 0; j < d; j++) {
            context2.putImageData(newImageData, width / d * pxScale * i, height / d * pxScale * j);
        }
    }

    m  = (m + s) % ((4 * n));
    m2  = (m2 + s) % ((4 * n) / 2);

    requestAnimationFrame(draw);
}

window.addEventListener('load', setup);