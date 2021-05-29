function Cell(x, y, columnIndex, rowIndex, isAlive = false) {
	this.x = x;
	this.y = y;
	this.columnIndex = columnIndex;
	this.rowIndex = rowIndex;
	this.isAlive = isAlive;
}

Cell.prototype.contains = function (x, y, xSize, ySize) {
	if (
		x >= this.x &&
		x <= this.x + xSize &&
		y >= this.y &&
		y <= this.y + ySize
	) return true;
	return false;
}

Cell.prototype.show = function (xSize, ySize) {
	if (this.isAlive) fill(255);
	else fill(0);
	rect(this.x, this.y, xSize, ySize);
}

Cell.prototype.getNewUpdated = function (nbrOfAliveNeighbourCells) {
	if (!this.isAlive && nbrOfAliveNeighbourCells === 3)
		return new Cell(this.x, this.y, this.columnIndex, this.rowIndex, true);
	else if (this.isAlive && (nbrOfAliveNeighbourCells < 2 || nbrOfAliveNeighbourCells > 3))
		return new Cell(this.x, this.y, this.columnIndex, this.rowIndex);
	return new Cell(this.x, this.y, this.columnIndex, this.rowIndex, this.isAlive);
}

Cell.prototype.changeState = function () {
	this.isAlive = !this.isAlive;
}
