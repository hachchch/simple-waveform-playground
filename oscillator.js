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

const imag = new Float32Array(10);
const real = new Float32Array(10);
for(let i = 0; i < 10; ++i){
	real[i] = imag[i] = 0;
if(valueSin>=i){
    if(wave.value[wave.value.indexOf("sin")-1]!="" && wave.value.indexOf("sin")-1!=-1 /*wave.value[wave.value.indexOf("sin")-1]!="+"*/){
        imag[i]=1;//wave.value[wave.value.indexOf("sin")-1];
        console.log(imag[i]);
        }else{
        imag[i]=1;
        }
    wave.value=wave.value.replace("sin","");
    }
}

const periodicWave=audioCtx.createPeriodicWave(real, imag);

oscillator.setPeriodicWave(periodicWave);
oscillator.frequency.setValueAtTime(Hz*(2**(oct)), audioCtx.currentTime); // ヘルツ単位の値
oscillator.connect(audioCtx.destination);
oscillator.start();
    console.log(seed);
    if(seed!=thisSeed){
        oscillator.stop();
        }
}
