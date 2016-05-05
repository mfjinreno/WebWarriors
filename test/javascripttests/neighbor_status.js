//Author Nathan Borak

QUnit.test( "Faces wall", function( assert ) {
	var board = new BoardModel(1);
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.Up, { code: "moveForward;"});
	board.setPosition(newBug, 0, 0);
	var code = board.getNeighbor(newBug);
	assert.equal(code, "isWall", "Should return wall");
});

QUnit.test( "Faces Allied Bug", function( assert ) {
	var board = new BoardModel(2);
	var newBug1 = new BugModel(BugsTeam.Red, BugsMoves.Up, { code: "moveForward;"});
	var newBug2 = new BugModel(BugsTeam.Red, BugsMoves.Up, { code: "moveForward;"});
	board.setPosition(newBug2, 0, 0);
	board.setPosition(newBug1, 1, 0);
	var code = board.getNeighbor(newBug1);
	assert.equal(code, "isFriend", "Should return friend");
});

QUnit.test( "Faces enemy Bug", function( assert ) {
	var board = new BoardModel(2);
	var newBug1 = new BugModel(BugsTeam.Blue, BugsMoves.Up, { code: "moveForward;"});
	var newBug2 = new BugModel(BugsTeam.Red, BugsMoves.Up, { code: "moveForward;"});
	board.setPosition(newBug1, 1, 0);
	board.setPosition(newBug2, 0, 0);
	var code = board.getNeighbor(newBug1);
	assert.equal(code, "isEnemy", "Should return enemy");
});

QUnit.test( "Faces nothing", function( assert ) {
	var board = new BoardModel(2);
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.Down, { code: "moveForward;"});
	board.setPosition(newBug, 0, 0);
	var code = board.getNeighbor(newBug);
	assert.equal(code, "isEmpty", "Should return empty");
});

QUnit.test( "Faces wall left", function( assert ) {
	var board = new BoardModel(1);
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.Left, { code: "moveForward;"});
	board.setPosition(newBug, 0, 0);
	var code = board.getNeighbor(newBug);
	assert.equal(code, "isWall", "Should return wall");
});

QUnit.test( "Faces Allied Bug", function( assert ) {
	var board = new BoardModel(2);
	var newBug1 = new BugModel(BugsTeam.Red, BugsMoves.Down, { code: "moveForward;"});
	var newBug2 = new BugModel(BugsTeam.Red, BugsMoves.Up, { code: "moveForward;"});
	board.setPosition(newBug1, 0, 0);
	board.setPosition(newBug2, 1, 0);
	var code = board.getNeighbor(newBug1);
	assert.equal(code, "isFriend", "Should return friend");
});

QUnit.test( "Faces enemy Bug right", function( assert ) {
	var board = new BoardModel(2);
	var newBug1 = new BugModel(BugsTeam.Blue, BugsMoves.Right, { code: "moveForward;"});
	var newBug2 = new BugModel(BugsTeam.Red, BugsMoves.Up, { code: "moveForward;"});
	board.setPosition(newBug1, 0, 0);
	board.setPosition(newBug2, 0, 1);
	var code = board.getNeighbor(newBug1);
	assert.equal(code, "isEnemy", "Should return enemy");
});

QUnit.test( "Faces nothing", function( assert ) {
	var board = new BoardModel(2);
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.Down, { code: "moveForward;"});
	board.setPosition(newBug, 0, 0);
	var code = board.getNeighbor(newBug);
	assert.equal(code, "isEmpty", "Should return empty");
});