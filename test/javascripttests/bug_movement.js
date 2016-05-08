/*Created by Nathan Borak
-all tests not marked explicitely as Nate's were written by Michael Johnston

Edited by Michael Johnston 5/7/16
-Added test to check for boolean movement

Edited by Michael Johnston 5/8/16
-added lots of tests to check for boolean movement.


*/

//Author Nathan Borak
QUnit.test( "Moving forward from down", function( assert ) {
	var board = new BoardModel(2);
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.Up, { code: "moveForward;"});
	board.setPosition(newBug, 0, 0);
	board.makeMove(newBug, BugsMoves.Down);
	newPosition = board.getPosition(newBug);
	var flag = true;
	var code = [1, 0];
	for (var i = 0; i<newPosition.length && i<code.length; i++)
	{
		if (code[i] != newPosition[i])
		{
			flag = false;
		}
	}
	assert.ok(flag, "Should return [1, 0]");
});

//Author Nathan Borak
QUnit.test( "Moving forward from up", function( assert ) {
	var board = new BoardModel(2);
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.Up, { code: "moveForward;"});
	board.setPosition(newBug, 1, 0);
	board.makeMove(newBug, BugsMoves.Up);
	newPosition = board.getPosition(newBug);
	var code = [0, 0];
	var flag = true;
	for (var i = 0; i<newPosition.length && i<code.length; i++)
	{
		if (code[i] != newPosition[i])
		{
			flag = false;
		}
	}
	assert.ok(flag, "Should return [0, 0]");
});

//Author Nathan Borak
QUnit.test( "Moving left from up", function( assert ) {
	var board = new BoardModel(2);
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.Up, { code: "moveLeft;"});
	board.setPosition(newBug, 0, 1);
	board.makeMove(newBug, BugsMoves.Left);
	newPosition = board.getPosition(newBug);
	var code = [0, 0];
	var flag = true;
	for (var i = 0; i<newPosition.length && i<code.length; i++)
	{
		if (code[i] != newPosition[i])
		{
			flag = false;
		}
	}
	assert.ok(flag, "Should return [0, 0]");
});

//Author Nathan Borak
QUnit.test( "Moving into wall", function( assert ) {
	var board = new BoardModel(2);
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.Up, { code: "moveForward;"});
	board.setPosition(newBug, 0, 0);
	board.makeMove(newBug, BugsMoves.Up);
	newPosition = board.getPosition(newBug);
	var code = new Array(0, 0);
	var flag = true;
	for (var i = 0; i<newPosition.length && i<code.length; i++)
	{
		if (code[i] != newPosition[i])
		{
			flag = false;
		}
	}
	assert.ok(flag, "Should return [0, 0]");
});

/*
-------Boolean Movement Tests--------
Created 5/7/16 by Michael Johnston



*/


/*
_____________Into Wall IF- OR_____________
*/
QUnit.test( "Moving into wall or statement", function( assert ) {
	var board = new BoardModel(10);
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.Up, { code: "if(isWall or isFriend){moveRight;}"});
	board.setPosition(newBug, 0, 0);
	// Creates the bugs code that can be called based on the neighbor
    var bugCode = new BugInterpreter("if(isWall or isFriend){moveRight;}");

    var neighbor = board.getNeighbor(newBug);
	var move = function(neighbor) {
        return bugCode(neighbor);
    };
    var globalMove = newBug.getGlobalMove(move(neighbor));
    board.makeMove(newBug, globalMove);


	newPosition = board.getPosition(newBug);
	var arr = new Array(0, 1);
	var flag = true;
	for (var i = 0; i<newPosition.length && i<arr.length; i++)
	{
		if (arr[i] != newPosition[i])
		{
			flag = false;
		}
	}
	assert.ok(flag, "Should return [0, 1]");
	assert.equal(newBug.direction, BugsMoves.Right, "Bug Turned Right");
	assert.equal(globalMove, BugsMoves.Right,"global worked");
});

QUnit.test( "Moving into wall or statement- switched", function( assert ) {
	var board = new BoardModel(10);
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.Up, { code: "if(isFriend or isWall){moveRight;}"});
	board.setPosition(newBug, 0, 0);
	// Creates the bugs code that can be called based on the neighbor
    var bugCode = new BugInterpreter("if(isFriend or isWall){moveRight;}");

    var neighbor = board.getNeighbor(newBug);
	var move = function(neighbor) {
        return bugCode(neighbor);
    };
    var globalMove = newBug.getGlobalMove(move(neighbor));
    board.makeMove(newBug, globalMove);


	newPosition = board.getPosition(newBug);
	var arr = new Array(0, 1);
	var flag = true;
	for (var i = 0; i<newPosition.length && i<arr.length; i++)
	{
		if (arr[i] != newPosition[i])
		{
			flag = false;
		}
	}
	assert.ok(flag, "Should return [0, 1]");
	assert.equal(newBug.direction, BugsMoves.Right, "Bug Turned Right");
	assert.equal(globalMove, BugsMoves.Right,"global worked");
});

