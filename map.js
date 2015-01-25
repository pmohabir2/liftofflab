function Cell(){
	this.n = 1;
	this.s = 1;
	this.e = 1;
	this.w = 1;
	this.row = null;
	this.col = null;
	this.x = null;
	this.y = null;
}

function generateMap(){
	var unvisited = [];
	initialize(unvisited);
	var stack = [];
	var size = rows*cols - 1;
	var current = map[rows-1][cols-1];
	exit = [current.row, current.col];
	unvisited[current.row][current.col] = false;
	var visited = 1;
	while(visited <= size){
		var neighbors = getNeighbors(current, unvisited);
		if(neighbors.length > 0){
			var next = neighbors[Math.floor(Math.random() * neighbors.length)];
			clearWalls(current, next);
			stack.push(current);
			current = next;
			unvisited[current.row][current.col] = false;
			visited += 1;
		} else{
			stack.pop();
			current = stack[stack.length-1];
		}
	}
}

function initialize(unvisited){
	var mapX = 0;
	var mapY = 0;
	for(var i = 0; i < rows; i++){
		map[i] = [];
		unvisited[i] = [];
		for(var j = 0; j < cols; j++){
			map[i][j] = new Cell();
			map[i][j].row = i;
			map[i][j].col = j;
			map[i][j].x = mapX;
			map[i][j].y = mapY;
			mapX += floorSize;
			unvisited[i][j] = true;
		}
		mapY += floorSize;
		mapX = 0;
	}
}

function getNeighbors(current, unvisited){
	var neighbors = [];
	var row = current.row;
	var col = current.col;
	if(row != 0 && unvisited[row-1][col])
		neighbors.push(map[row - 1][col]);
	if(row != rows-1 && unvisited[row+1][col])
		neighbors.push(map[row + 1][col]);
	if(col != 0 && unvisited[row][col-1])
		neighbors.push(map[row][col - 1]);
	if(col != cols-1 && unvisited[row][col+1])
		neighbors.push(map[row][col + 1]);
	return neighbors;
}

function clearWalls(current, next){
	if(next.row < current.row){
		next.s = 0;
		current.n = 0;
	} else if(next.row > current.row){
		next.n = 0;
		current.s = 0;
	} else if(next.col < current.col){
		next.e = 0;
		current.w = 0;
	} else{
		next.w = 0;
		current.e = 0;
	}
}
