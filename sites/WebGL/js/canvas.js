const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

let width;
let height;

let pxScale = window.devicePixelRatio;

const image = document.getElementById('background');
const clouds = document.getElementById('clouds');
const ratio = image.width / image.height;

function setup() {
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    canvas.width = width * pxScale;
    canvas.height = height * pxScale;

    context.scale(pxScale, pxScale);

    draw();
}

function draw() {
    context.clearRect(0, 0, width, height);

    context.fillStyle = 'lightgray';
    context.fillRect(0, 0, width, height);

    context.drawImage(image, 0, 0, width, height);

    analyser.getByteFrequencyData(dataArray);

    let sum = 0;
    for (let i = 0; i < dataArray.length / 2; i++) {
        sum += dataArray[i];
    }
    let l = sum / (dataArray.length / 2);

    let imageData = context.getImageData((width - (1147 / 3840) * width) / 2  * pxScale, 869 / 2056 * height  * pxScale, (1147 / 3840) * width  * pxScale, 308 / 2056 * height * pxScale);
    let data = imageData.data;

    for (let y = 0; y < imageData.height; y++) {
        for (let x = 0; x < imageData.width; x++) {
            let index = (x + y * imageData.width) * 4;
            data[index + 0] += Math.pow(l / 30, 2);
            data[index + 1] += Math.pow(l / 30, 2);
            data[index + 2] += Math.pow(l / 30, 2);
        }
    }

    context.putImageData(imageData, (width - (1147 / 3840) * width) / 2  * pxScale, 869 / 2056 * height  * pxScale);

    requestAnimationFrame(draw);
}

window.addEventListener('load', setup);

window.addEventListener('resize', () => {
    setup();
    draw();
});