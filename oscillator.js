const yourButton = document.getElementById("yourButton");
const yourFrequency = document.getElementById("frequencyInput");
const movement = document.getElementById("movement");
const wave = document.getElementById("waveInput");
const c = document.getElementById("C");
const cs = document.getElementById("C#");
const d = document.getElementById("D");
const ds = document.getElementById("D#");
const e = document.getElementById("E");
const f = document.getElementById("F");
const fs = document.getElementById("F#");
const g = document.getElementById("G");
const gs = document.getElementById("G#");
const a = document.getElementById("A");
const as = document.getElementById("A#");
const b = document.getElementById("B");
let sweepLength = 4;
var seed=0;
let oct=0;
let maxIndex=100;

var isSweep=0;

function changeSweepLength(){
    sweepLength=document.querySelector(".soundLength").value;
    }

function checkValue(str,value,type,modStr){    
    let loop=1;
    let strArray=[];
    if(type=="-"){
    while(str[str.indexOf(value)-loop]=="1" || str[str.indexOf(value)-loop]=="2" || str[str.indexOf(value)-loop]=="3" || str[str.indexOf(value)-loop]=="4" || str[str.indexOf(value)-loop]=="5" || str[str.indexOf(value)-loop]=="6" || str[str.indexOf(value)-loop]=="7" || str[str.indexOf(value)-loop]=="8" || str[str.indexOf(value)-loop]=="9" || str[str.indexOf(value)-loop]=="0" || str[str.indexOf(value)-loop]=="-" || str[str.indexOf(value)-loop]=="+" || str[str.indexOf(value)-loop]=="*" || str[str.indexOf(value)-loop]=="/" || str[str.indexOf(value)-loop]=="(" || str[str.indexOf(value)-loop]==")" || str[str.indexOf(value)-loop]==modStr){
        strArray.push(str[str.indexOf(value)-loop]);
        loop++;
        }
        strArray=strArray.reverse();
        }else{
        loop=-2;
        while(str[str.indexOf(value)-loop]=="1" || str[str.indexOf(value)-loop]=="2" || str[str.indexOf(value)-loop]=="3" || str[str.indexOf(value)-loop]=="4" || str[str.indexOf(value)-loop]=="5" || str[str.indexOf(value)-loop]=="6" || str[str.indexOf(value)-loop]=="7" || str[str.indexOf(value)-loop]=="8" || str[str.indexOf(value)-loop]=="9" || str[str.indexOf(value)-loop]=="0" || str[str.indexOf(value)-loop]=="-" || str[str.indexOf(value)-loop]=="+" || str[str.indexOf(value)-loop]=="*" || str[str.indexOf(value)-loop]=="/" || str[str.indexOf(value)-loop]=="(" || str[str.indexOf(value)-loop]==")" || str[str.indexOf(value)-loop]==modStr){
        strArray.push(str[str.indexOf(value)-loop]);
        loop--;
        }
        }
    str=strArray.join();
    while(str.replaceAll("(","").length!=str.replaceAll(")","").length){
        if(str.replaceAll("(","").length<str.replaceAll(")","").length){
            str=str+")";
            }else{
            str="("+str;
            }
        }
    return str.replaceAll(",","");
    }

function inputNumber(){

    
    yourButton.value=yourFrequency.value*(2**(oct))+"Hz";
    c.value=parseInt(oct+4)+"C";
    cs.value=parseInt(oct+4)+"C#";
    d.value=parseInt(oct+4)+"D";
    ds.value=parseInt(oct+4)+"D#";
    e.value=parseInt(oct+4)+"E";
    f.value=parseInt(oct+4)+"F";
    fs.value=parseInt(oct+4)+"F#";
    g.value=parseInt(oct+4)+"G";
    gs.value=parseInt(oct+4)+"G#";
    a.value=parseInt(oct+4)+"A";
    as.value=parseInt(oct+4)+"A#";
    b.value=parseInt(oct+4)+"B";
}

