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
    this.length++;
  }

  removeTail() {
    this.tail = this.tail.prev;
    this.tail.next = null;
    this.length--;
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

class Apple {
  constructor(position) {
    this.position = position;
  }
}

class SnakeGame {
  intervalId;

  constructor(canvas, display) {
    this.ctx = canvas.getContext("2d");
    this.center = {
      x: canvas.width / 2,
      y: canvas.height / 2,
    };
    this.display = display;
    this.gameParams = {
      snakeStart: {
        x: this.center.x - 100,
        y: this.center.y,
      },
      snakeLength: 10,
      speed: 1000 / 10,
    };
    this.snake = new Snake();
    this.apple = new Apple(this.center);
  }

  initiateGame() {
    this.drawBoard();
    this.drawApple();
    this.initiateSnake(this.gameParams.snakeLength, this.gameParams.snakeStart);
  }

  drawBoard() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  drawApple() {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.apple.position.x, this.apple.position.y, 10, 10);
  }

  initiateSnake(initialLength, position) {
    for (let i = 0; i < initialLength; i++) {
      this.snake.grow({
        x: position.x - 10 * i,
        y: position.y,
      });
    }
    this.drawSnake();
  }

  drawSnake() {
    let current = this.snake.head;
    while (current !== null) {
      this.ctx.fillStyle = "green";
      this.ctx.fillRect(current.position.x, current.position.y, 20, 20);
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
    this.handleEatingApple();
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

  isAppleEaten() {
    if (
      this.snake.head.position.x === this.apple.position.x &&
      this.snake.head.position.y === this.apple.position.y
    ) {
      return true;
    }
    return false;
  }

  handleEatingApple() {
    if (this.isAppleEaten()) {
      this.growSnake();
    }
  }

  growSnake() {
    const headPos = Object.assign({}, this.snake.head.position);
    switch (this.snake.direction) {
      case "RIGHT":
        headPos.x += 10;
        this.snake.addHead(headPos);
        break;
      case "LEFT":
        headPos.x -= 10;
        this.snake.addHead(headPos);
        break;
      case "UP":
        headPos.y -= 10;
        this.snake.addHead(headPos);
        break;
      case "DOWN":
        headPos.y += 10;
        this.snake.addHead(headPos);
        break;
    }
  }
}

function newGame() {
  const snakeGame = new SnakeGame(canvas, display);
  snakeGame.initiateGame();
  return snakeGame;
}

let game = newGame();
