const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Procedural way - declaring variables and functions step by step in order
// we want them to be executed

// object oriented programming paradigm
// wrap functions and variables in objects

// Encapsulation
// wrapping variables and related functions that opera on them in objects

// class constructor
// whenever we use the 'new' keyword constructor will create 1 new blank object and 
// it will fill it with values and properties based on the class blueprint

let gradient = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
gradient.addColorStop(0, 'red');
gradient.addColorStop(0.2, 'yellow');
gradient.addColorStop(0.4, 'green');
gradient.addColorStop(0.6, 'cyan');
gradient.addColorStop(0.8, 'blue');
gradient.addColorStop(1, 'magenta');

// create and manage individual symbol
class Symbol {
    constructor(x, y, fontSize, canvasHeight){
        //this.characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ♔♕♖♗♘♙CHESS♚♛♜♝♞♟☀☁❆WEATHER❅❄♪MUSIC♫';
        this.characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
        //this.characters= 'бвгджзклмнпрстфхцчшщаеёиоуыэюя';
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text = '';
        this.canvasHeight = canvasHeight;
    }
    draw(context){
        this.text = this.characters.charAt(Math.floor(Math.random()*this.characters.length));
        //context.fillStyle = '#0aff0a'; // here it will set the fillstyle for each character, it is heavy to compute
        //context.fillStyle = 'red';
        context.fillText(this.text, this.x * this.fontSize, this.y*this.fontSize);
        if(this.y * this.fontSize > this.canvasHeight && Math.random() > 0.99){
            this.y = 0;
        } else {
            this.y +=1;
        }
    }
}

// will manage the entire effect for all symbols at once
class Effect {
    constructor(canvasWidth, canvasHeight){
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 25;
        this.columns = this.canvasWidth/this.fontSize;
        this.symbols = [];
        this.#initialize();
        console.log(this.symbols);
    }
    // private method starting with #, cannot be called outside of the Effect, Abstraction
    // we are hiding unnecessary details from the user
    #initialize(){ 
        for (let i = 0; i < this.columns; i++){
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
        }
    }
    resize(width, height){
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.columns = this.canvasWidth/this.fontSize;
        this.symbols = [];
        this.#initialize();
    }
}

const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 30;
const nextFrame = 1000/fps;
let timer = 0;

function animate(timeStamp){
    // deltaTime is the difference in milliseconds between previous animation frame and the current animation frame
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if(timer > nextFrame){
        //monospace - characters that occupy the same amount of horizontal space
        ctx.fillStyle = 'rgba(0,0,0,0.10)';
        ctx.fillRect(0,0,canvas.width, canvas.height);
        ctx.fillStyle = gradient;  //'#0aff0a';
        ctx.font = effect.fontSize + 'px monospace';
        effect.symbols.forEach(symbol => symbol.draw(ctx));
        timer = 0;
    } else {
        timer += deltaTime;
    } 

    requestAnimationFrame(animate);
}
animate(0);

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.resize(canvas.width, canvas.height);
});