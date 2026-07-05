//-------------------------------------------------background--------------------------------------------------
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Symbol {
    constructor(x, y, fontSize, canvasHeight){
        this.characters = "ハッカー01ハッカーNekoハッカー♔♕♖ハッカー01ハッカー♗♘♙ハッカー♚♛♜ハッカー01ハッカー♝♞♟猫";
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text = "";
        this.canvasHeight = canvasHeight;
    }
    draw(context){
        this.text = this.characters.charAt(Math.floor(Math.random()*this.characters.length));
        context.fillStyle = "#ff2700";
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
        if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98){
            this.y = 0;
        }
        else {
            this.y += 1;
        }
    }   
}

class Effect {
    constructor(canvasWidth, canvasHeight){
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 25;
        this.columns = this.canvasWidth/this.fontSize;
        this.symbols = [];
        this.#initialize();
    }
    #initialize(){
        for (let i = 0; i < this.columns; i++){
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
        }
    }
    resize(width, height){
        this.canvasHeight = width;
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
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if (timer > nextFrame){
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.textAlign = "center";
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.font = effect.fontSize + "px monospace";
    effect.symbols.forEach(symbol => symbol.draw(ctx));
    timer = 0;
    } 
      else {
        timer += deltaTime;
    }
    requestAnimationFrame(animate);
}
animate(0);

window.addEventListener("resize", function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.resize(canvas.width, canvas.height)
})



//---------------------------------stats-chess.com--------------------------------------
const chess_elo = fetch("https://api.chess.com/pub/player/mrneko-og/stats")
.then(response => response.json())
.then(data => document.getElementById("chess").innerHTML = data.chess_rapid.last.rating)

//--------------------time tracking--------------------

function updateTime(){
    var currentTime = new Date().toLocaleString();
    var timeText = document.getElementById("time-bar")
    var timeText2 = document.getElementById("time2")
    timeText.innerHTML = currentTime
    timeText2.innerHTML = currentTime
}
setInterval(updateTime, 1000)






//-------------dragable windows-----------------

dragElement(document.getElementById("window"));
dragElement(document.getElementById("window2"));
dragElement(document.getElementById("window3"));
function dragElement(element){
    var initialX = 0;
    var initialY = 0;
    var currentX = 0;
    var currentY = 0;

    if (document.getElementById(element.id + "header")){
        document.getElementById(element.id + "header").onmousedown = startDragging
    }

    else {
       element.onmousedown = startDragging; 
    }

    function startDragging(e){
        e = e || window.event;
        e.preventDefault();
        initialX = e.clientX;
        initialY = e.clientY;

        document.onmouseup = stopDragging;
        document.onmousemove = dragElement;
    }

      function dragElement(e) {
    e = e || window.event;
    e.preventDefault();

    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;

    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// close and open windows
var window1 = document.getElementById("window")

var close = document.getElementById("close")
var open = document.getElementById("open")

function closeWindow(element){
    element.style.display = "none"
}

function openWindow(element){
    element.style.display = "flex"
}



//-----------------window3----------------------

var window3 = document.getElementById("window3")

var close = document.getElementById("close")
var open = document.getElementById("open")

function closeWindow2(element){
    element.style.display = "none"
}

function openWindow2(element){
    element.style.display = "flex"
}

var window2 = document.getElementById("window2")

var close = document.getElementById("close")
var open = document.getElementById("open")

function closeWindow2(element){
    element.style.display = "none"
}

function openWindow2(element){
    element.style.display = "flex"
}

//----------------------game------------------------------
var character = document.getElementById("character")
var block = document.getElementById("block");
//function start(){
//block.style.animation = "animation-block";
//}

function jump(){
    if(character.classList != "animate"){
        character.classList.add("animate");
        }
    setTimeout(function(){
        character.classList.remove("animate");
    }, 500)
}

function start(){
var checkDead = setInterval(function(){
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    block.classList.add("animate_block");
    if(blockLeft < 20 && blockLeft > 0 && characterTop >=130){
        block.style.animation = "none";
        block.style.display = "none";
        alert("You lose! ): reaload to play again");
    }
},10);
}







/*
//chess puzzle
const allSquares = document.getElementsByClassName("square")
queen_number = 0

for(const i of allSquares){
    i.addEventListener("click", function(){
        if (queen_number < 7){
            i.innerHTML = "🨁"
            queen_number += 1
            document.getElementById("queen_num").innerHTML = queen_number
        }
        else{
            queen_number = "8 you won (:"
            document.getElementById("queen_num").innerHTML = queen_number
        }
        

    });
}
*/








