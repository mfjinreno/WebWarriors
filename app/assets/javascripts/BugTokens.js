/**
 * Created by Lucas Rodriguez on 4/12/16.
 * All the possible tokens of the bugs
 *
 * ---CHANGELOG---
 * Edited by Michael Johnston 5/6/16
 * Added turnLeft, turnRight tokens
 */

var BugTokens = {
    IsEmpty: "isEmpty",
    IsEnemy: "isEnemy",
    IsFriend: "isFriend",
    IsWall: "isWall",

    IsEmptyLeft: "isEmptyLeft",
    IsEnemyLeft: "isEnemyLeft",
    IsFriendLeft: "isFriendLeft",
    IsWallLeft: "isWallLeft",

    IsEmptyRight: "isEmptyRight",
    IsEnemyRight: "isEnemyRight",
    IsFriendRight: "isFriendRight",
    IsWallRight: "isWallRight",

    AND: "and",
    OR: "or",
    NOT: "not",
    TRUE: "True",
    FALSE: "False",

    If: "if",
    ElsIf: "elsif",
    Else: "else",

    Stop: "stop",
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