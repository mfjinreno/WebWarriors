QUnit.test( "Board of size 1", function( assert ) {
var flag = true;
var testVar = new BoardModel(1);
if(testVar.board.length != 1) {flag = false;}
for (var i = 0; i<testVar.board.length; i++)
{
  if (testVar.board[i].length != 1)
  {
    flag = false;
  }
}
assert.ok(flag, "Board is size 1");
});


QUnit.test( "Board of size 2", function( assert ) {
var flag = true;
var testVar = new BoardModel(2);
if(testVar.board.length != 2) {flag = false;}
for (var i = 0; i<testVar.board.length; i++)
{
  if (testVar.board[i].length != 2)
  {
    flag = false;
  }
}
assert.ok(flag, "Board is size 2");
});


QUnit.test( "Board of size 5", function( assert ) {
var flag = true;
var testVar = new BoardModel(5);
if(testVar.board.length != 5) {flag = false;}
for (var i = 0; i<testVar.board.length; i++)
{
  if (testVar.board[i].length != 5)
  {
    flag = false;
  }
}
assert.ok(flag, "Board is size 5");
});

QUnit.test( "Board of size 8", function( assert ) {
  var flag = true;
  var testVar = new BoardModel(8);
  if(testVar.board.length != 8) {flag = false;}
  for (var i = 0; i<testVar.board.length; i++)
  {
    if (testVar.board[i].length != 8)
    {
      flag = false;
    }
  }
  assert.ok(flag, "Board is size 8");
});

QUnit.test( "Board of size 16", function( assert ) {
  var flag = true;
  var testVar = new BoardModel(16);
  if(testVar.board.length != 16) {flag = false;}
  for (var i = 0; i<testVar.board.length; i++)
  {
    if (testVar.board[i].length != 16)
    {
      flag = false;
    }
  }
  assert.ok(flag, "Board is size 16");
});


QUnit.test( "Board of size 100", function( assert ) {
var flag = true;
var testVar = new BoardModel(100);
if(testVar.board.length != 100) {flag = false;}
for (var i = 0; i<testVar.board.length; i++)
{
  if (testVar.board[i].length != 100)
  {
    flag = false;
  }
}
assert.ok(flag, "Board is size 100");
});