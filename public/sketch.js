const
	columns = 50,
	rows = 25,
	width = 1000,
	height = 500,
	xSize = width / columns,
	ySize = height / rows;

let
	grid,
	pause = true,
	pauseButton;

function make2DArray(cols, rows, callback = null) {
	const arr = new Array(cols);
	for (let i = 0; i < cols; i++) {
		arr[i] = new Array(rows);
		if (callback)
			for (let j = 0; j < rows; j++)
				arr[i][j] = callback(i, j);
	}
	return arr;
}

function findCell(x, y) {
	for (let i = 0; i < columns; i++)
		for (let j = 0; j < rows; j++)
			if (grid[i][j].contains(mouseX, mouseY, xSize, ySize)) return grid[i][j];
	return null;
}

function isValidNeighbourCell(columnIndex, rowIndex) {
	if (grid[columnIndex] && grid[columnIndex][rowIndex])
		return true;
	return false;
}

function getNeighbourCells(cell) {
	const
		neighbourCells = [],
		columnIndex = cell.columnIndex,
		rowIndex = cell.rowIndex,
		neighboursIndex = [
			[columnIndex - 1, rowIndex - 1],
			[columnIndex, rowIndex - 1],
			[columnIndex + 1, rowIndex - 1],
			[columnIndex - 1, rowIndex],
			[columnIndex + 1, rowIndex],
			[columnIndex - 1, rowIndex + 1],
			[columnIndex, rowIndex + 1],
			[columnIndex + 1, rowIndex + 1]
		];

	for (let i = 0; i < neighboursIndex.length; i++)
		neighbourCells.push(
			isValidNeighbourCell(neighboursIndex[i][0], neighboursIndex[i][1])
				? grid[neighboursIndex[i][0]][neighboursIndex[i][1]] : null);
	return neighbourCells;
}

function evaluateNeighbourCells(neighbourCells) {
	let alive = 0;
	for (let i = 0; i < neighbourCells.length; i++)
		if (neighbourCells[i]?.isAlive) alive += 1;
	return alive;
}

function updateGrid() {
	const nextGrid = make2DArray(columns, rows);
	for (let i = 0; i < columns; i++)
		for (let j = 0; j < rows; j++) {
			const cell = grid[i][j];
			const neighbourCells = getNeighbourCells(cell);
			const nbrOfAliveNeighbourCells = evaluateNeighbourCells(neighbourCells);
			nextGrid[i][j] = cell.getNewUpdated(nbrOfAliveNeighbourCells);
		}
	grid = nextGrid;
}

function showGrid() {
	for (let i = 0; i < columns; i++)
		for (let j = 0; j < rows; j++)
			grid[i][j].show(xSize, ySize);
}

function changeCellState() {
	const clickedCell = findCell(mouseX, mouseY);
	if (clickedCell) clickedCell.changeState();
}

function setup() {
	frameRate(15);
	grid = make2DArray(columns, rows, (i, j) =>
		new Cell(i * xSize, j * ySize, i, j));

	createCanvas(width, height);
	strokeWeight(0);
	background(0);

	pauseButton = createButton('pause - unpause');
	pauseButton.mousePressed(function () {
		pause = !pause;
	});

	// for (let i = 0; i <= columns; i++) {
	// 	line(width / columns * i, 0, width / columns * i, height);
	// 	for (let j = 0; j <= rows; j++) {
	// 		line(0, height / rows * j, width, height / rows * j);
	// 	}
	// }
}

function mousePressed() {
	changeCellState();
}

function keyPressed() {
	if (keyCode === 32) pause = !pause;
}

function draw() {
	if (!pause) updateGrid();
	showGrid();
}