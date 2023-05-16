import { useState } from "react";
import Square from "./Square";

export default function Board({redToMove, moveMade}) {
    //model of the checkers board.
    //used to update the elements.
    const [board, setBoard] = useState([
      [' ', '0', ' ', '0', ' ', '0', ' ', '0'],
      ['0', ' ', '0', ' ', '0', ' ', '0', ' '],
      [' ', '0', ' ', '0', ' ', '0', ' ', '0'],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      ['1', ' ', '1', ' ', '1', ' ', '1', ' '],
      [' ', '1', ' ', '1', ' ', '1', ' ', '1'],
      ['1', ' ', '1', ' ', '1', ' ', '1', ' ']
    ])
  
    const [showingMoves, setShowingMoves] = useState(false)
    const [selectedPiece, setSelectedPiece] = useState([])
  
    /**
     * Replace all highlights ('+') on _board with empty squares (' ').
     * Mutates the given _board (dost NOT setBoard).
     */
    const removeHighlights = (_board) => {
      for (let i = 0; i < 8; i++){
        for (let j = 0; j < 8; j++){
          if(_board[i][j] === '+'){
            _board[i][j] = ' '
          }
        }
      }
      console.log(_board)
    }
  
    /**
     * Changes the charater at every coordinate in coordinates to 'char'.
     * Updates the original board (does setBoard).
     */
    const updateCoordinates = (coordionates, char) => {
      //copy the board
      let newBoard = board.map((row) => {
        return row.slice()
      });
      //update the copied board
      for (let coordinate of coordionates){
        newBoard[coordinate[0]][coordinate[1]] = char
      }
      //update the board
      setBoard(newBoard)
    }

    /**
     * Sets the selectedPiece if a piece was clicked, resets selectedPiece if empty square was clicked.
     * Sets SelectedPiece to true if a piece was clicked, false otherwise.
     * Returns an array of all valid move coordinates for the selected piece.
     * THIS WILL GET MORE COMPLEX AS WE IMPLEMENT THE ABILITY TO TAKE ENEMY PIECES.
     */
    const showMoves = (row, col) => {
      
      let selected = board[row][col]
  
      if (selected === '0' && redToMove){
        //calculate moves for red
        let possibleMoves = []
  
        if ((row + 1 <= 7) && (col - 1 >= 0)){
          possibleMoves.push([row + 1, col - 1])
        }
        
        if ((row + 1 <= 7) && (col + 1 <= 7)){
          possibleMoves.push([row + 1, col + 1])
        }
  
        setShowingMoves(true)
        setSelectedPiece([row, col])
        return possibleMoves
      }
      else if (selected === '1' && !redToMove){
        //calculate moves for blue
        console.log('blue')
        let possibleMoves = []
  
        if ((row - 1 >= 0) && (col - 1 >= 0)){
          possibleMoves.push([row - 1, col - 1])
        }
        
        if ((row - 1 >= 0) && (col + 1 <= 7)){
          possibleMoves.push([row - 1, col + 1])
        }
  
        setSelectedPiece([row, col])
        setShowingMoves(true)
        return possibleMoves
      }
      else{
        //hide moves if clicked an empty square
        setShowingMoves(false)
        setSelectedPiece([])
        //remove all highlights
        const newBoard = removeHighlights(
            board.map((row) => {
              return row.map((cell) => {
                return cell
              })
            })
          )
        setBoard(newBoard)
        //no moves possible (no piece selected)
        return []
      }
    }
  
    /**
     * If final is highlighted (meaning valid move),
     * move the piece at inital to final, leaving an empty square behind.
     */
    const makeMove = (inital, final) => {
      
      //invalid final square
      if (board[final[0]][final[1]] !== "+"){
        setShowingMoves(false)
        setSelectedPiece([])
        //remove highlights
        const newBoard = board.map((row) => (row.map((cell) => (cell))))
        removeHighlights(newBoard)
        setBoard(newBoard)
        return 
      }
      //copy the board
      let newBoard = []
      for (let i = 0; i < 8; i++){
        newBoard.push(board[i].slice())
      }
      //mutate the copied board
      if (final[0] !== inital[0] || final[1] !== inital[1] ){
        newBoard[final[0]][final[1]] = board[inital[0]][inital[1]]
        newBoard[inital[0]][inital[1]] = ' '
      }
      removeHighlights(newBoard)
  
      //update the board
      setBoard(newBoard)
      //Reset all selections
      setShowingMoves(false)
      setSelectedPiece([])
      //Let the Game know that a move was made
      moveMade()
    }
  
    /**
     * Show possible moves if a new piece is selected.
     * Move a piece if a valid move is selected.
     * Go back to selection mode if the move is invalid.
     */
    const handleClick = (row, col) => {
      //Possible moves are shown, try to make a move.
      if (showingMoves) {
        makeMove(selectedPiece, [row, col])
        console.log('making')
      } 
      //No piece selected, try to select a piece and show the possible moves.
      else {
        let possibleMoves = showMoves(row, col)
        console.log('Showing')
        console.log(possibleMoves)
        //highlight every possible move (+ means highlighted square)
        updateCoordinates(possibleMoves, '+')
  
      }
    }
  
    //pass each element in the board array as 'piece' to Square element
    return (
      <>
      {board.map((row, i) => {
        return (<div className="board-row" key={''+i} id={"row-"+i}>
          {
          row.map((cell, j) => {
            return <Square 
            key={''+ i + j} 
            id={''+ i + j}
            piece={cell} 
            handleClick={() => handleClick(i, j)}
            >
            </Square>
          })}
        </div>)
      })}
      </>
    );
  }