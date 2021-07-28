const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

function drawBoard() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

drawBoard();
