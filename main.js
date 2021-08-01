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
  }

  addHead(position) {
    let newHead = new SnakeSegment(position);

    this.head.prev = newHead;
    newHead.next = this.head;
    this.head = newHead;
    console.log(this);
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
    let newPos = Object.assign({}, this.head.position);
    newPos.y -= 10;
    this.addHead(newPos);
    this.removeTail();
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
    this.snakeDetails = {
      headX: this.center.width - 100,
      headY: this.center.height,
      length: 150,
      speed: 1000 / 300,
    };
    this.snake = new Snake();
  }

  drawBoard() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  initiateSnake(initialLength) {
    for (let i = 0; i < initialLength; i++) {
      this.snake.grow({
        x: this.snakeDetails.headX - 10 * i,
        y: this.snakeDetails.headY,
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
    this.snake.moveUp();
    this.redrawGame();
  }

  redrawGame() {
    this.drawBoard();
    this.drawSnake();
  }

  initiateGame() {
    this.drawBoard();
    this.initiateSnake(5);
  }
}

const snakeGame = new SnakeGame(canvas);
snakeGame.initiateGame();