function letsConvert(math,n){
    wave.value="@";
    math=math.replaceAll("wt","");
    math=math.replaceAll("sin","");
    let math1=checkValue(math,")/(","-","i");
    //math1.replaceAll("i","*i")
    let math2=checkValue(math,")/(","+","i");
    for(let i=1; i<=n; i++){
    wave.value=wave.value+"+"+"1/"+eval(eval(math2).toFixed(14))+"sin("+eval(eval(math1).toFixed(14))+"wt)";
    }
    wave.value=wave.value.replaceAll("1wt","wt");
    wave.value=wave.value.replace("1sin","sin");
    wave.value=wave.value.replaceAll("1/-","-1/");
     wave.value=wave.value.replaceAll("+-","-");
    wave.value=wave.value.replaceAll("1/sin","sin");
    wave.value=wave.value.replaceAll("@+","");
    wave.value=wave.value.replaceAll("@","");
}

function frequencyTest(inputedWave){
    if(inputedWave[inputedWave.indexOf("wt")-1]=="(" || inputedWave.indexOf("wt")-1==inputedWave.indexOf("sin")+2 || inputedWave.indexOf("wt")-1==inputedWave.indexOf("cos")+2){
        return 1;
        }else{
            let i3=1;
            let i3Coefficient="";
            let i3Array=[];
            while(inputedWave[inputedWave.indexOf("wt")-i3]!="(" && inputedWave.indexOf("wt")-i3!=inputedWave.indexOf("sin")+2 && inputedWave.indexOf("wt")-i3!=inputedWave.indexOf("sin")+2 && inputedWave.indexOf("wt")-i3!=-1){
                i3Array.push(inputedWave[inputedWave.indexOf("wt")-i3]);//sin(2wt)
                i3=i3+1;
                }
                i3Array=i3Array.reverse();
                i3Coefficient=i3Array.join();
                i3Coefficient=i3Coefficient.replaceAll(",","");
                return eval(i3Coefficient);
            }
}
function play(Hz,time,duration){
    if(!duration){
        duration=(sweepLength*60)/(eval(document.querySelector("#BPM").value)*4);
        }else{
        duration=(duration*60)/(eval(document.querySelector("#BPM").value)*4);
        }
    if(!time){
        time=0;
        }else{
        time=(time*60)/(eval(document.querySelector("#BPM").value)*4);
        }
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const oscillator = audioCtx.createOscillator();
//ユーザーが入力する値はフーリエ級数、i倍音の振幅数の大きさなどを読み取る。
let valueSin=wave.value.replaceAll("sin","sin+").length-wave.value.length;
let valueCos=wave.value.replaceAll("cos","cos+").length-wave.value.length;
let inputedWave=wave.value;
let frequencyAddition = new Float32Array(maxIndex);
const imag = new Float32Array(maxIndex);
const real = new Float32Array(maxIndex);
for(let i4=1; i4<maxIndex; ++i4){
real[i4] = imag[i4] = 0;
}
for(let i = 1; i < maxIndex; ++i){
if(valueSin+valueCos>=i){
    if(inputedWave.indexOf("cos")>inputedWave.indexOf("sin") || inputedWave.indexOf("cos")==-1){
    if(inputedWave[inputedWave.indexOf("sin")-1]!="" && inputedWave[inputedWave.indexOf("sin")-1]!="+" && inputedWave[inputedWave.indexOf("sin")-1]!="-" && inputedWave.indexOf("sin")-1!=-1){
        let iCoefficient="";
        let iArray=[];
        for(let i2 = 1; i2 < 20; ++i2){
            if(inputedWave[inputedWave.indexOf("sin")-i2]!=")" && inputedWave[inputedWave.indexOf("sin")-i2]!="t" && inputedWave.indexOf("sin")-i2!=-1){
        iArray.push(inputedWave[inputedWave.indexOf("sin")-i2]);
                }else{
                iArray=iArray.reverse();
                iCoefficient=iArray.join();
                iCoefficient=iCoefficient.replaceAll(",","");
                i2=20;
                
                frequencyAddition[i]=frequencyTest(inputedWave);
                inputedWave=inputedWave.replace("wt","");
        imag[frequencyAddition[i]]=imag[frequencyAddition[i]]+eval(iCoefficient);
        }
            }
            }else{
        frequencyAddition[i]=frequencyTest(inputedWave);
        inputedWave=inputedWave.replace("wt","");
        imag[frequencyAddition[i]]=imag[frequencyAddition[i]]+1;
        }
    inputedWave=inputedWave.replace("sin","");
            }else if(inputedWave.indexOf("cos")<inputedWave.indexOf("sin") || inputedWave.indexOf("sin")==-1){
        //余弦の計算
        if(inputedWave[inputedWave.indexOf("cos")-1]!="" && inputedWave[inputedWave.indexOf("cos")-1]!="+" && inputedWave[inputedWave.indexOf("cos")-1]!="-" && inputedWave.indexOf("cos")-1!=-1){
        let iCoefficient="";
        let iArray=[];
        for(let i2 = 1; i2 < 20; ++i2){
            if(inputedWave[inputedWave.indexOf("cos")-i2]!=")" && inputedWave[inputedWave.indexOf("cos")-i2]!="t" && inputedWave.indexOf("cos")-i2!=-1){
        iArray.push(inputedWave[inputedWave.indexOf("cos")-i2]);
                }else{
                iArray=iArray.reverse();
                iCoefficient=iArray.join();
                iCoefficient=iCoefficient.replaceAll(",","");
                i2=20;
                
                frequencyAdditionReal[i]=frequencyTest(inputedWave);
                inputedWave=inputedWave.replace("wt","");
        real[frequencyAdditionReal[i]]=real[frequencyAdditionReal[i]]+eval(iCoefficient);
        }
            }
            }else{
        frequencyAdditionReal[i]=frequencyTest(inputedWave);
        inputedWave=inputedWave.replace("wt","");
        real[frequencyAdditionReal[i]]=real[frequencyAdditionReal[i]]+1;
        }
    inputedWave=inputedWave.replace("cos","");
        }
    }
    }//級数のi列目終わり


//i倍音の時の正弦、余弦の振幅数から波形を生成する。
const periodicWave=audioCtx.createPeriodicWave(real, imag);
oscillator.setPeriodicWave(periodicWave);
oscillator.frequency.setValueAtTime((Hz)*(2**(oct)), audioCtx.currentTime);
const sweepEnv = new GainNode(audioCtx);
    if(isSweep%2==1){
  sweepEnv.gain.cancelScheduledValues(time);
  sweepEnv.gain.setValueAtTime(0, time);
  sweepEnv.gain.linearRampToValueAtTime(1, time + attackTime);
  sweepEnv.gain.linearRampToValueAtTime(0, time + duration - releaseTime);
        }

  oscillator.connect(sweepEnv).connect(audioCtx.destination);
  oscillator.start(time);
  oscillator.stop(time + duration);
}

