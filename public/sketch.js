const
	columns = 50,
	rows = 25,
	width = 1800,
	height = 900;

let
	grid,
	pause = true,
	pauseButton;

function setup() {
	frameRate(15);
	grid = new Grid(columns, rows, width, height);

	createCanvas(width, height);
	strokeWeight(1.5);
	background(255);

	pauseButton = createButton('pause - unpause');
	pauseButton.mousePressed(function () {
		pause = !pause;
	});

	stroke(0);
	for (let i = 0; i <= columns; i++) {
		line(width / columns * i, 0, width / columns * i, height);
		for (let j = 0; j <= rows; j++) {
			line(0, height / rows * j, width, height / rows * j);
		}
	}
}

function mousePressed() {
	grid.changeCellState(mouseX, mouseY);
}

function keyPressed() {
	if (keyCode === 32) pause = !pause;
}

function draw() {
	if (!pause) grid.updateGrid();
	grid.showGrid();
}