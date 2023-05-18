
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
 * @param {[[int]]} coordionates
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
 * Return all forced moves for the Red piece at (`row`, `col`)
 * @param {[[int]]} board 
 * @param {int} row 
 * @param {int} col 
 * @returns [[int]] 
 */
function getForcedRed(board, row, col) {
    let possibleMoves = []
    //check the left boundary
    if (row + 2 <= 7 && col - 2 >=0 && board[row + 1][col - 1] === '1' &&  board[row + 2][col - 2] === ' '){
      possibleMoves.push([row + 2, col - 2])
    }
    //check the right boundary
    if (row + 2 <= 7 && col + 2 <= 7 && board[row + 1][col + 1] === '1' &&  board[row + 2][col + 2] === ' '){
      possibleMoves.push([row + 2, col + 2])
    }
    return possibleMoves
}

/**
 * Return all possible moves for the selected Red piece at (`row`, `col`)
 * @param {[[int]]} board 
 * @param {int} row 
 * @param {int} col 
 * @returns [[int]]
 */
function getMovesRed(board, row, col) {
    //if we find forced moves, return early
    let possibleMoves = getForcedRed(board, row, col)
    if (possibleMoves.length > 0){
        return possibleMoves
    }
    //check the left boundary
    if ((row + 1 <= 7) && (col - 1 >= 0)){
      //possible empty square move
      if(board[row + 1][col - 1] === ' '){
        possibleMoves.push([row + 1, col - 1])
      }
    }
    //check the right boundary
    if ((row + 1 <= 7) && (col + 1 <= 7)){
      //possible empty square move
      if(board[row + 1][col + 1] === ' '){
        possibleMoves.push([row + 1, col + 1])
      }
    }
    return possibleMoves
}

/**
 * Return all forced moves for the Blue piece at (`row`, `col`)
 * @param {[[int]]} board 
 * @param {int} row 
 * @param {int} col 
 * @returns [[int]] 
 */
function getForcedBlue(board, row, col) {
    let possibleMoves = []
    //check left
    if (row - 2 >= 0 && col - 2 >=0 && board[row - 1][col - 1] === '0' &&  board[row - 2][col - 2] === ' '){
      possibleMoves.push([row - 2, col - 2])
    }
    //check right
    if (row - 2 >= 0 && col + 2 <= 7 && board[row - 1][col + 1] === '0' && board[row - 2][col + 2] === ' '){
        possibleMoves.push([row - 2, col + 2])
    }
    return possibleMoves
}

/**
 * Return all possible moves for the selected Blue piece at (`row`, `col`)
 * @param {[[int]]} board 
 * @param {int} row 
 * @param {int} col 
 * @returns [[int]]
 */
function getMovesBlue(board, row, col) {

    let possibleMoves = getForcedBlue(board, row, col)
    //if forced moves exist, return early
    if(possibleMoves.length > 0) {
        return possibleMoves
    }
    //check left boundary
    if ((row - 1 >= 0) && (col - 1 >= 0)){
      //possible empty square move

      if(board[row - 1][col - 1] === ' '){
        possibleMoves.push([row - 1, col - 1])
      }
    }
    //check right boundary
    if ((row - 1 >= 0) && (col + 1 <= 7)){
      //possible empty square move
      if(board[row - 1][col + 1] === ' '){
        possibleMoves.push([row - 1, col + 1])
      }
    } 
    return possibleMoves
}


/**
 * Look for forced moves for player `color` on the board.
 * Returns a list of coordinates of the form `[initial_row, initial_col, final_row, final_col]`
 * Red is 0, Blue is 1.
 * @param {[[int]]} board 
 * @param {str} color
 */
function searchForced(board, color) {
    let allForcedMoves = []

    if(color.toLowerCase() === "red"){
        for (let i = 0; i < 8; i++){
            for (let j = 0; j < 8; j++ ){  
                if (board[i][j] === '0'){
                    allForcedMoves.push(...getForcedRed(board, i, j).map((move) => ([i, j, ...move])))
                }
            }
        }
    }

    if (color.toLowerCase() === "blue"){
        for (let i = 0; i < 8; i++){
            for (let j = 0; j < 8; j++ ){  
                if(board[i][j] === '1'){
                    allForcedMoves.push(...getForcedBlue(board, i, j).map((move) => ([i, j, ...move])))
                }
            }
        }
    }
    console.log(allForcedMoves)
    return allForcedMoves
}

/**
 * Maps array of sub arrays of ints to array of string represented sub arrays.
 * @param {[[int]]} arr 
 * @returns [str]
 */
function nestedToStr(arr){
    return arr.map(elem => (elem.toString()))
}


//make a fucntion getTakes
//if taking sequence is possible, Show moves after another, if the user keeps taking. If user click elsewhere after a move, 
//end the taking squence and switch turns.
export {mutateTaking, removeHighlights, searchForced, getMovesBlue, getMovesRed, copyBoard, updateCoordinates, nestedToStr, getForcedRed, getForcedBlue}