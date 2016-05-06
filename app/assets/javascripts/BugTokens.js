/**
 * Created by Lucas Rodriguez on 4/12/16.
 * All the possible tokens of the bugs
 * Edited by Michael Johnston 5/6/16
 * Added turnLeft, turnRight tokens
 */

var BugTokens = {
    IsEmpty: "isEmpty",
    IsEnemy: "isEnemy",
    IsFriend: "isFriend",
    IsWall: "isWall",

    If: "if",
    ElsIf: "elsif",
    Else: "else",

    MoveForward: "moveForward",
    MoveLeft: "moveLeft",
    MoveRight: "moveRight",
    MoveBackward: "moveBackward",
    TurnRight: "turnRight",
    TurnLeft: "turnLeft",
    Infect: "infect",

    EndStatement: ";",

    StartParenthesis: "(",
    EndParenthesis: ")",
    StartBracket: "{",
    EndBracket: "}"
};