let attackTime = 0.05;
const attackControl = document.querySelector("#attack");
attackControl.addEventListener(
  "input",
  (ev) => {
    attackTime = (parseInt(ev.target.value, 10)*60)/(eval(document.querySelector("#BPM").value)*4);
  },
  false,
);

let releaseTime = 0.25;
const releaseControl = document.querySelector("#release");
releaseControl.addEventListener(
  "input",
  (ev) => {
    releaseTime = (parseInt(ev.target.value, 10)*60)/(eval(document.querySelector("#BPM").value)*4);
  },
  false,
);

/*midi player from https://github.com/fraigo/javascript-midi-player*/
/*
	// create the player object using a file input by id or DOM Element
	player=new MIDIPlayer('loadFile');
	// register the onload function to start playing
	player.onload = function(song){
		player.play();
		var pos= document.getElementById("position");
		pos.setAttribute("max",song.duration);
	}
	// the tick event is triggered in every position change
	player.ontick=function(song,position){
		var pos= document.getElementById("position");
		pos.value=position;
	}
	// stop playing when the window is unfocused
	// resume playing when window is in focus
	window.onfocus=function(){
		console.log("Focus", new Date())
		player.play();
	}*/

function tone(toneUp,Hz){
    if(!Hz){
        Hz=440;
        }
    if(!toneUp){
        toneUp=0;
        }
    return Hz*Math.pow(2,toneUp/12);
}

function perform(note){
    eval(note);
}

function chw(wave,type){
    if(!type){
        type=false;
        }
    if(type===true){
        document.getElementById('waveInput2').value=wave;
        letsConvert(document.getElementById('waveInput2').value,document.getElementById('makeWaveTo').value);
    }else{
        document.getElementById('waveInput').value=wave;
    }
}
function oscillation(atk,rls){
    isSweep=1;
    document.querySelector("#attack").value=atk;
    attackTime = (parseInt(atk, 10)*60)/(eval(document.querySelector("#BPM").value)*4);
    document.querySelector("#release").value=rls;
    releaseTime = (parseInt(rls, 10)*60)/(eval(document.querySelector("#BPM").value)*4);
}
function setBPM(BPM){
    document.querySelector("#BPM").value=BPM;
}
