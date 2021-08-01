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

    console.log(this);
    this.length++;
    return this;
  }

  moveUp() {
    let current = this.head;
    let startingPos = Object.assign({}, this.head.position);

    while (current !== null) {
      // If current is the head . . .
      if (current.prev === null) {
        current.position.posY -= 10;
        current = current.next;
        console.log(current.position);
      } else {
        console.log(current.position);
        current.position = startingPos;
        console.log(current.position);
        current = current.next;
        if (current !== null) {
          startingPos = Object.assign({}, current.position);
        }
      }
    }
  }

  moveRight() {
    let current = this.head;
    let startingPos = Object.assign({}, this.head.position);

    while (current !== null) {
      // If current is the head . . .
      if (current.prev === null) {
        current.position.posX += 10;
        current = current.next;
        console.log(current.position);
      } else {
        console.log(current.position);
        current.position = startingPos;
        console.log(current.position);
        current = current.next;
        if (current !== null) {
          startingPos = Object.assign({}, current.position);
        }
      }
    }
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
        posX: this.snakeDetails.headX - 10 * i,
        posY: this.snakeDetails.headY,
      });
    }
    this.drawSnake();
  }

  drawSnake() {
    let current = this.snake.head;
    while (current !== null) {
      this.ctx.fillStyle = "green";
      this.ctx.fillRect(current.position.posX, current.position.posY, 10, 10);
      current = current.next;
    }
  }

  moveSnakeUp() {
    console.log("move up");
    this.snake.moveUp();
    this.redrawGame();
  }

  moveSnakeDown() {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(
      () => ((this.snakeDetails.headY += 1), this.redrawGame()),
      this.snakeDetails.speed
    );
  }

  moveSnakeLeft() {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(
      () => (this.snake.moveRight(), this.redrawGame()),
      this.snakeDetails.speed
    );
  }

  moveSnakeRight() {
    console.log("move right");
    // clearInterval(this.intervalId);
    // this.intervalId = setInterval(
    //   () => ((this.snakeDetails.headX += 1), this.redrawGame()),
    //   this.snakeDetails.speed
    // );
    this.snake.moveRight();
    this.redrawGame();
  }

  redrawGame() {
    this.drawBoard();
    this.drawSnake();
  }

  initiateGame() {
    this.drawBoard();
    this.initiateSnake(10);
  }
}

const snakeGame = new SnakeGame(canvas);
snakeGame.initiateGame();
