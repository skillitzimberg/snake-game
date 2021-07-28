class SnakeGame {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.center = {
      width: canvas.width / 2,
      height: canvas.height / 2,
    };
  }

  drawBoard() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  drawSnake() {
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(this.center.width, this.center.height - 20, 10, 10);
  }

  renderGame() {
    this.drawBoard();
    this.drawSnake();
  }
}

const canvas = document.getElementById("board");
const snakeGame = new SnakeGame(canvas);
snakeGame.renderGame();
