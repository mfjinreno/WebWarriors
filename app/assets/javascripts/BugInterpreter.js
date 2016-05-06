/**
 * Created by Lucas Rodriguez on 4/12/16.
 * Parses out BugsCode and returns a function that can be called
 * that will return what move the bug will make.
 *
 * All functions have been written by Lucas Rodriguez
 * Edited by Michael Johnston 5/6/16
 * Added turnRight turnLeft to interp switch.
 */

var BugInterpreter = function(code){
    var self = this;

    // Creates a Regex string of all the token moves
    var mapString = Object.keys(BugTokens).map(function(key){
        var token = BugTokens[key];
        if(token == BugTokens.StartBracket || token == BugTokens.EndBracket ||
            token == BugTokens.StartParenthesis || token == BugTokens.EndParenthesis ||
            token == BugTokens.EndStatement){ token = "\\" + token; }
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
                    return neighbor == BugTokens.IsEmpty;
                    };
                break;
            case BugTokens.IsEnemy:
                return function(neighbor){
                    return neighbor == BugTokens.IsEnemy;
                };
                break;
            case BugTokens.IsFriend:
                return function(neighbor){
                    return neighbor == BugTokens.IsFriend;
                };
                break;
            case BugTokens.IsWall:
                return function(neighbor){
                    return neighbor == BugTokens.IsWall;
                };
                break;

            // An if boolean condition
            case BugTokens.If:
                var peek = tokens[0];
                if(peek != BugTokens.StartParenthesis){
                    return function(){
                        return "All if statements must be preceded by a '( )' statement. " +
                          "BEFORE: " + (tokens.length > 0 ? tokens.reduce(function(a, b){return a + ", " + b}) : "");
                    };
                }
                var condition = self.generateCall(tokens);
                var move = self.generateCall(tokens);
                var nextMove = self.generateCall(tokens);
                return function(neighbor){
                    if(condition(neighbor)) {
                        return move(neighbor);
                    }
                    else {
                        return nextMove(neighbor);
                    }
                };
                break;

            // Else if boolean condition
            case BugTokens.ElsIf:
                var condition = self.generateCall(tokens);
                var move = self.generateCall(tokens);
                var nextMove = self.generateCall(tokens);
                return function(neighbor){
                    if(condition(neighbor)) {
                        return move(neighbor);
                    }
                    else {
                        return nextMove(neighbor);
                    }
                };
                break;

            // Else condition
            case BugTokens.Else:
                var move = self.generateCall(tokens);
                return function(neighbor){
                    return move(neighbor);
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

            // If a parenthesis is found iterates until the end of it and returns a function of the boolean
            case BugTokens.StartParenthesis:
                var boolCall = self.generateCall(tokens);
                var token = tokens.shift();
                if(token == BugTokens.EndParenthesis){
                    return function(neighbor) { return boolCall(neighbor); };
                } else{
                    var s = function() {
                        return "There was an error parsing " + token + " in " + BugTokens.StartParenthesis +
                            " BEFORE: " + (tokens.length > 0 ? tokens.reduce(function(a, b){return a + ", " + b}) : "");
                    };
                    return s;

                }
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
