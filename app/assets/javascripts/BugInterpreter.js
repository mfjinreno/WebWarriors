/**
 * Created by Lucas Rodriguez on 4/12/16.
 * Parses out BugsCode and returns a function that can be called
 * that will return what move the bug will make.
 *
 * (almost) All functions have been written by Lucas Rodriguez
 *
 * ---CHANGELOG---
 * Edited by Michael Johnston 5/6/16
 * Added turnRight turnLeft to interp switch.
 *
 * Michael Johnston 5/7/16
 * -Added to all boolean functions a switch to handle and/or statements
 * -Added to parenthesis function to check for multiple boolean statements inline
 *
 * Michael Johnston 5/8/16
 * -Removed from boolean function swtich handling and-or
 * -completely re-wrote parenthesis function to handle boolean statements, deleting 
 * all of the work I did yesterday
 * -Added NOT boolean function.
 * -Fixed error where parser denies an if statement without else{} by
 * adding Stop function if there is no following else. Makes parser happy.
 * -added true/false primitives
 * -added cases for is_Left is_Right
 * -Added case for Stop token
 * 
 *
 */

var BugInterpreter = function(code){
    var self = this;
    // Creates a Regex string of all the token moves
    var mapString = Object.keys(BugTokens).map(function(key){
        var token = BugTokens[key];
        if(token == BugTokens.StartBracket || token == BugTokens.EndBracket ||
            token == BugTokens.StartParenthesis || token == BugTokens.EndParenthesis ||
            token == BugTokens.EndStatement ){ token = "\\" + token; }
        return token;
    }).reduce(function(a, b) {
        return a + "|" + b;
    });

    // Creates a RegExp to test to see if the code is invalid
    var anyNot = new RegExp('[^(' + mapString + ')|' + '\\s' +']', "g");
    var notTokens = code.match(anyNot);

    // If any none valid tokens are found returns an error function
    if(notTokens) {
        return function(){
          return "The code has invalid characters, the characters: " +
              notTokens.reduce(function(a, b){
                  return a + " " + b;
              }) + " are not valid characters";
        };
    };

    // Gets the correct tokens of the bug
    var expression = new RegExp(mapString, "g");
    self.tokens = code.match(expression);

    // A recursive function that iterates through the tokens
    self.generateCall =  function(tokens){

        // Base case - if an empty list of tokens is passed in
        if(!tokens || tokens.length == 0) { return function(){ return; }; }

        // Takes the front token and giant switch case of all possible moves
        var token = tokens.shift();
        switch(token){

            // For boolean tokens returns a function that takes the
            // neighbor as a parameter and returns where statement is true
            case BugTokens.IsEmpty:
                return function(neighbor){
                    return (neighbor[0] == BugTokens.IsEmpty);
                };
                break;
            case BugTokens.IsEnemy:
               return function(neighbor){
                    return (neighbor[0] == BugTokens.IsEnemy);
                };
                break;
            case BugTokens.IsFriend:
                return function(neighbor){
                    return (neighbor[0] == BugTokens.IsFriend);
                };
                break;;
            case BugTokens.IsWall:
                return function(neighbor){
                    return (neighbor[0] == BugTokens.IsWall);
                };
                break;

            //right cases
            case BugTokens.IsEmptyRight:
                return function(neighbor){
                    return (neighbor[1] == BugTokens.IsEmptyRight);
                };
                break;
            case BugTokens.IsEnemyRight:
               return function(neighbor){
                    return (neighbor[1] == BugTokens.IsEnemyRight);
                };
                break;
            case BugTokens.IsFriendRight:
                return function(neighbor){
                    return (neighbor[1] == BugTokens.IsFriendRight);
                };
                break;;
            case BugTokens.IsWallRight:
                return function(neighbor){
                    return (neighbor[1] == BugTokens.IsWallRight);
                };
                break;

            //left cases
            case BugTokens.IsEmptyLeft:
                return function(neighbor){
                    return (neighbor[2] == BugTokens.IsEmptyLeft);
                };
                break;
            case BugTokens.IsEnemyLeft:
               return function(neighbor){
                    return (neighbor[2] == BugTokens.IsEnemyLeft);
                };
                break;
            case BugTokens.IsFriendLeft:
                return function(neighbor){
                    return (neighbor[2] == BugTokens.IsFriendLeft);
                };
                break;;
            case BugTokens.IsWallLeft:
                return function(neighbor){
                    return (neighbor[2] == BugTokens.IsWallLeft);
                };
                break;

            // An if boolean condition
            case BugTokens.If:
                var peek = tokens[0];
                if(peek != BugTokens.StartParenthesis){
                    return function(){
                        return "All if statements must be followed by a '( )' statement. " +
                          "BEFORE: " + (tokens.length > 0 ? tokens.reduce(function(a, b){return a + ", " + b}) : "");
                    };
                }

                var condition = self.generateCall(tokens);
                var move = self.generateCall(tokens);
                if (tokens.length == 0){
                    return function(neighbor){
                        if(condition(neighbor)){
                            return move(neighbor);
                        }else {
                            return BugTokens.Stop; 
                        }
                    };
                }else{
                    var nextMove = self.generateCall(tokens);
                    return function(neighbor){
                        if(condition(neighbor)) {
                            return move(neighbor);
                        }
                        else {
                            return nextMove(neighbor);
                        }
                    };
                }
                
                break;

            // Else if boolean condition
            case BugTokens.ElsIf:
                var condition = self.generateCall(tokens);
                var move = self.generateCall(tokens);
                if (tokens.length == 0){
                    return function(neighbor){
                        if(condition(neighbor)){
                            return move(neighbor);
                        }else {
                            return BugTokens.Stop; 
                        }
                    };
                }else{
                    var nextMove = self.generateCall(tokens);
                    return function(neighbor){
                        if(condition(neighbor)) {
                            return move(neighbor);
                        }
                        else {
                            return nextMove(neighbor);
                        }
                    };
                }
                break;

            // Else condition
            case BugTokens.Else:
                var move = self.generateCall(tokens);
                return function(neighbor){
                    return move(neighbor);
                };
                break;

            case BugTokens.TRUE:
                return function(){
                    return true;
                };
                break;

            case BugTokens.FALSE:
                return function(){
                    return false;
                };
                break;

            case BugTokens.NOT:
                var nextToken = tokens.shift();
                if (nextToken == BugTokens.StartParenthesis){
                    var boolCall = self.generateCall(tokens);
                    var peek = tokens[0];
                    switch(peek){
                        case BugTokens.AND:
                            var and = tokens.shift();
                            var nextStatement = self.generateCall(tokens);
                            return function(neighbor){
                                return !((boolCall(neighbor))&&(nextStatement(neighbor)));
                            };
                            break;
                        case BugTokens.OR:
                            var or = tokens.shift();
                            var nextStatement = self.generateCall(tokens);
                            return function(neighbor){
                                return !((boolCall(neighbor))||(nextStatement(neighbor)));
                            };
                            break;
                        case BugTokens.EndParenthesis:
                            var endParen = tokens.shift();
                            return function(neighbor){
                                return !(boolCall(neighbor));
                            };
                            break;
                        default:
                            return function(){
                                return 'There was an error parsing' + nextToken + 'in' + BugTokens.NOT +': All not statements must be followed by (booleanPrimativeStatement)';
                            };

                    }
                }else{
                    return function(){
                        return 'There was an error parsing' + nextToken + 'in' + BugTokens.NOT +': All not statements must be followed by (booleanPrimativeStatement)';
                    };
                }
                break;

            // For all of the bugs moves just returns a function that returns the move of the bug
            case BugTokens.MoveForward:
                var token = tokens.shift();
                if(token == BugTokens.EndStatement){
                    return function() { return BugTokens.MoveForward; };
                } else{
                   return function() {
                       return 'There was an error parsing ' + token + ' in ' + BugTokens.MoveForward +
                           " BEFORE: " + (tokens.length > 0 ? tokens.reduce(function(a, b){return a + ", " + b}) : "");
                    };
                }
                break;
            case BugTokens.MoveLeft:
                var token = tokens.shift();
                if(token == BugTokens.EndStatement){
                    return function() { return BugTokens.MoveLeft; };
                } else{
                    return function() {
                        return 'There was an error parsing ' + token + ' in ' + BugTokens.MoveLeft +
                            " BEFORE: " + (tokens.length > 0 ? tokens.reduce(function(a, b){return a + ", " + b}) : "");
                    };
                }
                break;
            case BugTokens.MoveRight:
                var token = tokens.shift();
                if(token == BugTokens.EndStatement){
                    return function() { return BugTokens.MoveRight; };
                } else{
                    return function() {
                        return 'There was an error parsing ' + token + ' in ' + BugTokens.MoveRight +
                            " BEFORE: " + (tokens.length > 0 ? tokens.reduce(function(a, b){return a + ", " + b}) : "");
                    };
                }
                break;
            case BugTokens.MoveBackward:
                var token = tokens.shift();
                if(token == BugTokens.EndStatement){
                    return function() { return BugTokens.MoveBackward; };
                } else{
                    return function() {
                        return 'There was an error parsing ' + token + ' in ' + BugTokens.MoveBackward +
                            " BEFORE: " + (tokens.length > 0 ? tokens.reduce(function(a, b){return a + ", " + b}) : "");
                    };
                }
                break;
            case BugTokens.TurnRight:
                var token = tokens.shift();
                if (token == BugTokens.EndStatement){
                    return function() {return BugTokens.TurnRight}
                } else{
                    return function() {
                        return 'There was an error parsing ' + token + ' in ' + BugTokens.TurnRight +
                            " BEFORE: " + (tokens.length > 0 ? tokens.reduce(function(a, b){return a + ", " + b}) : "");
                    };
                }
                break;
            case BugTokens.TurnLeft:
                var token = tokens.shift();
                if (token == BugTokens.EndStatement){
                    return function() {return BugTokens.TurnLeft}
                } else{
                    return function() {
                        return 'There was an error parsing ' + token + ' in ' + BugTokens.TurnLeft +
                            " BEFORE: " + (tokens.length > 0 ? tokens.reduce(function(a, b){return a + ", " + b}) : "");
                    };
                }
                break;
            case BugTokens.Infect:
                var token = tokens.shift();
                if(token == BugTokens.EndStatement){
                    return function() { return BugTokens.Infect; };
                } else{
                    return function() {
                        return 'There was an error parsing ' + token + ' in ' + BugTokens.Infect +
                            " BEFORE: " + (tokens.length > 0 ? tokens.reduce(function(a, b){return a + ", " + b}) : "");
                    };
                }
                break;
            case BugTokens.Stop:
                var token = tokens.shift();
                if(token == BugTokens.EndStatement){
                    return function() { return BugTokens.Stop; };
                } else{
                    return function() {
                        return 'There was an error parsing ' + token + ' in ' + BugTokens.Stop +
                            " BEFORE: " + (tokens.length > 0 ? tokens.reduce(function(a, b){return a + ", " + b}) : "");
                    };
                }
                break;


            // If a parenthesis is found iterates until the end of it and returns a function of the boolean
            //re-written by Michael Johnston 5/8/16
            case BugTokens.StartParenthesis:
                var boolCall = self.generateCall(tokens);
                var peek = tokens[0];
                //checking immediate next
                switch(peek){
                    //if the immediate next is a end paren, check to see if theres another
                    //boolean statement. Based on return, either recurse or return boolCall
                    case BugTokens.EndParenthesis:
                        var dummy = tokens.shift();
                        var nextToken = tokens[0];
                        switch(nextToken){
                            case BugTokens.AND:
                                tokens.shift();
                                var nextStatement = self.generateCall(tokens);
                                return function(neighbor){
                                    return (!!boolCall(neighbor)) && (!!nextStatement(neighbor));
                                };
                                break;
                            case BugTokens.OR:
                                tokens.shift();
                                var nextStatement = self.generateCall(tokens);
                                return function(neighbor){
                                    return (!!(boolCall(neighbor)) || !!(nextStatement(neighbor)));
                                };
                                break;
                            default:
                                return function(neighbor){
                                    return boolCall(neighbor);
                                };
                                //end tertiary switch statement in case- BugTokens.StartParenthesis
                        }
                        break;
                    //if after boolCall the AND token appears pop off that token
                    //and recurse on boolean, then check if there is a parenthesis
                    //if not, return error, if yes then return first boolCall && nextStatement
                    case BugTokens.AND:
                        var dummy =tokens.shift();
                        var nextStatement = self.generateCall(tokens);
                        var endParen = tokens.shift();
                        if (endParen!=BugTokens.EndParenthesis){
                            var s = function() {
                                return "There was an error parsing " + token + " in " + BugTokens.StartParenthesis +
                                " BEFORE: " + (tokens.length > 0 ? tokens.reduce(function(a, b){return a + ", " + b}) : "");
                             };
                            return s;
                        }else{
                            return function(neighbor){
                                return (!!(boolCall(neighbor))&&(!!nextStatement(neighbor)));
                            };
                        }
                        break;
                    //if after boolCall the OR token appears pop off that token
                    //and recurse on boolean, then check if there is a parenthesis
                    //if not, return error, if yes then return first boolCall || nextStatement
                    case BugTokens.OR:
                        var dummy =tokens.shift();
                        var nextStatement = self.generateCall(tokens);
                        var endParen = tokens.shift();
                        if (endParen!=BugTokens.EndParenthesis){
                            var s = function() {
                                return "There was an error parsing " + token + " in " + BugTokens.StartParenthesis +
                                " BEFORE: " + (tokens.length > 0 ? tokens.reduce(function(a, b){return a + ", " + b}) : "");
                             };
                            return s;
                        }else{
                            return function(neighbor){
                                return (!!(boolCall(neighbor))||(!!nextStatement(neighbor)));
                            };
                        }
                        break;
                    default:
                        var s = function() {
                        return "There was an error parsing " + token + " in " + BugTokens.StartParenthesis +
                            " BEFORE: " + (tokens.length > 0 ? tokens.reduce(function(a, b){return a + ", " + b}) : "");
                        };
                        return s;
                        //end secondary switch statement in case- BugTokens.StartParenthesis

                }
                //end main switch statement case- BugTokens.StartParenthesis
                break;

            // If start bracket is found iterates until the end of it and returns an action function of the bracket
            case BugTokens.StartBracket:
                var call = self.generateCall(tokens);
                var token = tokens.shift();
                if(token == BugTokens.EndBracket){
                    return function(neighbor) { return call(neighbor); };
                } else{
                    return function() {
                        return 'There was an error parsing ' + token + ' in ' + BugTokens.StartBracket +
                            " BEFORE: " + (tokens.length > 0 ? tokens.reduce(function(a, b){return a + ", " + b}) : "");
                    };
                }
                break;
            default:
                return function() {
                    return 'There was an error parsing ' + token;
                };
        }
    };

    // Generates the function call
    return self.generateCall(self.tokens);
};
