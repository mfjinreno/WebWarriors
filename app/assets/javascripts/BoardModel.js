/**
 * Created by Lucas Rodriguez on 4/9/16.
 * A model of the board that the bugs play on.
 * (almost) Everything was written by Lucas Rodriguez
 *
 * ---CHANGELOG---
 * Edited by Michael Johnston 5/6/16
 * Added cases to getNeighbor, makeMove, and isMove to accept new sLeft etc..
 */
var BoardModel = function(size){
    var self = this;

    // The Number of columns and rows of the board
    self.size = size;

    // Initializes the board
    self.board = new Array(self.size);
    for(var i = 0; i < self.board.length; i++){
        self.board[i] = new Array(self.size);
        for(var j = 0; j < self.board[i].length; j++){
            self.board[i][j] = false;
        }
    }

    // Gets all of the bugs currently in play
    self.getBugs = function(){
      return self.board.reduce(function(a, b){
          return a.concat(b);
      }).filter(function(el){
          return el;
      });
    };

    // Gets the neighbor of the bug, i.e. what it is facing
    self.getNeighbor = function(bug){
        var position = self.getPosition(bug);
        if(!position) { return; }
        var row = position[0];
        var column = position[1];

        // Switch case based on what direction the bug is facing
        switch(bug.direction){
            case BugsMoves.Left:
                if(column == 0) { return NeighborStatus.IsWall; }
                else {
                    if(self.board[row][column-1]) {
                        return self.board[row][column-1].team == bug.team ?
                            NeighborStatus.IsFriend :
                            NeighborStatus.IsEnemy;
                    } else{
                        return NeighborStatus.IsEmpty;
                    }
                }
                break;
            case BugsMoves.Right:
                if(column == self.size - 1) { return NeighborStatus.IsWall; }
                else {
                    if(self.board[row][column+1]) {
                        return self.board[row][column+1].team == bug.team ?
                            NeighborStatus.IsFriend :
                            NeighborStatus.IsEnemy;
                    } else{
                        return NeighborStatus.IsEmpty;
                    }
                }
                break;
            case BugsMoves.Up:
                if(row == 0) { return NeighborStatus.IsWall; }
                else {
                    if(self.board[row-1][column]) {
                        return self.board[row-1][column].team == bug.team ?
                            NeighborStatus.IsFriend :
                            NeighborStatus.IsEnemy;
                    } else{
                        return NeighborStatus.IsEmpty;
                    }
                }
                break;
            case BugsMoves.Down:
                if(row == self.size - 1) { return NeighborStatus.IsWall; }
                else {
                    if(self.board[row+1][column]) {
                        return self.board[row+1][column].team == bug.team ?
                            NeighborStatus.IsFriend :
                            NeighborStatus.IsEnemy;
                    } else{
                        return NeighborStatus.IsEmpty;
                    }
                }
                break;
            case BugsMoves.SLeft:
                if(column == 0) { return NeighborStatus.IsWall; }
                else {
                    if(self.board[row][column-1]) {
                        return self.board[row][column-1].team == bug.team ?
                            NeighborStatus.IsFriend :
                            NeighborStatus.IsEnemy;
                    } else{
                        return NeighborStatus.IsEmpty;
                    }
                }
                break;
            case BugsMoves.SRight:
                if(column == self.size - 1) { return NeighborStatus.IsWall; }
                else {
                    if(self.board[row][column+1]) {
                        return self.board[row][column+1].team == bug.team ?
                            NeighborStatus.IsFriend :
                            NeighborStatus.IsEnemy;
                    } else{
                        return NeighborStatus.IsEmpty;
                    }
                }
                break;
            case BugsMoves.SUp:
                if(row == 0) { return NeighborStatus.IsWall; }
                else {
                    if(self.board[row-1][column]) {
                        return self.board[row-1][column].team == bug.team ?
                            NeighborStatus.IsFriend :
                            NeighborStatus.IsEnemy;
                    } else{
                        return NeighborStatus.IsEmpty;
                    }
                }
                break;
            case BugsMoves.SDown:
                if(row == self.size - 1) { return NeighborStatus.IsWall; }
                else {
                    if(self.board[row+1][column]) {
                        return self.board[row+1][column].team == bug.team ?
                            NeighborStatus.IsFriend :
                            NeighborStatus.IsEnemy;
                    } else{
                        return NeighborStatus.IsEmpty;
                    }
                }
                break;
            default:
                alert("Error processing bug neighbor");
                break;
        }
    };


    //Gets the RIGHT Neighbor
    self.getNeighborRight = function(bug){
        var position = self.getPosition(bug);
        if(!position) { return; }
        var row = position[0];
        var column = position[1];

        // Switch case based on what direction the bug is facing
        switch(bug.direction){
            case BugsMoves.Left:
                if(row == 0) { return NeighborStatus.IsWallRight; }
                else {
                    if(self.board[row-1][column]) {
                        return self.board[row-1][column].team == bug.team ?
                            NeighborStatus.IsFriendRight :
                            NeighborStatus.IsEnemyRight;
                    } else{
                        return NeighborStatus.IsEmptyRight;
                    }
                }
                break;
            case BugsMoves.Right:
                if(row == self.size - 1) { return NeighborStatus.IsWallRight; }
                else {
                    if(self.board[row+1][column]) {
                        return self.board[row+1][column].team == bug.team ?
                            NeighborStatus.IsFriendRight :
                            NeighborStatus.IsEnemyRight;
                    } else{
                        return NeighborStatus.IsEmptyRight;
                    }
                }
                break;
            case BugsMoves.Up:
                if(column == self.size-1) { return NeighborStatus.IsWallRight; }
                else {
                    if(self.board[row][column+1]) {
                        return self.board[row][column+1].team == bug.team ?
                            NeighborStatus.IsFriendRight :
                            NeighborStatus.IsEnemyRight;
                    } else{
                        return NeighborStatus.IsEmptyRight;
                    }
                }
                break;
            case BugsMoves.Down:
                if(column == 0) { return NeighborStatus.IsWallRight; }
                else {
                    if(self.board[row][column-1]) {
                        return self.board[row][column-1].team == bug.team ?
                            NeighborStatus.IsFriendRight :
                            NeighborStatus.IsEnemyRight;
                    } else{
                        return NeighborStatus.IsEmptyRight;
                    }
                }
                break;
            case BugsMoves.SLeft:
                if(row == 0) { return NeighborStatus.IsWallRight; }
                else {
                    if(self.board[row-1][column]) {
                        return self.board[row-1][column].team == bug.team ?
                            NeighborStatus.IsFriendRight :
                            NeighborStatus.IsEnemyRight;
                    } else{
                        return NeighborStatus.IsEmptyRight;
                    }
                }
                break;
            case BugsMoves.SRight:
                if(row == self.size - 1) { return NeighborStatus.IsWallRight; }
                else {
                    if(self.board[row+1][column]) {
                        return self.board[row+1][column].team == bug.team ?
                            NeighborStatus.IsFriendRight :
                            NeighborStatus.IsEnemyRight;
                    } else{
                        return NeighborStatus.IsEmptyRight;
                    }
                }
                break;
            case BugsMoves.SUp:
                if(column == self.size-1) { return NeighborStatus.IsWallRight; }
                else {
                    if(self.board[row][column+1]) {
                        return self.board[row][column+1].team == bug.team ?
                            NeighborStatus.IsFriendRight :
                            NeighborStatus.IsEnemyRight;
                    } else{
                        return NeighborStatus.IsEmptyRight;
                    }
                }
                break;
            case BugsMoves.SDown:
                if(column == 0) { return NeighborStatus.IsWallRight; }
                else {
                    if(self.board[row][column-1]) {
                        return self.board[row][column-1].team == bug.team ?
                            NeighborStatus.IsFriendRight :
                            NeighborStatus.IsEnemyRight;
                    } else{
                        return NeighborStatus.IsEmptyRight;
                    }
                }
                break;
            default:
                alert("Error processing bug neighbor");
                break;
        }
    };

    // Gets the LEFT neighbor of the bug
    self.getNeighborLeft = function(bug){
        var position = self.getPosition(bug);
        if(!position) { return; }
        var row = position[0];
        var column = position[1];

        // Switch case based on what direction the bug is facing
        switch(bug.direction){
            case BugsMoves.Left:
                if(row == self.size -1) { return NeighborStatus.IsWallLeft; }
                else {
                    if(self.board[row+1][column]) {
                        return self.board[row+1][column].team == bug.team ?
                            NeighborStatus.IsFriendLeft :
                            NeighborStatus.IsEnemyLeft;
                    } else{
                        return NeighborStatus.IsEmptyLeft;
                    }
                }
                break;
            case BugsMoves.Right:
                if(row == 0) { return NeighborStatus.IsWallLeft; }
                else {
                    if(self.board[row-1][column]) {
                        return self.board[row-1][column].team == bug.team ?
                            NeighborStatus.IsFriendLeft :
                            NeighborStatus.IsEnemyLeft;
                    } else{
                        return NeighborStatus.IsEmptyLeft;
                    }
                }
                break;
            case BugsMoves.Up:
                if(column == 0) { return NeighborStatus.IsWallLeft; }
                else {
                    if(self.board[row][column-1]) {
                        return self.board[row][column-1].team == bug.team ?
                            NeighborStatus.IsFriendLeft :
                            NeighborStatus.IsEnemyLeft;
                    } else{
                        return NeighborStatus.IsEmptyLeft;
                    }
                }
                break;
            case BugsMoves.Down:
                if(column == self.size - 1) { return NeighborStatus.IsWallLeft; }
                else {
                    if(self.board[row][column+1]) {
                        return self.board[row][column+1].team == bug.team ?
                            NeighborStatus.IsFriendLeft :
                            NeighborStatus.IsEnemyLeft;
                    } else{
                        return NeighborStatus.IsEmptyLeft;
                    }
                }
                break;
            case BugsMoves.SLeft:
                if(row == self.size -1) { return NeighborStatus.IsWallLeft; }
                else {
                    if(self.board[row+1][column]) {
                        return self.board[row+1][column].team == bug.team ?
                            NeighborStatus.IsFriendLeft :
                            NeighborStatus.IsEnemyLeft;
                    } else{
                        return NeighborStatus.IsEmptyLeft;
                    }
                }
                break;
            case BugsMoves.SRight:
                if(row == 0) { return NeighborStatus.IsWallLeft; }
                else {
                    if(self.board[row-1][column]) {
                        return self.board[row-1][column].team == bug.team ?
                            NeighborStatus.IsFriendLeft :
                            NeighborStatus.IsEnemyLeft;
                    } else{
                        return NeighborStatus.IsEmptyLeft;
                    }
                }
                break;
            case BugsMoves.SUp:
                if(column == 0) { return NeighborStatus.IsWallLeft; }
                else {
                    if(self.board[row][column-1]) {
                        return self.board[row][column-1].team == bug.team ?
                            NeighborStatus.IsFriendLeft :
                            NeighborStatus.IsEnemyLeft;
                    } else{
                        return NeighborStatus.IsEmptyLeft;
                    }
                }
                break;
            case BugsMoves.SDown:
                if(column == self.size - 1) { return NeighborStatus.IsWallLeft; }
                else {
                    if(self.board[row][column+1]) {
                        return self.board[row][column+1].team == bug.team ?
                            NeighborStatus.IsFriendLeft :
                            NeighborStatus.IsEnemyLeft;
                    } else{
                        return NeighborStatus.IsEmptyLeft;
                    }
                }
                break;
            default:
                alert("Error processing bug neighbor");
                break;
        }
    };

    // Sets the position of the bug
    self.setPosition = function(bug, row, column){
        if(!self.board[row][column]){
            self.board[row][column] = bug;
            return true;
        }
        return false;
    };

    // Makes the bug make the given move
    self.makeMove = function(bug, move){
        // Checks to make sure the move valid first
        if(self.isMove(bug, move)){
          var position = self.getPosition(bug);
          var row = position[0];
          var column = position[1];

            // Switch based on what move it is
          switch(move){
              case BugsMoves.Left:
                  self.board[row][column] = false;
                  column -= 1;
                  self.board[row][column] = bug;
                  bug.direction = move;
                  break;
              case BugsMoves.Right:
                  self.board[row][column] = false;
                  column += 1;
                  self.board[row][column] = bug;
                  bug.direction = move;
                  break;
              case BugsMoves.Up:
                  self.board[row][column] = false;
                  row -= 1;
                  self.board[row][column] = bug;
                  bug.direction = move;
                  break;
              case BugsMoves.Down:
                  self.board[row][column] = false;
                  row += 1;
                  self.board[row][column] = bug;
                  bug.direction = move;
                  break;
              case BugsMoves.SLeft:
                  self.board[row][column] = bug;
                  bug.direction = move;
                  break;
              case BugsMoves.SRight:
                  self.board[row][column] = bug;
                  bug.direction = move;
                  break;
              case BugsMoves.SUp:
                  self.board[row][column] = bug;
                  bug.direction = move;
                  break;
              case BugsMoves.SDown:
                  self.board[row][column] = bug;
                  bug.direction = move;
                  break;

              case BugsMoves.Infect:
                  switch(bug.direction){
                      case BugsMoves.Left:
                          if(self.board[row][column-1]){
                              self.board[row][column-1] = $.extend(true, {}, bug);
                          }
                          break;
                      case BugsMoves.Right:
                          if(self.board[row][column+1]){
                              self.board[row][column+1] = $.extend(true, {}, bug);
                          }
                          break;
                      case BugsMoves.Up:
                          if(self.board[row-1][column]){
                              self.board[row-1][column] = $.extend(true, {}, bug);
                          }
                          break;
                      case BugsMoves.Down:
                          if(self.board[row+1][column]){
                              self.board[row+1][column] = $.extend(true, {}, bug);
                          }
                          break;
                      case BugsMoves.SLeft:
                          if(self.board[row][column-1]){
                              self.board[row][column-1] = $.extend(true, {}, bug);
                          }
                          break;
                      case BugsMoves.SRight:
                          if(self.board[row][column+1]){
                              self.board[row][column+1] = $.extend(true, {}, bug);
                          }
                          break;
                      case BugsMoves.SUp:
                          if(self.board[row-1][column]){
                              self.board[row-1][column] = $.extend(true, {}, bug);
                          }
                          break;
                      case BugsMoves.SDown:
                          if(self.board[row+1][column]){
                              self.board[row+1][column] = $.extend(true, {}, bug);
                          }
                          break;
                  }
                  break;
              default:
                  alert("Error processing bug move");
                  break;
          }

          return true;
      }
      return false;
    };

    // Checks to see if the given move for the bug is valid
    self.isMove = function(bug, move){
        var position = self.getPosition(bug);
        if(!position){
            return false;
        }
        var row = position[0];
        var column = position[1];
        switch(move){
            case BugsMoves.Left:
                if(column == 0) { return false; }
                if(self.board[row][column-1]) { return false; }
                return true;
                break;
            case BugsMoves.Right:
                if(column == self.size - 1) { return false; }
                if(self.board[row][column+1]) { return false; }
                return true;
                break;
            case BugsMoves.Up:
                if(row == 0) { return false; }
                if(self.board[row-1][column]) { return false; }
                return true;
                break;
            case BugsMoves.Down:
                if(row == self.size - 1) { return false; }
                if(self.board[row+1][column]) { return false; }
                return true;
                break;
            case BugsMoves.SLeft:
                return true;
                break;
            case BugsMoves.SRight:
                return true;
                break;
            case BugsMoves.SUp:
                return true;
                break;
            case BugsMoves.SDown:
                return true;
                break;
            case BugsMoves.Infect:
                switch(bug.direction){
                    case BugsMoves.Left:
                        if(column == 0) { return false; }
                        if(self.board[row][column-1]){
                            return self.board[row][column-1].team != bug.team;
                        }
                        break;
                    case BugsMoves.Right:
                        if(column == self.size - 1) { return false; }
                        if(self.board[row][column+1]){
                            return self.board[row][column+1] != bug.team;
                        }
                        break;
                    case BugsMoves.Up:
                        if(row == 0) { return false; }
                        if(self.board[row-1][column]){
                            return self.board[row-1][column] != bug.team;
                        }
                        break;
                    case BugsMoves.Down:
                        if(row == self.size - 1) { return false; }
                        if(self.board[row+1][column]){
                            return self.board[row+1][column] != bug.team;
                        }
                        break;
                    case BugsMoves.SLeft:
                        if(column == 0) { return false; }
                        if(self.board[row][column-1]){
                            return self.board[row][column-1].team != bug.team;
                        }
                        break;
                    case BugsMoves.SRight:
                        if(column == self.size - 1) { return false; }
                        if(self.board[row][column+1]){
                            return self.board[row][column+1] != bug.team;
                        }
                        break;
                    case BugsMoves.SUp:
                        if(row == 0) { return false; }
                        if(self.board[row-1][column]){
                            return self.board[row-1][column] != bug.team;
                        }
                        break;
                    case BugsMoves.SDown:
                        if(row == self.size - 1) { return false; }
                        if(self.board[row+1][column]){
                            return self.board[row+1][column] != bug.team;
                        }
                        break;
                    
                }
                break;
            default:
                return false;
        }
    };

    // Gets the current row/column of the bug
    self.getPosition = function(bug){
        for(var i = 0; i < self.board.length; i++){
            for(var j = 0; j < self.board[i].length; j++){
                if(self.board[i][j] == bug){
                    return [i, j];
                }
            }
        }
    };
};