// GAME VARIABLES
let speed = 5;
let lastPantTime = 0;
let dinoVelY = 0;
let cloudVelX = 2;
let obstacleVelX = 1;
let dino = document.getElementsByClassName('dinoImage')[0];
let cloudArray = [
	{ top: 15, right: 15 },
	{ top: 25, right: 25 },
	{ top: 25, right: 25 },
];
let obstacleDiv = document.getElementsByClassName('obstacle-div')[0];
let scoreDiv = document.getElementById('score');
let score = 0;
let gameOver = false;

let cactusPathArray = [
	'static/img/Cactus/LargeCactus1.png',
	'static/img/Cactus/LargeCactus2.png',
	'static/img/Cactus/LargeCactus3.png',
	'static/img/Cactus/smallCactus1.png',
	'static/img/Cactus/smallCactus2.png',
	'static/img/Cactus/smallCactus3.png',
];

let obstacle = document.getElementById('obstacle');
let dinoX, dinoY, obstacleX, obstacleY, obstacleVelValue;
let randomChoiceOfBird,
	randomChoiceOfCactus,
	randomChoiceOfHeightOfBird,
	randomChoiceOfObstacle,
	randomChoiceOfHeightOfCactus,
	randomObstacleObject;

// Game Sounds
let hitSound = new Audio('static/audio/hit.wav');
let pointSound = new Audio('static/audio/point.wav');
let wingSound = new Audio('static/audio/wing.wav');

// Game Methods
function mainGame(currentTime) {
	window.requestAnimationFrame(mainGame);
	if ((currentTime - lastPantTime) / 1000 <= 1 / speed) {
		return;
	}
	lastPantTime = currentTime;
	gameEngine();
}

function gameEngine() {
	window.addEventListener('keydown', (e) => {
		// Jumping Dinosaur on Up Arrow Key and Space Bar Key
		switch (e.key) {
			case 'ArrowUp':
				dino.style.top = '8%';
				wingSound.play();
				setTimeout(() => {
					dino.style.top = '46%';
				}, 300);
				break;

			case ' ':
				dino.style.top = '8%';
				wingSound.play();
				setTimeout(() => {
					dino.style.top = '46%';
				}, 300);
				break;

			default:
				break;
		}
	});

	dinoX = parseInt(
		window.getComputedStyle(dino, null).getPropertyValue('left')
	);
	dinoY = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));
	obstacleX = parseInt(
		window.getComputedStyle(obstacle, null).getPropertyValue('left')
	);
	obstacleY = parseInt(
		window.getComputedStyle(obstacle, null).getPropertyValue('top')
	);
	if (obstacleX < 0) {
		randomObstacleObject = getRandomObstacle();
		obstacle.src = randomObstacleObject.src;
		obstacle.style.top = `${randomObstacleObject.height}%`;
	}

	console.log(Math.abs(dinoX - obstacleX), Math.abs(dinoY - obstacleY));

	// Checking for Game Over
	if (Math.abs(dinoX - obstacleX) <= 100 && Math.abs(dinoY - obstacleY) <= 50) {
		gameOver = true;
	}

	if (
		Math.abs(dinoX - obstacleX) <= 100 &&
		!Math.abs(dinoY - obstacleY) <= 50
	) {
		score += 10;
		scoreDiv.innerText = `Score: ${score}`;
		pointSound.play();
	}

	if (gameOver) {
		hitSound.play();
		alert(`gameOver. Your Score is ${score}`);
		gameOver = false;
		location.reload();
	}
}

// Function for getting random coordinates and random obstacles
function getRandomObstacle() {
	randomChoiceOfObstacle = Math.floor(Math.random() * 2 + 1);

	// If bird is random obstacle
	if (randomChoiceOfObstacle === 1) {
		// randomChoiceOfBird = Math.floor(Math.random()*2 + 1);
		randomChoiceOfHeightOfBird = 40;
		return {
			src: 'static/img/Bird/Bird1.png',
			height: randomChoiceOfHeightOfBird,
		};
	}

	// If cactus is random obstacle
	else if (randomChoiceOfObstacle === 2) {
		randomChoiceOfCactus = Math.floor(Math.random() * 6 + 1);
		// Small Cactus is obstacle
		if (randomChoiceOfCactus > 3) {
			randomChoiceOfHeightOfCactus = 50;
		}
		// Large Cactus is obstacle
		else {
			randomChoiceOfHeightOfCactus = 46;
		}

		return {
			src: cactusPathArray[randomChoiceOfCactus - 1],
			height: randomChoiceOfHeightOfCactus,
		};
	}
}

// Game Starts Here
window.requestAnimationFrame(mainGame);
