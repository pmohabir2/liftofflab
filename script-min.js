
function Cell()
{
	this.n = 1, this.s = 1, this.e = 1, this.w = 1, this.row = null, this.col =
		null, this.x = null, this.y = null
}

function generateMap()
{
	path = [];
	var e = [];
	initialize(e);
	var l = [],
		r = rows * cols - 1,
		a = map[rows - 1][cols - 1];
	exit = [a.row, a.col], e[a.row][a.col] = !1;
	for (var o = 1; r >= o;)
	{
		var t = getNeighbors(a, e);
		if (t.length > 0)
		{
			var i = t[Math.floor(Math.random() * t.length)];
			clearWalls(a, i), l.push(a), path.push(a), a = i, e[a.row][a.col] = !1, o +=
				1
		}
		else l.pop(), path.push(a), a = l[l.length - 1]
	}
}

function initialize(e)
{
	for (var l = 0, r = 0, a = 0; rows > a; a++)
	{
		map[a] = [], e[a] = [];
		for (var o = 0; cols > o; o++) map[a][o] = new Cell, map[a][o].row = a, map[
				a][o].col = o, map[a][o].x = l, map[a][o].y = r, l += floorSize, e[a][o] = !
			0;
		r += floorSize, l = 0
	}
}

function getNeighbors(e, l)
{
	var r = [],
		a = e.row,
		o = e.col;
	return 0 != a && l[a - 1][o] && r.push(map[a - 1][o]), a != rows - 1 && l[a +
		1][o] && r.push(map[a + 1][o]), 0 != o && l[a][o - 1] && r.push(map[a][o -
		1
	]), o != cols - 1 && l[a][o + 1] && r.push(map[a][o + 1]), r
}

function clearWalls(e, l)
{
	l.row < e.row ? (l.s = 0, e.n = 0) : l.row > e.row ? (l.n = 0, e.s = 0) : l.col <
		e.col ? (l.e = 0, e.w = 0) : (l.w = 0, e.e = 0)
}

function animate()
{
	var e = [],
		l = path,
		r = 0;
	window.clearInterval(game), null != animation && window.clearInterval(
		animation), ctx.clearRect(0, 0, WIDTH, HEIGHT), animation = setInterval(
		function()
		{
			current = l[r], r++, -1 == e.indexOf(current) ? (e.push(current), ctx.fillStyle =
					"#000000") : (ctx.fillStyle = "#000000", ctx.fillRect(current.x, current
					.y, floorSize, floorSize), ctx.fillStyle = "#000000"), current.n && ctx.fillRect(
					current.x, current.y, floorSize, wallSize), current.s && ctx.fillRect(
					current.x, current.y + floorSize, floorSize, wallSize), current.e && ctx
				.fillRect(current.x + floorSize, current.y, wallSize, floorSize), current
				.w && ctx.fillRect(current.x, current.y, wallSize, floorSize), r == l.length -
				1 && window.clearInterval(animation)
		}, 1)
}

function play()
{
	game = setInterval(function()
	{
		draw(), update()
	}, 30)
}

function clear()
{
	null != game && window.clearInterval(game), null != animation && window.clearInterval(
		animation)
}

function main()
{
	document.onkeydown = process_key_down, document.onkeyup = process_key_up,
		generateMap(), play(), document.getElementById("play").onclick = function()
		{
			clear(), play()
		}, document.getElementById("generate").onclick = function()
		{
			clear(), player.x = 0, player.y = 0, generateMap(), play()
		}
} /*player color*/
function draw()
{
	ctx.clearRect(0, 0, WIDTH, HEIGHT), ctx.fillStyle = "#000000", ctx.fillRect(
		player.x, player.y, player.size, player.size);
	for (var e = 0; rows > e; e++)
		for (var l = 0; cols > l; l++) e == exit[0] && l == exit[1] && /*end color*/
			(ctx.fillStyle = "#FF0000", ctx.fillRect(map[e][l].x, map[e][l].y,
				floorSize, floorSize)), /*maze color*/ ctx.fillStyle = "#000000", map[e][l]
			.n && ctx.fillRect(map[e][l].x, map[e][l].y, floorSize, wallSize), map[e][l]
			.s && ctx.fillRect(map[e][l].x, map[e][l].y + floorSize, floorSize,
				wallSize), map[e][l].e && ctx.fillRect(map[e][l].x + floorSize, map[e][l].y,
				wallSize, floorSize), map[e][l].w && ctx.fillRect(map[e][l].x, map[e][l].y,
				wallSize, floorSize)
}

