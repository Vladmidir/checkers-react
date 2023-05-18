
/**
 * Removes the taken piece from the board mutating it.
 * @param {[int]} inital 
 * @param {[int]} final 
 * @param {[[int]]} board 
 */
function mutateTaking(inital, final, board){
    //check where the move was made
    if(inital[0] < final[0]){
      if(inital[1] < final[1]){
        //bottom right corner
        board[inital[0] + 1][inital[1] + 1] = ' '
      }else{
        //bottom left corner
        board[inital[0] + 1][inital[1] - 1] = ' '
      }
    }
    else{
      if(inital[1] < final[1]){
        //top right corner
        board[inital[0] - 1][inital[1] + 1] = ' '
      }else{
        //top left corner
        board[inital[0] - 1][inital[1] - 1] = ' '
      }
    }
}

/**
 * Mutates the given `board`.
 * Replace all highlights ('+') on the `board` with empty squares (' ').
 */
function removeHighlights(board) {
    for (let i = 0; i < 8; i++){
      for (let j = 0; j < 8; j++){
        if(board[i][j] === '+'){
            board[i][j] = ' '
        }
      }
    }
}

/**
 * Returns a copy of the 2D array
 * @param {[[int]]} board 
 * @returns [[int]]
 */
function copyBoard(board) {
    return board.map((row) => (
        row.map((cell) => (
            cell
        ))
    ))
}
/**
 * Substitue every coordinate in `coordinates` on the `board` for `char`
 * @param {[[int]]} board 
 * @param {[[int]]} coordinates
 * @param {str} char
 */
const updateCoordinates = (board, coordionates, char) => {
    //update the board
    for (let coordinate of coordionates){
      board[coordinate[0]][coordinate[1]] = char
    }
    return board
  }

/**
 * Look for forced moves for player `color` on the board
 * @param {[[int]]} board 
 * @param {str} color
 */
function searchForced(board, color){

}

function showMovesRed(board, row, col) {
    let selected = board[row][col]
    let forced = false
    let possibleMoves = []
    //check the left boundary
    if ((row + 1 <= 7) && (col - 1 >= 0)){
      //take possibility (forced)
      if (board[row + 1][col - 1] === '1' && row + 2 <= 7 && col - 2 >=0 && board[row + 2][col - 2] === ' '){
        possibleMoves.push([row + 2, col - 2])
        forced = true
      }
      //possible empty square move
      else if(board[row + 1][col - 1] === ' ' && !forced){
        possibleMoves.push([row + 1, col - 1])
      }
    }
    //check the right boundary
    if ((row + 1 <= 7) && (col + 1 <= 7)){
      //take possibility (forced)
      if (board[row + 1][col + 1] === '1' && row + 2 <= 7 && col + 2 <= 7 && board[row + 2][col + 2] === ' '){
        possibleMoves.push([row + 2, col + 2])
      }
      //possible empty square move
      else if(board[row + 1][col + 1] === ' ' && !forced){
        possibleMoves.push([row + 1, col + 1])
       
      }
    }
    return possibleMoves
}

function showMovesBlue(board, row, col) {
    let possibleMoves = []
    let forced = false
    //check left boundary
    if ((row - 1 >= 0) && (col - 1 >= 0)){
      
      //take possibility (forced)
      if (board[row - 1][col - 1] === '0' && row - 2 >= 0 && col - 2 >=0 && board[row - 2][col - 2] === ' '){
        possibleMoves.push([row - 2, col - 2])
        forced = true
      }
      //possible empty square move
      else if(board[row - 1][col - 1] === ' ' && !forced){
        possibleMoves.push([row - 1, col - 1])
      }
    }
    //check right boundary
    if ((row - 1 >= 0) && (col + 1 <= 7)){
      if (board[row - 1][col + 1] === '0' && row - 2 >= 0 && col + 2 <= 7 && board[row - 2][col + 2] === ' '){
        possibleMoves.push([row - 2, col + 2])
        forced = true
      }
      //possible empty square move
      else if(board[row - 1][col + 1] === ' ' && !forced){
        possibleMoves.push([row - 1, col + 1])
      }
    } 
    return possibleMoves
}

export {mutateTaking, removeHighlights, searchForced, showMovesBlue, showMovesRed, copyBoard, updateCoordinates}