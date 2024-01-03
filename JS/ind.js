
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

let context = new (window.AudioContext || window.webkitAudioContext)();
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
  
	play(value, vp) {
	  this.setup();
  
	  this.oscillator.frequency.value = value;
	  this.gainNode.gain.setValueAtTime(0, this.context.currentTime);
	  this.gainNode.gain.linearRampToValueAtTime(1, this.context.currentTime + 0.01);
			  
	  this.oscillator.start(this.context.currentTime+vp/1000);
	  //setTimeout(1000);
	  //this.stop(this.context.currentTime);
	}
	
	stop(vp,tt) {
	  //this.gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 1);
	  let dl=0;
	  if (tt=='.'){
	  dl = vp/1000+0.1;
	  }
	  else{
	  dl = vp/1000+0.3;
	  }
	  this.oscillator.stop(this.context.currentTime + dl);
	  console.log('начало:',vp,' конец',dl);
	}
   
  }

  function playSound(note,vp,tt) {
	let sound = new Sound(context);
	let value = note;
	var now = context.currentTime;
	sound.play(value,vp);
	sound.stop(vp,tt);
  }

//************************************************************************
  textInputId.oninput = function() { //событие  - при каждом вводе в input перевод его в код Морзе и вывод в output 
    var textOutput='';
	let textInput = textInputId.value.toLowerCase();
	let vp=0;
	let tt='.';
	let arrOfWord=textInput.split(' ');
	textInput = textInput.replaceAll(' ','');
	for(k in  arrOfWord){	// Hello,    Vasya
		for(i in arrOfWord[k]){ // H e l l o , V a s y a
	//console.log(mes[i]);              
	//console.log(dict[mmes[k][i]]);  
			for (j in dict[arrOfWord[k][i]]){  // j - тире или точка каждой буквы слова в соотвествии со словарем
			tt=dict[arrOfWord[k][i]][j];  // точка/тире
			textOutput+=tt;
			}
		//пробелы между буквами
		textOutput+='  ';
		}
	textOutput+='  /  ';
	//разделение между словами
	}
	textOutputId.value = textOutput;
  };
//************************************************************************



// https://alphabetonline.ru/morse.html
  
  document.getElementById('perev').addEventListener('click', () => {
	let mes = document.getElementById('textInputId').value;
	let vp=0;
	let tt='.';
	let mmes=mes.split(' ');
	mes = mes.replaceAll(' ','');
	for(k in  mmes){
	for(i in mmes[k]){ //sos z
	//console.log(mes[i]);               //mes[i]???
	//console.log(dict[mmes[k][i]]);  
	// s       o         s
		for (j in dict[mmes[k][i]]){ //проход по каждому тире или точке
		//console.log(vp);
		

			tt=dict[mmes[k][i]][j];
		playSound(800.00,vp,tt);
			if (dict[mmes[k][i]][j]==to){
				vp+=200;		//дается запас на паузу
			}
			else{
				vp+=400;
			}
			console.log(tt);
		}
		vp+=200;
		//между буквами
	}
	
	vp+=400;
	//между словами
	}
  //  playSound(note,0);					
 //   playSound(note,200);
    //playSound(note,400);
    //setTimeout(900);
	//console.log(context.currentTime);
  })
  


