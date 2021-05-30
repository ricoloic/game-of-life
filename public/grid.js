function Grid(cols, rows, width, height) {
	this.cols = cols;
	this.rows = rows;
	this.width = width;
	this.height = height;
	this.xRez = width / cols;
	this.yRez = height / rows;
	this.gridArray = (function () {
		const arr = new Array(cols);
		for (let i = 0; i < cols; i++) {
			arr[i] = new Array(rows);
			for (let j = 0; j < rows; j++)
				arr[i][j] = new Cell(i * (width / cols), j * (height / rows), i, j);
		}
		return arr;
	})()
}

Grid.prototype.findCell = function (x, y) {
	for (let i = 0; i < columns; i++)
		for (let j = 0; j < rows; j++)
			if (this.gridArray[i][j].contains(x, y, this.xRez, this.yRez)) return this.gridArray[i][j];
	return null;
}

Grid.prototype.isValidNeighbourCell = function (columnIndex, rowIndex) {
	return !!(this.gridArray[columnIndex] && this.gridArray[columnIndex][rowIndex]);
}

Grid.prototype.getNeighbourCells = function (cell) {
	const
		neighbourCells = [],
		i = cell.columnIndex,
		j = cell.rowIndex,
		neighboursIndex = [
			[i - 1, j - 1],
			[i, j - 1],
			[i + 1, j - 1],
			[i - 1, j],
			[i + 1, j],
			[i - 1, j + 1],
			[i, j + 1],
			[i + 1, j + 1]
		];

	for (let i = 0; i < neighboursIndex.length; i++)
		neighbourCells.push(
			this.isValidNeighbourCell(neighboursIndex[i][0], neighboursIndex[i][1])
				? this.gridArray[neighboursIndex[i][0]][neighboursIndex[i][1]] : null);
	return neighbourCells;
}

Grid.prototype.evaluateNeighbourCells = function (neighbourCells) {
	let alive = 0;
	for (let i = 0; i < neighbourCells.length; i++)
		if (neighbourCells[i]?.isAlive) alive += 1;
	return alive;
}

Grid.prototype.makeNextGrid = function () {
	const arr = new Array(this.cols);
	for (let i = 0; i < this.cols; i++) {
		arr[i] = new Array(this.rows);
	}
	return arr;
}

Grid.prototype.updateGrid = function () {
	const nextGrid = this.makeNextGrid();
	for (let i = 0; i < this.cols; i++)
		for (let j = 0; j < this.rows; j++) {
			const cell = this.gridArray[i][j];
			const neighbourCells = this.getNeighbourCells(cell);
			const nbrOfAliveNeighbourCells = this.evaluateNeighbourCells(neighbourCells);
			nextGrid[i][j] = cell.getNewUpdated(nbrOfAliveNeighbourCells);
		}
	this.gridArray = nextGrid;
}

Grid.prototype.showGrid = function () {
	for (let i = 0; i < columns; i++)
		for (let j = 0; j < rows; j++)
			this.gridArray[i][j].show(this.xRez, this.yRez);
}

Grid.prototype.changeCellState = function (x, y) {
	const cell = this.findCell(x, y);
	if (cell)	cell.changeState();
}
