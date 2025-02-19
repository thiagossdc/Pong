const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

canvas.width = 800;
canvas.height = 400;

const paddleWidth = 10, paddleHeight = 80;
const player1 = { x: 10, y: (canvas.height - paddleHeight) / 2, dy: 0 };
const player2 = { x: canvas.width - paddleWidth - 10, y: (canvas.height - paddleHeight) / 2, dy: 0 };

const ball = { x: canvas.width / 2, y: canvas.height / 2, radius: 7, dx: 5, dy: 3 };

const keys: { [key: string]: boolean } = {};

document.addEventListener("keydown", (event) => (keys[event.key] = true));
document.addEventListener("keyup", (event) => (keys[event.key] = false));

function movePaddles() {
    if (keys["w"] && player1.y > 0) player1.y -= 6;
    if (keys["s"] && player1.y < canvas.height - paddleHeight) player1.y += 6;

    if (keys["ArrowUp"] && player2.y > 0) player2.y -= 6;
    if (keys["ArrowDown"] && player2.y < canvas.height - paddleHeight) player2.y += 6;
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;


    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.dy *= -1;
    }

    if (
        (ball.x - ball.radius < player1.x + paddleWidth &&
            ball.y > player1.y &&
            ball.y < player1.y + paddleHeight) ||
        (ball.x + ball.radius > player2.x &&
            ball.y > player2.y &&
            ball.y < player2.y + paddleHeight)
    ) {
        ball.dx *= -1; 
    }

    if (ball.x < 0 || ball.x > canvas.width) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx *= -1;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "black";
    ctx.fillRect(player1.x, player1.y, paddleWidth, paddleHeight);
    ctx.fillRect(player2.x, player2.y, paddleWidth, paddleHeight);

    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
}

function gameLoop() {
    movePaddles();
    moveBall();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
