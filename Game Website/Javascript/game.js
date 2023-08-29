//display all the canvas once HTML document has been completely loaded
document.addEventListener('DOMContentLoaded', function() {
let canvas = document.getElementById("GameFunction");
//this method returns a two dimentional drawing context on canvas
let ctx = canvas.getContext("2d"); 
//difines the game ball and paddlle size and their initial position
let ballWidth = 3;
let ballHeight = 0;
let ballx = (canvas.width / 2) - 3;
let bally = canvas.height / 2;
let ballmx = 1;
let ballmy = -1;
let paddleWidth = 5;
let paddleHeight = 30;
let playerX = 5;
let playerY = 55;
let computerX = canvas.width - 10;
let computerY = 55;
let attempts = 5;
let score = 0;
let gameButton = document.getElementById('GameStart');
let resetButton = document.getElementById('GameReset');
//creates variables to access the session and local storage
let access = sessionStorage.key(0);
let details = JSON.parse(sessionStorage.getItem(access));
let local = JSON.parse(localStorage.getItem(access));
let session_details = {};
let local_details = {};
/*add and event listener to track the mouse movement and change the position of the
player paddle depending on it*/ 
document.addEventListener("mousemove", movePaddle, false);

function movePaddle(e) {
   let position = e.clientY - canvas.offsetTop;
   if (position > 0 && position < canvas.height - 30) {
      playerY = position;
   }
}
//the computer moves the paddle depending on the bally position
function computerMovement() {
   computerY = bally - 10;
}

function showAttempts() {
   ctx.font = "5px";
   ctx.fillStyle = "#ccc";
   ctx.fillText(`Attempts: ${attempts}`, canvas.width - 60, 20);
}

function showScore() {
   ctx.font = "10px Arial";
   ctx.fillStyle = "#ccc";
   ctx.fillText(`Score: ${score}`, 8, 20);
}
//changes the ball direction if it touches the computer or the player paddle
function playerCollision() {
   if (playerX + paddleWidth > ballx && playerX < ballx + ballWidth
      && playerY + paddleHeight > bally && playerY < bally + ballHeight) {
         //if it touches the player paddle then the score increase by 1
         score = score + 1;
         return score, true;
      };
}

function computerCollision() {
   if (computerX + paddleWidth > ballx && computerX < ballx + ballWidth
      && computerY + paddleHeight > bally && computerY < bally + ballHeight) {
         return true;
      };
}
//creates and add style to the ball and paddles inside the canvas
function ball() {
ctx.beginPath();
ctx.arc(ballx, bally, ballWidth, ballHeight, Math.PI * 2);
ctx.fillStyle = "white";
ctx.fill();
ctx.closePath();
}

function playerPaddle() {
 ctx.beginPath();
 ctx.rect(playerX, playerY, paddleWidth, paddleHeight);
 ctx.fillStyle = "white";
 ctx.fill();
 ctx.closePath;
}

function computerPaddle() {
 ctx.beginPath();
 ctx.rect(computerX, computerY, paddleWidth, paddleHeight);
 ctx.fillStyle = "white";
 ctx.fill();
 ctx.closePath();
}
//creates the game area and add all the game elements(ball, paddles, score, attempts)
function game(){
 ctx.clearRect(0, 0, canvas.width, canvas.height);
 
 ball();

 playerPaddle();

 computerPaddle();

 showAttempts();

 showScore();

 computerMovement();
/*if the ball touches the canvas border left or right then the direction of the ball changes 
and the attempts decrease by 1*/ 
if (ballx + ballmx > canvas.width - 5 || ballx + ballmx < 5) {
   ballmx = -ballmx;
   attempts--;
   //if the attempts reach to 0 then the game ends
   if (attempts == 0) {
      //if there is a logged in account then the score is saved inside the session storage
      if (access == "IsThisFirstTime_Log_From_LiveServer") {
         let access2 = sessionStorage.key(1);
         let details2 = JSON.parse(sessionStorage.getItem(access2));
         let local2 = JSON.parse(localStorage.getItem(access2));
         if (details2) {
            alert("Game over!!. Your final score is: " + score);
            session_details.username = access2;
            session_details.score = score;
            sessionStorage[session_details.username] = JSON.stringify(session_details);
            /*if the score is greater then score saved inside the local storage then 
            then local storage score is updated*/
            if (score > local2.score) {
               local_details.name = local2.name;
               local_details.username = access2;
               local_details.password = local2.password;
               local_details.email = local2.email;
               local_details.score = score;
               localStorage[local_details.username] = JSON.stringify(local_details);
               document.location.reload();
               clearInterval(interval);
            }
            else {
            document.location.reload();
            clearInterval(interval);
            }
         }
         else {
            alert("Game over!!. Your final score is: " + score);
            document.location.reload();
            clearInterval(interval);
         } 
      }
      else {
         if (details) {
            alert("Game over!!. Your final score is: " + score);
            session_details.username = access;
            session_details.score = score;
            sessionStorage[session_details.username] = JSON.stringify(session_details);
            if (score > local.score) {
               local_details.name = local.name;
               local_details.username = access;
               local_details.password = local.password;
               local_details.email = local.email;
               local_details.score = score;
               localStorage[local_details.username] = JSON.stringify(local_details);
               document.location.reload();
               clearInterval(interval);
            }
            else {
            document.location.reload();
            clearInterval(interval);
            }
         }
         else {
            alert("Game over!!. Your final score is: " + score);
            document.location.reload();
            clearInterval(interval);
         }  
      }  
 }
}
//if the ball touches the canvas border top or down the direction of it change
 if (bally + ballmy > canvas.height - 5 || bally + ballmy < 5) {
   ballmy = -ballmy;
 }
 //if the ball touches the player or computer paddle then the direction of it change
 if ((playerCollision() && ballmx < 0) || (computerCollision() && ballmx > 0)) {
   ballmx = -ballmx;
 }
 
 ballx = ballx + ballmx;
 bally = bally + ballmy;

}
/*creates an event listener over the game start button 
so if it is pressed the game starts giving to it an interval of 5miliseconds*/
gameButton.addEventListener("click", gameRun);
function gameRun() {
   gameButton.removeEventListener("click", gameRun);
   setInterval(game, 5);
}
/*creates an event listener over the game reset button so if it
pressed the game ends and the score and attempts come to their initial 
value at the start of the game*/
resetButton.addEventListener("click", gameReset);
function gameReset() {
   resetButton.removeEventListener("click", gameReset);
   document.location.reload();
   clearInterval(interval);
}

});