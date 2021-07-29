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
      headX: this.center.width - 100,
      headY: this.center.height,
      length: 150,
      speed: 1000 / 300,
    };
  }

  drawBoard() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  drawSnake() {
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(this.snake.headX, this.snake.headY, 10, 10);
    for (let i = 0; i < this.snake.length; i++) {
      this.ctx.fillStyle = "green";
      this.ctx.fillRect(this.snake.headX - i + 1, this.snake.headY, 10, 10);
    }
  }

  moveSnakeUp() {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(
      () => ((this.snake.headY -= 1), this.renderGame()),
      this.snake.speed
    );
  }

  moveSnakeDown() {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(
      () => ((this.snake.headY += 1), this.renderGame()),
      this.snake.speed
    );
  }

  moveSnakeLeft() {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(
      () => ((this.snake.headX -= 1), this.renderGame()),
      this.snake.speed
    );
  }

  moveSnakeRight() {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(
      () => ((this.snake.headX += 1), this.renderGame()),
      this.snake.speed
    );
  }

  renderGame() {
    this.drawBoard();
    this.drawSnake();
  }
}

const snakeGame = new SnakeGame(canvas);
snakeGame.renderGame();