QUnit.test( "Moving into wall or statement -turnRight", function( assert ) {
	var board = new BoardModel(10);
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.Up, { code: "if(isWall or isFriend){turnRight;}"});
	board.setPosition(newBug, 0, 0);
	// Creates the bugs code that can be called based on the neighbor
    var bugCode = new BugInterpreter("if(isWall or isFriend){turnRight;}");

    var neighbor = board.getNeighbor(newBug);
	var move = function(neighbor) {
        return bugCode(neighbor);
    };
    var globalMove = newBug.getGlobalMove(move(neighbor));
    board.makeMove(newBug, globalMove);


	newPosition = board.getPosition(newBug);
	var arr = new Array(0, 0);
	var flag = true;
	for (var i = 0; i<newPosition.length && i<arr.length; i++)
	{
		if (arr[i] != newPosition[i])
		{
			flag = false;
		}
	}
	assert.ok(flag, "Should return [0, 0]");
	assert.equal(newBug.direction, BugsMoves.SRight, "Bug Turned Right");
	assert.equal(globalMove, BugsMoves.SRight,"global worked");
});

QUnit.test( "Moving into wall or statement- switched -turnRight", function( assert ) {
	var board = new BoardModel(10);
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.Up, { code: "if(isFriend or isWall){turnRight;}"});
	board.setPosition(newBug, 0, 0);
	// Creates the bugs code that can be called based on the neighbor
    var bugCode = new BugInterpreter("if(isFriend or isWall){turnRight;}");

    var neighbor = board.getNeighbor(newBug);
	var move = function(neighbor) {
        return bugCode(neighbor);
    };
    var globalMove = newBug.getGlobalMove(move(neighbor));
    board.makeMove(newBug, globalMove);


	newPosition = board.getPosition(newBug);
	var arr = new Array(0, 0);
	var flag = true;
	for (var i = 0; i<newPosition.length && i<arr.length; i++)
	{
		if (arr[i] != newPosition[i])
		{
			flag = false;
		}
	}
	assert.ok(flag, "Should return [0, 0]");
	assert.equal(newBug.direction, BugsMoves.SRight, "Bug Turned Right");
	assert.equal(globalMove, BugsMoves.SRight,"global worked");
});

/*
_____________Into Wall IF- OR_____________
*/

QUnit.test( "Moving into wall or statement ELSIF", function( assert ) {
	var board = new BoardModel(10);
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.Up, { code: "if(isEnemy){infect;}elsif(isWall or isFriend){moveRight;}else{moveForward;}"});
	board.setPosition(newBug, 0, 0);
	// Creates the bugs code that can be called based on the neighbor
    var bugCode = new BugInterpreter("if(isEnemy){infect;}elsif(isWall or isFriend){moveRight;}else{moveForward;}");

    var neighbor = board.getNeighbor(newBug);
	var move = function(neighbor) {
        return bugCode(neighbor);
    };
    var globalMove = newBug.getGlobalMove(move(neighbor));
    board.makeMove(newBug, globalMove);


	newPosition = board.getPosition(newBug);
	var arr = new Array(0, 1);
	var flag = true;
	for (var i = 0; i<newPosition.length && i<arr.length; i++)
	{
		if (arr[i] != newPosition[i])
		{
			flag = false;
		}
	}
	assert.ok(flag, "Should return [0, 1]");
	assert.equal(newBug.direction, BugsMoves.Right, "Bug Turned Right");
	assert.equal(globalMove, BugsMoves.Right,"global worked");
});
QUnit.test( "Moving into wall or statement- switched ELSIF", function( assert ) {
	var board = new BoardModel(10);
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.Up, { code: "if(isEnemy){infect;}elsif(isFriend or isWall){moveRight;}else{moveForward;}"});
	board.setPosition(newBug, 0, 0);
	// Creates the bugs code that can be called based on the neighbor
    var bugCode = new BugInterpreter("if(isEnemy){infect;}elsif(isFriend or isWall){moveRight;}else{moveForward;}");

    var neighbor = board.getNeighbor(newBug);
	var move = function(neighbor) {
        return bugCode(neighbor);
    };
    var globalMove = newBug.getGlobalMove(move(neighbor));
    board.makeMove(newBug, globalMove);


	newPosition = board.getPosition(newBug);
	var arr = new Array(0, 1);
	var flag = true;
	for (var i = 0; i<newPosition.length && i<arr.length; i++)
	{
		if (arr[i] != newPosition[i])
		{
			flag = false;
		}
	}
	assert.ok(flag, "Should return [0, 1]");
	assert.equal(newBug.direction, BugsMoves.Right, "Bug Turned Right");
	assert.equal(globalMove, BugsMoves.Right,"global worked");
});