function process_key_down(e)
{
	e = e || window.event, "87" == e.keyCode ? player.velY = -player.speed : "83" ==
		e.keyCode ? player.velY = player.speed : "68" == e.keyCode ? player.velX =
		player.speed : "65" == e.keyCode && (player.velX = -player.speed)
}

function process_key_up(e)
{
	e = e || window.event, "87" == e.keyCode || "83" == e.keyCode ? player.velY =
		0 : ("68" == e.keyCode || "65" == e.keyCode) && (player.velX = 0)
}

function update()
{
	if (0 == player.velX || 0 == player.velY)
	{
		var e = Math.floor(player.y / floorSize),
			l = Math.floor((player.y + player.size) / floorSize),
			r = Math.floor(player.x / floorSize),
			a = Math.floor((player.x + player.size) / floorSize);
		player.x += player.velX, player.x < 0 || player.x > WIDTH - player.size ?
			player.x -= player.velX : player.velX > 0 ? (r = Math.floor((player.x -
					player.speed) / floorSize), map[e][r].e || map[l][r].e ? player.x -=
				player.velX : horizontalWall(e, l, r) && (player.x -= player.velX), r =
				Math.floor(player.x / floorSize)) : player.velX < 0 && (a = Math.floor((
					player.x + floorSize) / floorSize), map[e][a].w || map[l][a].w ? player.x -=
				player.velX : horizontalWall(e, l, a) && (player.x -= player.velX), a =
				Math.floor((player.x + floorSize - player.speed) / floorSize)), player.y +=
			player.velY, player.y < 0 || player.y > HEIGHT - 2 * player.size ? player.y -=
			player.velY : player.velY > 0 ? (l = Math.floor((player.y + floorSize -
					player.speed) / floorSize), map[l][r].n || map[l][a].n ? player.y -=
				player.velY : verticalWall(r, a, l) && (player.y -= player.velY)) : player
			.velY < 0 && (e = Math.floor(player.y / floorSize), map[e][r].s || map[e][a]
				.s ? player.y -= player.velY : verticalWall(r, a, e) && (player.y -=
					player.velY));
		var o = Math.floor(player.y / floorSize),
			t = Math.floor(player.x / floorSize);
		o == exit[0] && t == exit[1] && end()
	}
}

function horizontalWall(e, l, r)
{
	return map[l][r].y > player.y && map[l][r].y < player.y + floorSize || map[e]
		[r].y > player.y && map[e][r].y < player.y + floorSize
}

function verticalWall(e, l, r)
{
	return map[r][l].x > player.x && map[r][l].x < player.x + floorSize || map[r]
		[e].x > player.x && map[r][e].x < player.x + floorSize
}

function end()
{
	window.clearInterval(game), alert("Congrats")
}
var floorSize = 10,
	wallSize = 1,
	player = {
		size: floorSize - 1,
		speed: 5,
		x: 0,
		y: 0,
		velX: 0,
		velY: 0
	},
	ctx = document.getElementById("game").getContext("2d");
ctx.canvas.width = Math.round((window.innerWidth - 2 * floorSize) / floorSize) *
	floorSize + wallSize;
var WIDTH = ctx.canvas.width - wallSize,
	HEIGHT = ctx.canvas.height - wallSize,
	rows = Math.floor(HEIGHT / floorSize),
	cols = Math.floor(WIDTH / floorSize),
	map = new Array(rows),
	exit = null,
	game = null,
	animation = null;
document.getElementById("animate").onclick = animate;

