
let buttonColours = ["red","blue","green","yellow"];
let gamePattern = [];
let userPattern = [];
let level = 0;
let inGame = false;

$("#level-title").click(function () {
  if(!inGame) {
    $("#simonGame").text("The Simon Game");
    $("#level-title").text(`Level ${level}`);
      nextSequence();
    inGame = true;
  }
});

function checkAnswer(currentLevel) {
  if(userPattern[currentLevel] === gamePattern[currentLevel]) {
    if(currentLevel === gamePattern.length-1) {
      setTimeout(function() {
        nextSequence();
      },1000);
      userPattern = [];
    }
  } else {
    restart();
  }
}

function restart() {
  $("#simonGame").html("The Simon Game<br><br>Game Over");
  $("#level-title").text("You reached to level "+level+". Press Here to Play Again");
  inGame = false;
  level = 0;
  userPattern = [];
  gamePattern = [];
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);

}

$(".btn").click(function(e){
  let userColor = e.target.id;
  playSound(userColor);
  animatePress(userColor);
  userPattern.push(userColor);
  let posicion = userPattern.length-1;
  checkAnswer(posicion);
});

function nextSequence() {
  level++;
  $("#level-title").text(`Level ${level}`);
  let randomNumber = Math.floor(Math.random()*4);
  let randomColor = buttonColours[randomNumber];
  gamePattern.push(randomColor);
  // $("#"+randomColor).fadeOut(100).fadeIn(100)
  animatePress(randomColor);
  playSound(randomColor);
}

function playSound(name) {
  let audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

function animatePress(currentColor) {
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },200);
}