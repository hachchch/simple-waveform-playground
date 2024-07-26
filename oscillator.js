const yourButton = document.getElementById("yourButton");
const yourFrequency = document.getElementById("frequencyInput");
const wave = document.getElementById("waveInput");
var seed=0;
let oct=0;

function inputNumber(){
    yourButton.value=yourFrequency.value+"Hz";
}

function frequencyTest(inputedWave){
    if(inputedWave[inputedWave.indexOf("wt")-1]=="(" || inputedWave.indexOf("wt")-1==inputedWave.indexOf("sin")+2){
        return 1;
        }else{
            let i3=1;
            let i3Coefficient="";
            let i3Array=[];
            while(inputedWave[inputedWave.indexOf("wt")-i3]!="(" && inputedWave.indexOf("wt")-i3!=inputedWave.indexOf("sin")+2 && inputedWave.indexOf("wt")-i3!=-1){
                i3Array.push(inputedWave[inputedWave.indexOf("wt")-i3]);//sin(2wt)
                i3=i3+1;
                }
                i3Array=i3Array.reverse();
                i3Coefficient=i3Array.join();
                i3Coefficient=i3Coefficient.replaceAll(",","");
                return eval(i3Coefficient);
            }
}

function play(Hz){
    seed=Math.random()*999999;
    let thisSeed=seed;
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const oscillator = audioCtx.createOscillator();
//ユーザーが入力する値はフーリエ級数、i倍音の振幅数の大きさなどを読み取る。
let valueSin=wave.value.replaceAll("sin","sin+").length-wave.value.length;
let valueCos=wave.value.replaceAll("cos","cos+").length-wave.value.length;
let inputedWave=wave.value;
let frequencyAddition = new Float32Array(10);
const imag = new Float32Array(10);
const real = new Float32Array(10);
for(let i4=1; i4<10; ++i4){
real[i4] = imag[i4] = 0;
}
for(let i = 1; i < 10; ++i){
if(valueSin>=i){
    if(inputedWave[inputedWave.indexOf("sin")-1]!="" && inputedWave[inputedWave.indexOf("sin")-1]!="+" && inputedWave[inputedWave.indexOf("sin")-1]!="-" && inputedWave.indexOf("sin")-1!=-1){
        let iCoefficient="";
        let iArray=[];
        for(let i2 = 1; i2 < 10; ++i2){
            if(inputedWave[inputedWave.indexOf("sin")-i2]!=")" && inputedWave[inputedWave.indexOf("sin")-i2]!="t" && inputedWave.indexOf("sin")-i2!=-1){
        iArray.push(inputedWave[inputedWave.indexOf("sin")-i2]);
                }else{
                iArray=iArray.reverse();
                iCoefficient=iArray.join();
                iCoefficient=iCoefficient.replaceAll(",","");
                i2=10;
                
                frequencyAddition[i]=frequencyTest(inputedWave);
        imag[frequencyAddition[i]]=imag[frequencyAddition[i]]+eval(iCoefficient);
        }
            }
            }else{
        frequencyAddition[i]=frequencyTest(inputedWave);
        imag[frequencyAddition[i]]=imag[frequencyAddition[i]]+1;
        }
    inputedWave=inputedWave.replace("sin","");
            }
    }


//i倍音の時の正弦、余弦の振幅数から波形を生成する。
const periodicWave=audioCtx.createPeriodicWave(real, imag);

oscillator.setPeriodicWave(periodicWave);
oscillator.frequency.setValueAtTime(Hz*(2**(oct)), audioCtx.currentTime); // ヘルツ単位の値
oscillator.connect(audioCtx.destination);
oscillator.start();
oscillator.stop(0.5);
}
