const yourButton = document.getElementById("yourButton");
const yourFrequency = document.getElementById("frequencyInput");
const wave = document.getElementById("waveInput");
var seed=0;
let oct=0;

function inputNumber(){
    yourButton.value=yourFrequency.value+"Hz";
}

function play(Hz){
    seed=Math.random()*999999;
    let thisSeed=seed;
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const oscillator = audioCtx.createOscillator();
/*let playWave = wave.value;
playWave=playWave.replaceAll("wt","*Hz*2*Math.PI*audioCtx.currentTime");
playWave=playWave.replaceAll("(*","(");
playWave=eval(playWave);
console.log(playWave);*/

let valueSin=wave.value.replaceAll("sin","sin+").length-wave.value.length;
let valueCos=wave.value.replaceAll("cos","cos+").length-wave.value.length;
let inputedWave=wave.value;
const imag = new Float32Array(10);
const real = new Float32Array(10);
for(let i = 1; i < 10; ++i){
	real[i] = imag[i] = 0;
if(valueSin>=i){
    if(inputedWave[inputedWave.indexOf("sin")-1]!="" && inputedWave[inputedWave.indexOf("sin")-1]!="+" && inputedWave.indexOf("sin")-1!=-1){
        imag[i]=eval(inputedWave[inputedWave.indexOf("sin")-1]);
        }else{
        imag[i]=1;
        }
    inputedWave=inputedWave.replace("sin","");
    }
}

console.log(imag[0]);
console.log(imag[1]);

const periodicWave=audioCtx.createPeriodicWave(real, imag);

oscillator.setPeriodicWave(periodicWave);
oscillator.frequency.setValueAtTime(Hz*(2**(oct)), audioCtx.currentTime); // ヘルツ単位の値
oscillator.connect(audioCtx.destination);
oscillator.start();
oscillator.stop(0.5);
}