QUnit.test( "Moving into wall or statement -turnRight ELSIF", function( assert ) {
	var board = new BoardModel(10);
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.Up, { code: "if(isEnemy){infect;}elsif(isWall or isFriend){turnRight;}else{moveForward;}"});
	board.setPosition(newBug, 0, 0);
	// Creates the bugs code that can be called based on the neighbor
    var bugCode = new BugInterpreter("if(isEnemy){infect;}elsif(isWall or isFriend){turnRight;}else{moveForward;}");

    var neighbor = board.getNeighbor(newBug);
	var move = function(neighbor) {
        return bugCode(neighbor);
    };
    var globalMove = newBug.getGlobalMove(move(neighbor));
    board.makeMove(newBug, globalMove);


	newPosition = board.getPosition(newBug);
	var arr = new Array(0, 0);
	var flag = true;
	for (var i = 0; i<newPosition.length && i<arr.length; i++)
	{
		if (arr[i] != newPosition[i])
		{
			flag = false;
		}
	}
	assert.ok(flag, "Should return [0, 0]");
	assert.equal(newBug.direction, BugsMoves.SRight, "Bug Turned Right");
	assert.equal(globalMove, BugsMoves.SRight,"global worked");
});

QUnit.test( "Moving into wall or statement- switched -turnRight ELSIF", function( assert ) {
	var board = new BoardModel(10);
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.Up, { code: "if(isEnemy){infect;}elsif(isFriend or isWall){turnRight;}else{moveForward;}"});
	board.setPosition(newBug, 0, 0);
	// Creates the bugs code that can be called based on the neighbor
    var bugCode = new BugInterpreter("if(isEnemy){infect;}elsif(isFriend or isWall){turnRight;}else{moveForward;}");

    var neighbor = board.getNeighbor(newBug);
	var move = function(neighbor) {
        return bugCode(neighbor);
    };
    var globalMove = newBug.getGlobalMove(move(neighbor));
    board.makeMove(newBug, globalMove);


	newPosition = board.getPosition(newBug);
	var arr = new Array(0, 0);
	var flag = true;
	for (var i = 0; i<newPosition.length && i<arr.length; i++)
	{
		if (arr[i] != newPosition[i])
		{
			flag = false;
		}
	}
	assert.ok(flag, "Should return [0, 0]");
	assert.equal(newBug.direction, BugsMoves.SRight, "Bug Turned Right");
	assert.equal(globalMove, BugsMoves.SRight,"global worked");
});

/*
_____________Into EMPTY -ELSIF_____________
*/

QUnit.test( "Moving into empty or statement ELSIF", function( assert ) {
	var board = new BoardModel(10);
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.Right, { code: "if(isEnemy){infect;}elsif(isWall or isFriend){moveRight;}else{moveForward;}"});
	board.setPosition(newBug, 0, 0);
	// Creates the bugs code that can be called based on the neighbor
    var bugCode = new BugInterpreter("if(isEnemy){infect;}elsif(isWall or isFriend){moveRight;}else{moveForward;}");

    var neighbor = board.getNeighbor(newBug);
	var move = function(neighbor) {
        return bugCode(neighbor);
    };
    var globalMove = newBug.getGlobalMove(move(neighbor));
    board.makeMove(newBug, globalMove);


	newPosition = board.getPosition(newBug);
	var arr = new Array(0, 1);
	var flag = true;
	for (var i = 0; i<newPosition.length && i<arr.length; i++)
	{
		if (arr[i] != newPosition[i])
		{
			flag = false;
		}
	}
	assert.ok(flag, "Should return [0, 1]");
	assert.equal(newBug.direction, BugsMoves.Right, "Bug moved forward");
	assert.equal(globalMove, BugsMoves.Right,"Global Worked");
});

QUnit.test( "Moving into empty or statement IF", function( assert ) {
	var board = new BoardModel(10);
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.Right, { code: "if(isEnemy or isWall){infect;}else{moveForward;}"});
	board.setPosition(newBug, 0, 0);
	// Creates the bugs code that can be called based on the neighbor
    var bugCode = new BugInterpreter("if(isEnemy or isWall){infect;}else{moveForward;}");

    var neighbor = board.getNeighbor(newBug);
	var move = function(neighbor) {
        return bugCode(neighbor);
    };
    var globalMove = newBug.getGlobalMove(move(neighbor));
    board.makeMove(newBug, globalMove);


	newPosition = board.getPosition(newBug);
	var arr = new Array(0, 1);
	var flag = true;
	for (var i = 0; i<newPosition.length && i<arr.length; i++)
	{
		if (arr[i] != newPosition[i])
		{
			flag = false;
		}
	}
	assert.ok(flag, "Should return [0, 1]");
	assert.equal(newBug.direction, BugsMoves.Right, "Bug moved forward");
	assert.equal(globalMove, BugsMoves.Right,"Global Worked");
});
