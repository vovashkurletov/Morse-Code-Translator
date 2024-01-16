var dataDAD=[]; // next DAD - "dots and dashes"

let to='.';
let ti='-';

let dict = {		//0-тире 1-точка
	'а':[to,ti],
	'б':[ti,to,to,to],
	'в':[to,ti,ti],
	'г':[ti,ti,to],
	'д':[ti,to,to],
	'е':[to],
	'ж':[to,to,to,ti],
	'з':[ti,ti,to,to],
	'и':[to,to],
	'й':[to,ti,ti,ti],
	'к':[ti,to,ti],
	'л':[to,ti,to,to],
	'м':[ti,ti],
	'н':[ti,to],
	'о':[ti,ti,ti],
	'п':[to,ti,ti,to],
	'р':[to,ti,to],
	'с':[to,to,to],
	'т':[ti],
	'у':[to,to,ti],
	'ф':[to,to,ti,to],
	'х':[to,to,to,to],
	'ц':[ti,to,ti,to],
	'ч':[ti,ti,ti,to],
	'ш':[ti,ti,ti,ti],
	'щ':[ti,ti,to,ti],
	'ъ':[to,ti,ti,to,ti,to],
	'ы':[ti,to,ti,ti],
	'ь':[ti,to,to,ti],
	'э':[to,to,ti,to,to],
	'ю':[to,to,ti,ti],
	'я':[to,ti,to,ti], //32
	
	'a':[to,ti],
	'b':[ti,to,to,to],
	'c':[ti,to,ti,to],
	'd':[ti,to,to],
	'e':[to],
	'f':[to,to,ti,to],
	'g':[ti,ti,to],
	'h':[to,to,to,to],
	'i':[to,to],
	'j':[to,ti,ti,ti],
	'k':[ti,to,ti],
	'l':[to,ti,to,to],
	'm':[ti,ti],
	'n':[ti,to],
	'o':[ti,ti,ti],
	'p':[to,ti,ti,to],
	'q':[ti,ti,to,ti],
	'r':[to,ti,to],
	's':[to,to,to],
	't':[ti],
	'u':[to,to,ti],
	'v':[to,to,to,ti],
	'w':[to,ti,ti],
	'x':[ti,to,to,ti],
	'y':[ti,to,ti,ti],
	'z':[ti,ti,to,to],

	'0':[ti,ti,ti,ti,ti],
	'1':[to,ti,ti,ti,ti],
	'2':[to,to,ti,ti,ti],
	'3':[to,to,to,ti,ti],
	'4':[to,to,to,to,ti],
	'5':[to,to,to,to,to],
	'6':[ti,to,to,to,to],
	'7':[ti,ti,to,to,to],
	'8':[ti,ti,ti,to,to],
	'9':[ti,ti,ti,ti,to],

	'.':[to,to,to,to,to,to],
	',':[to,ti,to,ti,to,ti],
	':':[ti,ti,ti,to,to,to],
	';':[ti,to,ti,to,ti,to],
	')':[ti,to,ti,ti,to,ti],
	'(':[ti,to,ti,ti,to,ti],
	"'":[to,ti,ti,ti,ti,to],
	'"':[to,ti,to,to,ti,to],
	'-':[ti,to,to,to,to,ti],
	'/':[ti,to,to,ti,to],
	'?':[to,to,ti,ti,to,to],
	'!':[ti,ti,to,to,ti,ti],
	'@':[to,ti,ti,to,ti,to],

}


class Sound {
	constructor(context) {
	  this.context = context;
	}
	setup() {
	  this.oscillator = this.context.createOscillator();
	  this.gainNode = this.context.createGain();
	  this.oscillator.connect(this.gainNode);
	  this.gainNode.connect(this.context.destination);

	  this.oscillator.type = 'sine';
	}
	play(freq, curTime) {
	  this.setup();
  
	  this.oscillator.frequency.value = freq;
	  this.gainNode.gain.setValueAtTime(0, this.context.currentTime);
	  this.gainNode.gain.linearRampToValueAtTime(1, this.context.currentTime + 0.01);
	  //разные настройки 

	  this.oscillator.start(this.context.currentTime+curTime/1000);
	}
	stop(durCoef,curTime,dotOrDash) {
	  let duration=0;
	  if (dotOrDash=='.'){
		duration = curTime/1000+durCoef/1000*1;//в этом API время в сек, в vanilla JS - мс 
	  }
	  else{
		duration = curTime/1000+durCoef/1000*3;
	  }
	  this.oscillator.stop(this.context.currentTime + duration);//тек. время + длительность зучания
	  console.log('начало:',curTime,'; конец: ',duration);
	}
  }


//************************************************************************
  textInputId.oninput = function() { //событие  - при каждом вводе в input перевод его в код Морзе и вывод в output. А также - добавление в глобальный массив текста кода Морзе вида [[д],[a]],[[н],[е],[т]],[]  
    var textOutput='';
	let textInput = textInputId.value.toLowerCase();
	let curChar='';
	let arrOfWord=textInput.split(' ');
	dataDAD=[];
	textInput = textInput.replaceAll(' ','');
	for(k in  arrOfWord){	// Hello,    Vasya
		dataDAD[k]=[];
		for(i in arrOfWord[k]){ // H e l l o , V a s y a
			curChar=dict[arrOfWord[k][i]].join('');  // curChar - буква в коде Морзе
			textOutput+=curChar;//уходит в output
			dataDAD[k][i]=curChar;//добавляем в глобальный массив
		//пробелы между буквами
		textOutput+='  ';
		}
	//разделение между словами
	textOutput+='  /  ';
	}
	textOutputId.value = textOutput;
  };
//************************************************************************



/* https://alphabetonline.ru/morse.html гласит:

Особенности кода Морзе:

	- для кодирования используются два звуковых сигнала: длинный (тире) и короткий (точка);
	- за единицу времени принимается длительность короткого сигнала (одной точки);
	- длительность тире равно длительности трём точкам;
	- пауза между элементами одного знака — одна точка;
	- пауза между знаками в слове — три точки;
	- пауза между словами — семь точек.

*/
  
  document.getElementById('translateButton').addEventListener('click', () => { //событие  - при нажатии на стрелку генерируется звук 
	let textOfDotsAndDashes = textOutputId.value; 
	let curTime = 0;
	let curCharOut = '';
	let freqValue = frequencyRange.value;
	var durCoef = durationCoefficient.value;

	for(let i in dataDAD){
		for(let j in dataDAD[i]){
			for(let k in dataDAD[i][j]){
				curCharOut=dataDAD[i][j][k];
				playSound(freqValue,durCoef,curTime,curCharOut);
				if (curCharOut==to){
					curTime+=durCoef*2;		//точка + дается запас на паузу - 1 точка 
				}
				else{
					curTime+=durCoef*4;     //тире + дается запас на паузу - 1 точка 
				}
			}
			//между буквами
			curTime+=durCoef*2;
		}	
		//между словами
		curTime+=durCoef*7;
	}
  });

  let context = new (window.AudioContext || window.webkitAudioContext)();
  function playSound(freqValue,durCoef,curTime,dotOrDash) {
	let sound = new Sound(context);
	var now = context.currentTime;
	sound.play(freqValue,curTime);
	sound.stop(durCoef,curTime,dotOrDash);
  }

  


