/*Author Nathan Borak

 Edited by Michael Johnston
 - Added test cases for boolean and/or
*/
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

/*
QUnit.test( "Nested if", function( assert ) {
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.Up, { code: "if(isEmpty){if(isEmpty){infect;}}"});
	console.log(newBug.isInvalid);
	assert.equal(!!newBug.isInvalid, false, newBug.isInvalid);
});
*/
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


//Boolean testing- Written by Michael Johnston 5/7/16

/*
___Simple OR___
*/
QUnit.test("Simple boolean addition OR -infect", function(assert){
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.up, {
		code: "if(isEnemy or isFriend){infect;}"
	});
	assert.equal(!!newBug.isInvalid, false, newBug.isInvalid);
});

QUnit.test("Simple boolean addition OR -turnLeft", function(assert){
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.up, {
		code: "if(isEnemy or isFriend){turnLeft;}"
	});
	assert.equal(!!newBug.isInvalid, false, newBug.isInvalid);
});

QUnit.test("Simple boolean addition OR -turnRight", function(assert){
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.up, {
		code: "if(isEnemy or isFriend){turnRight;}"
	});
	assert.equal(!!newBug.isInvalid, false, newBug.isInvalid);
});


QUnit.test("Simple boolean addition OR -moveForward", function(assert){
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.up, {
		code: "if(isEnemy or isFriend){moveForward;}"
	});
	assert.equal(!!newBug.isInvalid, false, newBug.isInvalid);
});


/*
___Simple AND___
*/

QUnit.test("Simple boolean addition AND -infect", function(assert){
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.up, {
		code: "if(isEnemy and isWall){infect;}else{infect;}"
	});
	assert.equal(!!newBug.isInvalid, false, newBug.isInvalid);
});

QUnit.test("Simple boolean addition AND -turnLeft", function(assert){
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.up, {
		code: "if(isEnemy and isFriend){turnLeft;}else{infect;}"
	});
	assert.equal(!!newBug.isInvalid, false, newBug.isInvalid);
});

QUnit.test("Simple boolean addition AND -turnRight", function(assert){
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.up, {
		code: "if(isEnemy and isFriend){turnRight;}else{infect;}"
	});
	assert.equal(!!newBug.isInvalid, false, newBug.isInvalid);
});


QUnit.test("Simple boolean addition AND -moveForward", function(assert){
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.up, {
		code: "if(isEnemy and isFriend){moveForward;}else{infect;}"
	});
	assert.equal(!!newBug.isInvalid, false, newBug.isInvalid);
});

/*
-------OR in elsif--------
*/
QUnit.test("Boolean addition OR in elsif- turnRight", function(assert){
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.up, {
		code: "if(isEnemy){infect;}elsif(isWall or isFriend){turnRight;}"
	});
	assert.equal(!!newBug.isInvalid, false, newBug.isInvalid);
});

QUnit.test("Boolean addition OR in elsif- turnLeft", function(assert){
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.up, {
		code: "if(isEnemy){infect;}elsif(isWall or isFriend){turnLeft;}"
	});
	assert.equal(!!newBug.isInvalid, false, newBug.isInvalid);
});

QUnit.test("Boolean addition OR in elsif- moveForward", function(assert){
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.up, {
		code: "if(isEnemy){infect;}elsif(isWall or isFriend){moveForward;}"
	});
	assert.equal(!!newBug.isInvalid, false, newBug.isInvalid);
});

QUnit.test("Boolean addition OR in elsif- infect", function(assert){
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.up, {
		code: "if(isEnemy){infect;}elsif(isWall or isFriend){infect;}"
	});
	assert.equal(!!newBug.isInvalid, false, newBug.isInvalid);
});

/*
-------AND in elsif--------
*/

QUnit.test("Boolean addition AND in elsif- turnLeft", function(assert){
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.up, {
		code: "if(isEnemy){infect;}elsif(isWall and isFriend){turnLeft;}"
	});
	assert.equal(!!newBug.isInvalid, false, newBug.isInvalid);
});

