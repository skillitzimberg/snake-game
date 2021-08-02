const DEV = true;

document
  .getElementsByTagName("body")[0]
  .addEventListener("keydown", (e) => handleArrowKey(e.key));

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

const display = document.getElementById("display");
display.addEventListener("click", (e) => {
  if (e.target.id === "reset") {
    display.classList.toggle("hidden");
    game = newGame();
  }
});

class Apple {
  constructor(xMax, yMax, size) {
    this.position = {
      x: Math.floor(Math.random() * xMax),
      y: Math.floor(Math.random() * yMax),
    };
    this.size = size;
    this.center = {
      x: this.position.x + this.size / 2,
      y: this.position.y + this.size / 2,
    };
  }

  isEaten(snakeHead, snakeHeadSize) {
    return !(
      (
        snakeHead.position.x >= this.position.x + this.size || // head is RIGHT of apple
        snakeHead.position.x + snakeHeadSize <= this.position.x || // head is LEFT of apple
        snakeHead.position.y >= this.position.y + this.size || // head is BELOW apple
        snakeHead.position.y + snakeHeadSize <= this.position.y
      ) // head is ABOVE apple
    );
  }
}

class SnakeSegment {
  constructor(position, dims) {
    this.position = position;
    this.dims = dims;
    this.prev = null;
    this.next = null;
  }
}

class Snake {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
    this.direction = "RIGHT";
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

  isEatingItself(position) {
    if (
      this.head.position.x === position.x &&
      this.head.position.y === position.y
    ) {
      return true;
    }
    return false;
  }
}

class SnakeGame {
  intervalId;

  constructor(canvas, display, scoreBoard) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.canvasCenter = {
      x: Math.floor(canvas.width / 2),
      y: Math.floor(canvas.height / 2),
    };
    this.display = display;
    this.scoreBoard = scoreBoard;
    this.snake = new Snake();
    this.apple = new Apple(canvas.width, canvas.height);
    this.score = 0;
    this.gameOver = false;
    if (DEV) {
      this.params = {
        snakeStart: {
          x: this.apple.position.x - 100,
          y: this.apple.position.y,
        },
        snakeLength: 20,
        snakeSpeed: 1000 / 5,
        gamePieceWidth: 10,
      };
    } else {
      this.params = {
        snakeStart: {
          x: this.canvasCenter.x - 100,
          y: this.canvasCenter.y,
        },
        snakeLength: 20,
        snakeSpeed: 1000 / 10,
        gamePieceWidth: 10,
      };
    }
  }

  initiateGame() {
    this.drawBoard();
    this.drawApple();
    this.initiateSnake(this.params.snakeLength, this.params.snakeStart);
    this.scoreBoard.innerText = "0";
  }

  drawBoard() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawApple() {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(
      this.apple.position.x,
      this.apple.position.y,
      this.params.gamePieceWidth,
      this.params.gamePieceWidth
    );
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
      this.ctx.fillRect(
        current.position.x,
        current.position.y,
        this.params.gamePieceWidth,
        this.params.gamePieceWidth
      );
      current = current.next;
    }
  }

  moveSnakeUp() {
    if (this.snake.direction === "DOWN") return;

    clearInterval(this.intervalId);
    this.intervalId = setInterval(
      () => (this.snake.moveUp(), this.redraw()),
      this.params.snakeSpeed
    );
  }

  moveSnakeDown() {
    if (this.snake.direction === "UP") return;

    clearInterval(this.intervalId);
    this.intervalId = setInterval(
      () => (this.snake.moveDown(), this.redraw()),
      this.params.snakeSpeed
    );
  }

  moveSnakeRight() {
    if (this.snake.direction === "LEFT") return;

    clearInterval(this.intervalId);
    this.intervalId = setInterval(
      () => (this.snake.moveRight(), this.redraw()),
      this.params.snakeSpeed
    );
  }

  moveSnakeLeft() {
    if (this.snake.direction === "RIGHT") return;

    clearInterval(this.intervalId);
    this.intervalId = setInterval(
      () => (this.snake.moveLeft(), this.redraw()),
      this.params.snakeSpeed
    );
  }

  redraw() {
    this.handleOutOfBounds();
    this.handleEatingItself();
    this.handleEatingApple();
    this.drawBoard();
    this.drawApple();
    this.drawSnake();
  }

  isOutOfBounds() {
    if (
      this.snake.head.position.x <= 0 ||
      this.snake.head.position.x >= this.canvas.width ||
      this.snake.head.position.y <= 0 ||
      this.snake.head.position.y >= this.canvas.height
    ) {
      return true;
    }
    return false;
  }

  handleOutOfBounds() {
    if (this.isOutOfBounds()) {
      this.stopGame();
    }
  }

  stopGame() {
    clearInterval(this.intervalId);
    this.display.classList.toggle("hidden");
  }

  handleEatingApple() {
    if (this.apple.isEaten(this.snake.head, this.params.gamePieceWidth)) {
      this.score++;
      this.scoreBoard.innerText = `${this.score}`;
      this.growSnake();
      this.apple = new Apple(this.canvas.width, this.canvas.height);
    }
  }

  handleEatingItself() {
    let current = this.snake.head.next;
    while (current !== null) {
      if (this.snake.isEatingItself(current.position)) {
        this.stopGame();
      }
      current = current.next;
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
function resizeCanvasToDisplaySize(canvas) {
  // look up the size the canvas is being displayed
  const clientWidth = canvas.clientWidth;
  const clientHeight = canvas.clientHeight;

  // If it's resolution does not match change it
  if (canvas.width !== clientWidth || canvas.height !== clientHeight) {
    canvas.width = clientWidth;
    canvas.height = clientHeight;
    return true;
  }

  return false;
}

function newGame() {
  const snakeGame = new SnakeGame(
    document.getElementById("board"),
    display,
    document.getElementById("score")
  );
  snakeGame.initiateGame();
  return snakeGame;
}
resizeCanvasToDisplaySize(document.getElementById("board"));
let game = newGame();
