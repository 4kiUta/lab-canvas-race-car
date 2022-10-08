/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas");
const cntx = canvas.getContext("2d");


// Car initial positioning 
let initialX = 225;
let initialY = 600;
let width = 50;
let height = 100;
const myCar = new Car(initialX, initialY, width, height);

// obstacles Array 
const roadBlock = [];

const gameActions = {

  avoided: 0,
  frames: 0,

  clear: () => {
    cntx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
  },

  score: function () {
    const points = this.avoided;
    cntx.font = "30px Arial";
    cntx.fillStyle = "black";
    cntx.fillText(`Score: ${points}`, 200, 50);
  },


  final: function () {
    cntx.font = "90px Arial";
    cntx.fillStyle = "black";
    cntx.fillText(`GAME OVER`, 200, 100);

  }

}



window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    interval = setInterval(startGame, 2);

  };
};



// the function that is inside of the loop setInterval
function startGame() {

  // display the road
  const board = document.getElementById("game-board")
  board.style.display = "block";


  // Check game over 
  if (gameOver() === true) {
    gameActions.final()
    clearInterval(interval);
    alert(`GAME OVER your final score is ${gameActions.avoided}`);
  }



  // dont allow get out of the canvas
  if ((myCar.x >= 10) && (myCar.x <= canvas.width - myCar.dw - 10)) {


    gameActions.clear();
    myCar.newPosition();
    myCar.draw();
    drawObstacles();
    gameActions.score();


  } else if ((myCar.x <= canvas.width - myCar.dw - 10) && (myCar.x < 100)) {
    myCar.x = myCar.x + 10
  } else {
    myCar.x = myCar.x - 10
  }

}




function gameOver() {
  const crash = roadBlock.some((obstacle) => {
    if (myCar.colision(obstacle)) {
      return true;
    } else {
      return false;
    }
  })

  return crash
}


function drawObstacles() {

  roadBlock.forEach((block) => {
    block.y += 1;
    block.draw();

    if (roadBlock[0].y > canvas.clientHeight) {
      gameActions.avoided += 1;
      // here we can also remove the older element in the array 
      roadBlock.shift()

    }
  })

  gameActions.frames += 1

  if (gameActions.frames % 100 === 0 || gameActions.frames % 332 === 0) {

    const maxWidth = 200;
    const minWidth = 20;
    let randomWidth = Math.floor(Math.random() *
      (maxWidth - minWidth + 1) + minWidth);

    const startPosition = 50;
    const endPosition = canvas.clientWidth - 50 - randomWidth;

    const positionX = Math.floor(Math.random() *
      (endPosition - startPosition + 1) + startPosition);

    const leftObstacle = new obstacles(randomWidth, 20, positionX, 0, "red");
    roadBlock.push(leftObstacle);



    // randomWidth = Math.floor(Math.random() *
    // (maxWidth - minWidth + 1) + minWidth);

    // const rightObstacle = new obstacles(randomWidth, 20, canvas.clientWidth - randomWidth - 50, 0, "red")
    // roadBlock.push(rightObstacle);


  }

}






// ACTIONS 
document.addEventListener("keydown", (event) => {

  switch (event.key) {
    case "ArrowUp":
      myCar.speedY -= 1;
      break;

    case "ArrowDown":
      myCar.speedY += 1;
      break;

    case "ArrowLeft":
      myCar.speedX -= 1;
      break;


    case "ArrowRight":

      myCar.speedX += 1;
      break;

  }

  // this wpuld be a way to draw every time you click 
  // myCar.newPosition()
  // gameActions.clear()
  // myCar.draw()


});


document.addEventListener("keyup", () => {
  myCar.speedX = 0;
  myCar.speedY = 0;
})
