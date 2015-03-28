function play(){
	
	game = setInterval(function(){
		draw();
		update();
	}, 30);
}

function clear(){
	if(game != null)
		window.clearInterval(game);
	if(animation != null)
		window.clearInterval(animation);
}

function main(){

	document.onkeydown = process_key_down;
	document.onkeyup = process_key_up;
	generateMap();
	play();
	document.getElementById("play").onclick = function(){
		clear();
		play();
	};
	document.getElementById("generate").onclick = function(){
		clear();
		player.x = 0;
		player.y = 0;
		generateMap();
		play();
	};

}

function draw(){
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
	ctx.fillStyle = "#000000";
	ctx.fillRect(player.x, player.y, player.size, player.size);
	for(var i = 0; i < rows; i++){
		for(var j = 0; j < cols; j++){
			if(i == exit[0] && j == exit[1]){
				ctx.fillStyle = "#FF0000";
				ctx.fillRect(map[i][j].x, map[i][j].y, floorSize, floorSize);
			}
			ctx.fillStyle = "#000000";
			if(map[i][j].n)
				ctx.fillRect(map[i][j].x, map[i][j].y, floorSize, wallSize);
			if(map[i][j].s)
				ctx.fillRect(map[i][j].x, map[i][j].y + floorSize, floorSize, wallSize);
			if(map[i][j].e)
				ctx.fillRect(map[i][j].x + floorSize, map[i][j].y, wallSize, floorSize);
			if(map[i][j].w)
				ctx.fillRect(map[i][j].x, map[i][j].y, wallSize, floorSize);
		}
	}
}

function process_key_down(e){
	e = e || window.event;
	if(e.keyCode == '87'){
		player.velY = -player.speed;
	}
	else if(e.keyCode == '83')
		player.velY = player.speed;
	else if(e.keyCode == '68')
		player.velX = player.speed;
	else if(e.keyCode == '65')
		player.velX = -player.speed;

	
}

function process_key_up(e){
	e = e || window.event;
	if(e.keyCode == '87' || e.keyCode == '83')

		player.velY = 0;
	else if(e.keyCode == '68' || e.keyCode == '65')
		player.velX = 0;
}

function update(){
	if(player.velX != 0 && player.velY != 0) return;

	var top = Math.floor(player.y/floorSize);
	var bottom = Math.floor((player.y+player.size)/floorSize);
	var left = Math.floor(player.x/floorSize);
	var right = Math.floor((player.x+player.size)/floorSize);

	player.x += player.velX; 
	if(player.x < 0 || player.x > WIDTH-player.size)
		player.x -= player.velX;
	else if(player.velX > 0){
		left = Math.floor((player.x-player.speed)/floorSize);
		if(map[top][left].e || map[bottom][left].e)
			player.x -= player.velX;
		else if(horizontalWall(top, bottom, left))
			player.x -= player.velX;
		left = Math.floor(player.x/floorSize);
	} else if(player.velX < 0){
		right = Math.floor((player.x+floorSize)/floorSize);
		if(map[top][right].w || map[bottom][right].w)
			player.x -= player.velX;
		else if(horizontalWall(top, bottom, right))
			player.x -= player.velX;
		right = Math.floor((player.x+floorSize-player.speed)/floorSize);
	}

	player.y += player.velY;
	if(player.y < 0 || player.y > HEIGHT-player.size*2)
		player.y -= player.velY;
	else if(player.velY > 0){
		bottom = Math.floor((player.y+floorSize-player.speed)/floorSize);
		if(map[bottom][left].n || map[bottom][right].n)
			player.y -= player.velY;
		else if(verticalWall(left, right, bottom))
				player.y -= player.velY;
	} else if(player.velY < 0){
		top = Math.floor(player.y/floorSize);
		if(map[top][left].s || map[top][right].s)
			player.y -= player.velY;
		else if(verticalWall(left, right, top))
				player.y -= player.velY;
	}
	
	var row = Math.floor(player.y/floorSize);
	var col = Math.floor(player.x/floorSize);
	if(row == exit[0] && col == exit[1]) end();
}

// Check exact to prevent player from being in two different rows getting stuck in a wall.
// returns true if coliision found with north or south wall.
function horizontalWall(top, bottom, dir){
	return ((map[bottom][dir].y > player.y && map[bottom][dir].y < player.y + floorSize)
	 || (map[top][dir].y > player.y && map[top][dir].y < player.y + floorSize));
}

// Check exact to prevent player from being in two different cols getting stuck in a wall.
// returns true if coliision found with left or right wall.
function verticalWall(left, right, dir){
	return ((map[dir][right].x > player.x && map[dir][right].x < player.x + floorSize)
	 || (map[dir][left].x > player.x && map[dir][left].x < player.x + floorSize));
}

function end(){
	window.clearInterval(game);
	alert("Congrats");
}
