var floorSize = 10;
var wallSize = 1;
var player = {
	size: floorSize - 1,
	speed: 5,
	x: 0,
	y: 0,
	velX: 0,
	velY: 0
};
var ctx = document.getElementById("game").getContext("2d");
ctx.canvas.width = Math.round((window.innerWidth - floorSize*2) / floorSize)*floorSize + wallSize;
var WIDTH = ctx.canvas.width - wallSize; 
var HEIGHT = ctx.canvas.height - wallSize;
var rows = Math.floor(HEIGHT/floorSize);
var cols = Math.floor(WIDTH/floorSize);
var map = new Array(rows);
var exit = null;
var game = null;
var animation = null;
