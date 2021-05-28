function Cell(x, y, xSize, ySize, columnIndex, rowIndex, isAlive = false) {
	this.x = x;
	this.y = y;
	this.xSize = xSize;
	this.ySize = ySize;
	this.columnIndex = columnIndex;
	this.rowIndex = rowIndex;
	this.isAlive = isAlive;
}

Cell.prototype.contains = function (x, y) {
	if (
		x >= this.x &&
		x <= this.x + this.xSize &&
		y >= this.y &&
		y <= this.y + this.ySize
	) return true;
	return false;
}

Cell.prototype.getColumnIndex = function () {
	return this.columnIndex;
}

Cell.prototype.getRowIndex = function () {
	return this.rowIndex;
}

Cell.prototype.show = function () {
	if (this.isAlive) fill(0);
	else fill(255);
	rect(this.x, this.y, this.xSize, this.ySize);
}

Cell.prototype.update = function(nbrOfAliveNeighbourCells) {
	if (nbrOfAliveNeighbourCells) {
		if (this.isAlive && nbrOfAliveNeighbourCells < 2) this.changeState();
		else if (this.isAlive && nbrOfAliveNeighbourCells > 3) this.changeState();
		else if (!this.isAlive && nbrOfAliveNeighbourCells === 3) this.changeState();
	}
}

Cell.prototype.changeState = function () {
		this.isAlive = !this.isAlive;
}

function make2DArray(cols, rows) {
	const
		arr = new Array(cols),
		xSize = width / cols,
		ySize = height / rows;

	for (let i = 0; i < cols; i++) {
		arr[i] = new Array(rows);
		for (let j = 0; j < rows; j++)
			arr[i][j] = new Cell(i * xSize, j * ySize, xSize, ySize, i, j);
	}

	return arr;
}

const columns = 130, rows = 65, width = 1000, height = 500;
let grid, pause = false, pauseButton;

function findCell(x, y) {
	for (let i = 0; i < columns; i++) {
		for (let j = 0; j < rows; j++)
			if (grid[i][j].contains(mouseX, mouseY)) return grid[i][j];
	}
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
		columnIndex = cell.getColumnIndex(),
		rowIndex = cell.getRowIndex();
	neighbourCells.push(
		isValidNeighbourCell(columnIndex - 1, rowIndex - 1)
			? grid[columnIndex - 1][rowIndex - 1] : null);
	neighbourCells.push(
		isValidNeighbourCell(columnIndex, rowIndex - 1)
			? grid[columnIndex][rowIndex - 1] : null);
	neighbourCells.push(
		isValidNeighbourCell(columnIndex + 1, rowIndex - 1)
			? grid[columnIndex + 1][rowIndex - 1] : null);
	neighbourCells.push(
		isValidNeighbourCell(columnIndex - 1, rowIndex)
			? grid[columnIndex - 1][rowIndex] : null);
	neighbourCells.push(
		isValidNeighbourCell(columnIndex + 1, rowIndex)
			? grid[columnIndex + 1][rowIndex] : null);
	neighbourCells.push(
		isValidNeighbourCell(columnIndex - 1, rowIndex + 1)
			? grid[columnIndex - 1][rowIndex + 1] : null);
	neighbourCells.push(
		isValidNeighbourCell(columnIndex, rowIndex + 1)
			? grid[columnIndex][rowIndex + 1] : null);
	neighbourCells.push(
		isValidNeighbourCell(columnIndex + 1, rowIndex + 1)
			? grid[columnIndex + 1][rowIndex + 1] : null);
	return neighbourCells;
}

function evaluateNeighbourCells(neighbourCells) {
	let alive = 0;
	for (let i = 0; i < neighbourCells.length; i++)
		if (neighbourCells[i]?.isAlive) alive += 1;
	return alive;
}

function updateGrid() {
	for (let i = 0; i < columns; i++) {
		for (let j = 0; j < rows; j++) {
			const cell = grid[i][j];
			if (!pause) {
				const neighbourCells = getNeighbourCells(cell);
				const nbrOfAliveNeighbourCells = evaluateNeighbourCells(neighbourCells);
				cell.update(nbrOfAliveNeighbourCells);
			}
			cell.show();
		}
	}
}

function setup() {
	grid = make2DArray(columns, rows);

	createCanvas(width, height);
	strokeWeight(2);
	background(255);

	pauseButton = createButton(!pause ? 'stop' : 'start');
	pauseButton.mousePressed(function () { pause = !pause; });

	// for (let i = 0; i <= columns; i++) {
	// 	line(width / columns * i, 0, width / columns * i, height);
	// 	for (let j = 0; j <= rows; j++) {
	// 		line(0, height / rows * j, width, height / rows * j);
	// 	}
	// }
}

function changeCellState() {
	const clickedCell = findCell(mouseX, mouseY);
	if (clickedCell) clickedCell.changeState();
}

function mousePressed() {
	changeCellState();
}

function draw() {
	// pauseButton.text(!pause ? 'stop' : 'start');
	updateGrid();
}