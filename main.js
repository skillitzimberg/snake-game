const canvas = document.getElementById("board");
const display = document.getElementById("display");
display.addEventListener("click", (e) => {
  if (e.target.id === "reset") {
    this.display.classList.toggle("hidden");
    game = newGame();
  }
});
const page = document.getElementsByTagName("body")[0];
page.addEventListener("keydown", (e) => handleArrowKey(e.key));

function handleArrowKey(direction) {
  switch (direction) {
    case "ArrowUp":
      game.moveSnakeUp();
      break;
    case "ArrowDown":
      game.moveSnakeDown();
      break;
    case "ArrowLeft":
      game.moveSnakeLeft();
      break;
    case "ArrowRight":
      game.moveSnakeRight();
      break;
  }
}

class SnakeSegment {
  constructor(position) {
    this.position = position;
    this.prev = null;
    this.next = null;
  }
}

class Snake {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
    this.direction = "";
  }

  addHead(position) {
    let newHead = new SnakeSegment(position);
    this.head.prev = newHead;
    newHead.next = this.head;
    this.head = newHead;
  }

  removeTail() {
    this.tail = this.tail.prev;
    this.tail.next = null;
  }

  grow(position) {
    let newSegment = new SnakeSegment(position);

    if (!this.head) {
      this.head = newSegment;
      this.tail = newSegment;
    } else {
      this.tail.next = newSegment;
      newSegment.prev = this.tail;
      this.tail = newSegment;
    }

    this.length++;
    return this;
  }

  moveUp() {
    this.direction = "UP";
    let newPos = Object.assign({}, this.head.position);
    newPos.y -= 10;
    this.addHead(newPos);
    this.removeTail();
  }

  moveDown() {
    this.direction = "DOWN";
    let newPos = Object.assign({}, this.head.position);
    newPos.y += 10;
    this.addHead(newPos);
    this.removeTail();
  }

  moveRight() {
    this.direction = "RIGHT";
    let newPos = Object.assign({}, this.head.position);
    newPos.x += 10;
    this.addHead(newPos);
    this.removeTail();
  }

  moveLeft() {
    this.direction = "LEFT";
    let newPos = Object.assign({}, this.head.position);
    newPos.x -= 10;
    this.addHead(newPos);
    this.removeTail();
  }
}

class SnakeGame {
  intervalId;

  constructor(canvas, display) {
    this.ctx = canvas.getContext("2d");
    this.center = {
      width: canvas.width / 2,
      height: canvas.height / 2,
    };
    this.display = display;
    this.gameParams = {
      headX: this.center.width - 100,
      headY: this.center.height,
      snakeLength: 10,
      speed: 1000 / 20,
    };
    this.snake = new Snake();
  }

  drawBoard() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  drawApple() {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.center.width, this.center.height, 10, 10);
  }

  initiateSnake(initialLength) {
    for (let i = 0; i < initialLength; i++) {
      this.snake.grow({
        x: this.gameParams.headX - 10 * i,
        y: this.gameParams.headY,
      });
    }
    this.drawSnake();
  }

  drawSnake() {
    let current = this.snake.head;
    while (current !== null) {
      this.ctx.fillStyle = "green";
      this.ctx.fillRect(current.position.x, current.position.y, 10, 10);
      current = current.next;
    }
  }

  moveSnakeUp() {
    if (this.snake.direction === "DOWN") return;

    clearInterval(this.intervalId);
    this.intervalId = setInterval(
      () => (this.snake.moveUp(), this.redraw()),
      this.gameParams.speed
    );
  }

  moveSnakeDown() {
    if (this.snake.direction === "UP") return;

    clearInterval(this.intervalId);
    this.intervalId = setInterval(
      () => (this.snake.moveDown(), this.redraw()),
      this.gameParams.speed
    );
  }

  moveSnakeRight() {
    if (this.snake.direction === "LEFT") return;

    clearInterval(this.intervalId);
    this.intervalId = setInterval(
      () => (this.snake.moveRight(), this.redraw()),
      this.gameParams.speed
    );
  }

  moveSnakeLeft() {
    if (this.snake.direction === "RIGHT") return;

    clearInterval(this.intervalId);
    this.intervalId = setInterval(
      () => (this.snake.moveLeft(), this.redraw()),
      this.gameParams.speed
    );
  }

  redraw() {
    this.handleOutOfBounds();
    this.drawBoard();
    this.drawApple();
    this.drawSnake();
  }

  isOutOfBounds() {
    if (
      this.snake.head.position.x <= 0 ||
      this.snake.head.position.x >= canvas.width ||
      this.snake.head.position.y <= 0 ||
      this.snake.head.position.y >= canvas.height
    ) {
      return true;
    }
    return false;
  }

  handleOutOfBounds() {
    if (this.isOutOfBounds()) {
      clearInterval(this.intervalId);
      this.display.classList.toggle("hidden");
    }
  }

  initiateGame() {
    this.drawBoard();
    this.drawApple();
    this.initiateSnake(this.gameParams.snakeLength);
  }
}

function newGame() {
  const snakeGame = new SnakeGame(canvas, display);
  snakeGame.initiateGame();
  return snakeGame;
}

let game = newGame();
