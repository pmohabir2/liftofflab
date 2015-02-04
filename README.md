<h1>description</h1>
This is a webpage that features a simple maze game, using a depth-first maze generation algorithm.<br>
See the maze in action <a href="http://jotran.github.io/maze/">here</a>.<br>
The black box is the player, the red box is the goal.<br>
The play button is used to play - the player can move and try to solve the maze.<br>
The animate button is used to animate the maze generation algorithm. The gray cells represent any backtracking.<br>
The generate button is used to generate another maze.<br>
<h1>notes</h1>
The javascript code is split into three different files for easier management and understanding.<br>
<code>script-min.js</code> - the minified version of all the javascript files combined.<br>
<code>global.js</code> - all global variables to adjust the maze's cell size or player size, speed, etc.<br>
<code>map.js</code> - all the map generating and animating functions.<br>
<code>game.js</code> - main function that does the actual drawing, updating, playing and clearing of the game.<br>
