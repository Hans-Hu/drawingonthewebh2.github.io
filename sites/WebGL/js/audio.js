const audio = document.getElementById('audio');

const audioContext = new AudioContext();
let src = audioContext.createMediaElementSource(audio);
const analyser = audioContext.createAnalyser();

src.connect(analyser);
analyser.connect(audioContext.destination);

analyser.smoothingTimeConstant = 0.5;

audio.addEventListener('play', function () {
    audioContext.resume();
});

analyser.fftSize = 32;

const bufferLength = analyser.frequencyBinCount;

const dataArray = new Uint8Array(bufferLength);