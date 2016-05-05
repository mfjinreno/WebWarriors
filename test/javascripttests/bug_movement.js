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