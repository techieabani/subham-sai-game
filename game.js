var buttonColours = ["red","blue","green","yellow"];

var userClickedPattern = [];
var gamePattern = [];
var isGameStarted = false;
var level = 0;
var score = 0;

$(".startBtn").on("click",function(){
startGame();
});

$(document).on('click','.restartBtn',function(){
  startGame();
});

function startGame() {
  if (!isGameStarted) {
    $("#level-title").text("Level " + level);
    $("#score").text("Your Score is : " + score);
    nextSequence();
    isGameStarted = true;
  }
}

$(".btn").click(function(){
  if (isGameStarted) {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
  }
});

function checkAnswer(currentLevel) {
if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
  if (userClickedPattern.length === gamePattern.length) {
      score+=100;
      $("#score").text("Your Score Now : " + score);
      setTimeout(function(){
      nextSequence();
    },1000);
  }
} else {
  playSound("wrong");
  $("body").addClass("game-over");
  $("#level-title").html("Game Over, <button class='restartBtn' type='button' class='btn-info'>Click Me</button> to Restart");
  $("#score").text("Your Final Score is : " + score);
  setTimeout(function(){
      $("body").removeClass("game-over");
  },200);
  startOver();
}
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}

function startOver(){
  level = 0;
  score = 0;
  isGameStarted = false;
  gamePattern = [];
}
