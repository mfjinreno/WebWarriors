/**
 * Created by Lucas Rodriguez on 4/9/16.
 * A Mode representing a Bug
 *
 * Everything was written by Lucas Rodriguez
 */

// A function to generate the id of each bug
var BugsId = (function(){
    var id = -1;
    return function(){
        return id++;
    };
})();

var BugModel = function(team, direction, bug){
    var self = this;
    self.id = BugsId();
    self.team = team;
    self.direction = direction;
    self.bodyId = bug.body;
    self.headId = bug.head;
    self.rgb = bug.rgb;
    self.bugId = bug.id;

    // Takes a move of the bug and turns it into a global move
    // I.E. if the bug wants to move right and is facing right then
    // The global move would be down
    self.getGlobalMove = function(move){

        // A switch case for all of the possible moves of the bug
        switch(move){
            case BugTokens.MoveForward:
                return self.direction;
                break;
            case BugTokens.MoveRight:
                switch(self.direction){
                    case BugsMoves.Down:
                        return BugsMoves.Left;
                        break;
                    case BugsMoves.Up:
                        return BugsMoves.Right;
                        break;
                    case BugsMoves.Right:
                        return BugsMoves.Down;
                        break;
                    case BugsMoves.Left:
                        return BugsMoves.Up;
                        break;
                }
                break;
            case BugTokens.MoveBackward:
                switch(self.direction){
                    case BugsMoves.Down:
                        return BugsMoves.Up;
                        break;
                    case BugsMoves.Up:
                        return BugsMoves.Down;
                        break;
                    case BugsMoves.Right:
                        return BugsMoves.Left;
                        break;
                    case BugsMoves.Left:
                        return BugsMoves.Right;
                        break;
                }
                break;
            case BugTokens.MoveLeft:
                switch(self.direction){
                    case BugsMoves.Down:
                        return BugsMoves.Right;
                        break;
                    case BugsMoves.Up:
                        return BugsMoves.Left;
                        break;
                    case BugsMoves.Right:
                        return BugsMoves.Up;
                        break;
                    case BugsMoves.Left:
                        return BugsMoves.Down;
                        break;
                }
                break;
            case BugTokens.Infect:
                return BugsMoves.Infect;
                break;
            default:
                return "There was an error parsing bugs move: " + move + " and direction: " + self.direction;

        }
    };

    // A function that takes in bug code and returns if the bug code is valid
    // Checks for all of the possible neighbor statuses of the bug
    // That the bug returns a valid move
    self.bugInvalidator = function(bugCode){

        // All of the moves that the bug makes based on the neighbors
        var moves = Object.keys(NeighborStatus).map(function(key){
            var status = NeighborStatus[key];
            var result = bugCode(status);
            return self.getGlobalMove(result);
        });

        // If the bug made an invalid move
        var invalidMoves = moves.map(function(bugMove){
            var hasInvalidMove = Object.keys(BugsMoves).some(function(moveKey) {
                var move = BugsMoves[moveKey];
                return move === bugMove;
            });
            return hasInvalidMove ? false : bugMove;
        });
        return invalidMoves.reduce(function(a, b){
            if(!a){
                return a;
            } else{
                return !b ? b : a + " AND " + b;
            }
        });
    };

    // Creates the bugs code that can be called based on the neighbor
    var code = new BugInterpreter(bug.code);

    // A function call to get the move of the bug
    self.bugsCode = function(neighbor) {
        return code(neighbor);
    };

    // Returns if the bug is invalid or not.
    // If the bug is invalid the variable will be an error message of what went wrong
    self.isInvalid = self.bugInvalidator(self.bugsCode);

    // Has the bug make a move - if the code is invalid just doesn't return anything
    self.makeMove = function(neighbor){
        if(!self.isInvalid){
            var move = self.bugsCode(neighbor);
            return self.getGlobalMove(move);
        }
    };


};
