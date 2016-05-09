/**
 * Created by Lucas Rodriguez on 4/9/16.
 * A object that controls all the game
 *
 * Edited by Michael Johnston 5/8/16
 * -changed neighbor to array, which takes front->[0] right->[1] left->[2] 
 */
var GameController = function(bugs, size, bugsCount){
    var self = this;

    // Does some checks to make sure the parameters passed in are
    // correctly formatted
    if(!Array.isArray(bugs)) {
        console.error("Bugs is not an array");
        return undefined;
    }
    if(bugs.length != 2){
        console.error("Bugs array is not correct length");
        return undefined;
    }
    if(bugsCount > size * size) {
        console.error("Bugs Count is too high");
        return undefined;
    }

    self.bugsCount = bugsCount;

    // Creates the board model
    self.board = new BoardModel(size);

    // Gets the board
    self.getBoard = function(){
        return self.board.board;
    };

    // Runs a round
    // Iterates through all the bugs and has them make a move and then
    // updates the board
    self.runRound = function(){
      self.board.getBugs().forEach(function(el){

          var neighbor = new Array(3);
          neighbor[0] = self.board.getNeighbor(el);
          neighbor[1] = self.board.getNeighborRight(el);
          neighbor[2] = self.board.getNeighborLeft(el);
          var move = el.makeMove(neighbor);
          self.board.makeMove(el, move);
      });
    };

    // Checks to see if there is currently only one bug
    self.gameOver = function(){
	    var bugs = self.board.getBugs();
	    var firstTeam = bugs[0].team;
	    return bugs.some(function(el){
	        return el != firstTeam;
	    });
    };

    // Gets the BugId winner of the winning bug
	self.getWinner = function(){
		var bugIdCount = {};
		self.board.getBugs().forEach(function(el){
			if(!bugIdCount.hasOwnProperty(el.bugId)){
				bugIdCount[el.bugId] = 0;
			}
			bugIdCount[el.bugId] = bugIdCount[el.bugId] + 1;
		});
        // Since the game can only be between two bugs if
        // there are more than 2 there was an error somewhere
		if(Object.keys(bugIdCount).length > 2) { console.error("Issue aggregating scores"); return; }
		return Object.keys(bugIdCount).reduce(function(a, b) {
			return bugIdCount[a] > bugIdCount[b] ? a : b;
		});
	};

    // Gets the position of the bug
    self.getBugPosition = function(){
        var bugPos = [];
        self.board.getBugs().forEach(function(el){
           var pos = self.board.getPosition(el);
            var row = pos[0];
            var column = pos[1];
            bugPos.push({bug: el, row: row, column: column});
        });
    };

    // Initializes all the bugs positions
    var positions = [];
    var squareSize = size * size;
    while(positions.length < self.bugsCount * 2){
        var pos = Math.floor(Math.random() * squareSize);
        if(!positions.some(function(el) { return el == pos;})){
            positions.push(pos);
        }
    }

    // A helper function to randomly generate bug directions
    self._getRandomDirection = function(){
        var num = Math.floor(Math.random() * 4);
        if(num <= 1) { return BugsMoves.Left; } else
        if(num <= 2) { return BugsMoves.Right; } else
        if(num <= 3) { return BugsMoves.Down; } else
        { return BugsMoves.Up; }
    };

    // Iterates through each bug
    bugs.forEach(function(el, index){
        // Since there are only allowed two bugs, if the index is 0 then its one team
        // if not its the other
        var team = (index == 0 ? BugsTeam.Red : BugsTeam.Blue);

        // Iterates through the bug count and makes a bug for each
        // Randomly assigns a bug a location and direction
        for(var i = 0; i < self.bugsCount; i ++){
            var direction = self._getRandomDirection();
            var bugCode = new BugModel(team, direction, el);
            var pos = positions.pop();
            var row = pos % size;
            var column = Math.floor(pos / size);
            self.board.setPosition(bugCode, row, column);
        }
    });
};
