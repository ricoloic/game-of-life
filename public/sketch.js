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

Cell.prototype.show = function () {
	if (this.isAlive) fill(0);
	else fill(255);
	rect(this.x, this.y, this.xSize, this.ySize);
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
		for (let j = 0; j < rows; j++) {
			arr[i][j] = new Cell(i * xSize, j * ySize, xSize, ySize, i, j);
		}
	}

	return arr;
}

const columns = 20, rows = 10, width = 1000, height = 500;
let grid;

function findCell(x, y) {
	for (let i = 0; i < columns; i++) {
		for (let j = 0; j < rows; j++) {
			if (grid[i][j].contains(mouseX, mouseY)) return grid[i][j];
		}
	}
	return null;
}

function getNeighbourCells() {
}

function updateGrid() {
	for (let i = 0; i < columns; i++) {
		for (let j = 0; j < rows; j++) {
			grid[i][j].show();
		}
	}
}

function setup() {
	grid = make2DArray(columns, rows);

	createCanvas(width, height);
	strokeWeight(2);

	for (let i = 0; i <= columns; i++) {
		line(width / columns * i, 0, width / columns * i, height);
		for (let j = 0; j <= rows; j++) {
			line(0, height / rows * j, width, height / rows * j);
		}
	}
}

function mousePressed() {
	const clickedCell = findCell(mouseX, mouseY);
	if (clickedCell) clickedCell.changeState();
}

function draw() {
	updateGrid();
}