QUnit.test("Boolean addition AND in elsif- moveForward", function(assert){
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.up, {
		code: "if(isEnemy){infect;}elsif(isWall and isFriend){moveForward;}"
	});
	assert.equal(!!newBug.isInvalid, false, newBug.isInvalid);
});

QUnit.test("Boolean addition AND in elsif- infect", function(assert){
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.up, {
		code: "if(isEnemy){infect;}elsif(isWall and isFriend){infect;}"
	});
	assert.equal(!!newBug.isInvalid, false, newBug.isInvalid);
});

QUnit.test("Boolean addition AND in elsif", function(assert){
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.up, {
		code: "if(isEnemy){infect;}elsif(isWall and isFriend){turnRight;}"
	});
	assert.equal(!!newBug.isInvalid, false, newBug.isInvalid);
});


/*
Some Complex cases OR
*/

QUnit.test("Complex boolean addition - multiple statements -OR", function(assert){
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.up, {
		code: "if((isEnemy or isFriend) or (isWall)){infect;}"
	});
	
	assert.equal(!!newBug.isInvalid, false, newBug.isInvalid);
});

QUnit.test("Complex boolean addition - multiple statements swapped -OR", function(assert){
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.up, {
		code: "if(isEnemy or (isFriend or isWall){infect;}"
	});
	
	assert.equal(!!newBug.isInvalid, false, newBug.isInvalid);
});


QUnit.test("Complex boolean addition - no paren -OR", function(assert){
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.up, {
		code: "if(isEnemy or isFriend or isWall){infect;}"
	});
	
	assert.equal(!!newBug.isInvalid, false, newBug.isInvalid);
});


/*
Some Complex cases AND
*/
QUnit.test("Complex boolean addition - multiple statements -AND", function(assert){
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.up, {
		code: "if((isEnemy and isFriend) and (isWall)){infect;}else{moveForward;}"
	});
	
	assert.equal(!!newBug.isInvalid, false, newBug.isInvalid);
});

QUnit.test("Complex boolean addition - multiple statements swapped -AND", function(assert){
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.up, {
		code: "if(isEnemy and (isFriend and isWall){infect;}else{moveForward;}"
	});
	
	assert.equal(!!newBug.isInvalid, false, newBug.isInvalid);
});


QUnit.test("Complex boolean addition - no paren -AND", function(assert){
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.up, {
		code: "if(isEnemy and isFriend and isWall){infect;}else{moveForward;}"
	});
	
	assert.equal(!!newBug.isInvalid, false, newBug.isInvalid);
});

/*
Invalid tests
*/

QUnit.test("Complex boolean addition - invalid paren", function(assert){
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.up, {
		code: "if(isEnemy (and (isFriend and isWall){infect;}else{moveForward;}"
	});
	
	assert.equal(!!newBug.isInvalid, true, "Invalid Code");
});

QUnit.test("Complex boolean addition two adjacent operators or and", function(assert){
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.up, {
		code: "if(isEnemy or and isFriend and isWall){infect;}else{moveForward;}"
	});
	
	assert.equal(!!newBug.isInvalid, true, "Invalid Code");
});

QUnit.test("Complex boolean addition two adjacent operators or or", function(assert){
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.up, {
		code: "if(isEnemy or or isFriend and isWall){infect;}else{moveForward;}"
	});
	
	assert.equal(!!newBug.isInvalid, true, "Invalid Code");
});

QUnit.test("Complex boolean addition two adjacent operators and and", function(assert){
	var newBug = new BugModel(BugsTeam.Red, BugsMoves.up, {
		code: "if(isEnemy and and isFriend and isWall){infect;}else{moveForward;}"
	});
	
	assert.equal(!!newBug.isInvalid, true, "Invalid Code");
});





//___________________Spacing tests____________________

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

