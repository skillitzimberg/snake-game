const canvas = document.getElementById("board");
const page = document.getElementsByTagName("body")[0];
page.addEventListener("keydown", (e) => handleArrowKey(e.key));

function handleArrowKey(direction) {
  switch (direction) {
    case "ArrowUp":
      snakeGame.moveSnakeUp();
      break;
    case "ArrowDown":
      snakeGame.moveSnakeDown();
      break;
    case "ArrowLeft":
      snakeGame.moveSnakeLeft();
      break;
    case "ArrowRight":
      snakeGame.moveSnakeRight();
      break;
  }
}

class SnakeGame {
  intervalId;
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.center = {
      width: canvas.width / 2,
      height: canvas.height / 2,
    };
    this.snake = {
      posX: this.center.width,
      posY: this.center.height,
    };
    this.snakeSpeed = 1000 / 300;
  }

  drawBoard() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  drawSnake() {
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(this.snake.posX, this.snake.posY, 10, 10);
  }

  moveSnakeUp() {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(
      () => ((this.snake.posY -= 1), this.renderGame()),
      this.snakeSpeed
    );
  }

  moveSnakeDown() {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(
      () => ((this.snake.posY += 1), this.renderGame()),
      this.snakeSpeed
    );
  }

  moveSnakeLeft() {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(
      () => ((this.snake.posX -= 1), this.renderGame()),
      this.snakeSpeed
    );
  }

  moveSnakeRight() {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(
      () => ((this.snake.posX += 1), this.renderGame()),
      this.snakeSpeed
    );
  }

  renderGame() {
    this.drawBoard();
    this.drawSnake();
  }
}

const snakeGame = new SnakeGame(canvas);
snakeGame.renderGame();
