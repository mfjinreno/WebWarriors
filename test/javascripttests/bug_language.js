//Author Nathan Borak

QUnit.test( "Infect", function( assert ) {
   var newBug = new BugModel(BugsTeam.Red, BugsMoves.Up, { code: "infect;" });
   assert.equal(!!newBug.isInvalid, false, newBug.isInvalid);
});

QUnit.test( "Move", function(assert) {
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.Up, { code: "moveRight;"});
	assert.equal(!!newBug.isInvalid, false, newBug.isInvalid);
});

QUnit.test( "If statement", function( assert ) {
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.Up, { code: "if(isEmpty){moveRight;}"});
	assert.equal(!!newBug.isInvalid, false, newBug.isInvalid);
});

QUnit.test( "Extra character", function( assert ) {
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.Up, { code: "if(!isEmpty){moveRight;}"});
	assert.equal(!!newBug.isInvalid, true, "Invalid code");
});

QUnit.test( "If/ElseIF", function( assert ) {
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.Up, { code: "if(isWall){infect;}elseif(isEmpty){moveForward;}"});
	assert.equal(!!newBug.isInvalid, false, newBug.isInvalid);
});

QUnit.test( "Missing if", function( assert ) {
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.Up, { code: "(){infect;}"});
	assert.equal(!!newBug.isInvalid, true, "Invalid code");
});

QUnit.test( "Missing boolean statement", function( assert ) {
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.Up, { code: "if(){infect}"});
	assert.equal(!!newBug.isInvalid, true, "Invalid code");
});

QUnit.test( "Missing }", function( assert ) {
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.Up, { code: "if(isEnemy){infect;"});
	assert.equal(!!newBug.isInvalid, true, "Invalid code");
});

QUnit.test( "Missing if", function( assert ) {
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.Up, { code: "()infect;}"});
	assert.equal(!!newBug.isInvalid, true, "Invalid code");
});

QUnit.test( "Incorrect control statement", function( assert ) {
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.Up, { code: "while(){infect;}"});
	assert.equal(!!newBug.isInvalid, true, "Invalid code");
});

QUnit.test( "Nested if", function( assert ) {
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.Up, { code: "if(isEmpty){if(isEmpty){infect;}}"});
	console.log(newBug.isInvalid);
	assert.equal(!!newBug.isInvalid, false, newBug.isInvalid);
});

QUnit.test( "Wrong command", function( assert ) {
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.Up, { code: "if(isEmpty){isEmpty;}"});
	assert.equal(!!newBug.isInvalid, true, "Invalid code");
});

QUnit.test( "Bad statement", function( assert ) {
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.Up, { code: "if(isWall == if (isEmpty)){infect;}"});
	assert.equal(!!newBug.isInvalid, true, "Invalid code");
});

QUnit.test( "Extra ()", function( assert ) {
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.Up, { code: "if(((((isEmpty))))){infect;}"});
	assert.equal(!!newBug.isInvalid, false, "Valid code");
});

QUnit.test( "Extra {}", function( assert ) {
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.Up, { code: "if(isEmpty){{{{{infect;}}}}"});
	assert.equal(!!newBug.isInvalid, true, "Invalid code");
});

QUnit.test( "Swapped () {}", function( assert ) {
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.Up, { code: "if{isEmpty}(infect;)"});
	assert.equal(!!newBug.isInvalid, true, "Invalid code");
});

QUnit.test("Spaced out code with comments", function(assert){
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.Up,
		{ code: "# Testing to see if dem comments work \n" +
		"if(infect){\n" +
		"	isEmpty\n" +
		"}\n"});
	assert.equal(!!newBug.isInvalid, false, newBug.isInvalid);
});

QUnit.test( "Nested if Swapped", function( assert ) {
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.Up, { code: "if(isEmpty){if{isEmpty}{infect;}}"});
	assert.equal(!!newBug.isInvalid, true, "Invalid code");
});

QUnit.test( "Spacing 1", function( assert ) {
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.Up, { code: "infect ;"});
	assert.equal(!!newBug.isInvalid, false, "Valid code");
});

QUnit.test( "Spacing 2", function( assert ) {
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.Up, { code: "  infect;"});
	assert.equal(!!newBug.isInvalid, false, "Valid code");
});

QUnit.test( "Spacing 3", function( assert ) {
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.Up, { code: "infect;  "});
	assert.equal(!!newBug.isInvalid, false, "Valid code");
});

QUnit.test( "Spacing 4", function( assert ) {
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.Up, { code: "if (   isEmpty)   {	infect ;			}"});
	assert.equal(!!newBug.isInvalid, false, "Valid code");
});

QUnit.test( "Spacing 5", function( assert ) {
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.Up, { code: "if (   isEmpty)   {	infect ;			}			"});
	assert.equal(!!newBug.isInvalid, false, "Valid code");
});

