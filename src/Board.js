import { useState } from "react";
import Square from "./Square";
import {removeHighlights, mutateTaking, getMovesBlue, getMovesRed, copyBoard, updateCoordinates, searchForced, nestedToStr} from "./utils";
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
     * Sets the selectedPiece if a piece was clicked, resets selectedPiece if empty square was clicked.
     * Sets SelectedPiece to true if a piece was clicked, false otherwise.
     * Returns an array of all valid move coordinates for the selected piece.
     */
    const showMoves = (row, col) => {
      
      let selected = board[row][col]

      if (selected === '0' && redToMove){
        //calculate possible moves for red piece selected
        let possibleMoves = getMovesRed(board, row, col)
        //calculate all forced moves for red
        const forcedMoves = nestedToStr(searchForced(board, "red"))
        //If there are forced moves on the board AND the selected piece has possible moves, then
        //make sure the possible moves are among the forced.
        console.log(possibleMoves)
        if (forcedMoves.length > 0 && possibleMoves.length > 0){
            possibleMoves = possibleMoves.filter(move => forcedMoves.includes(move.toString()))
        }
        console.log(possibleMoves)
        // Record the selectedPiece and return possible moves
        setShowingMoves(true)
        setSelectedPiece([row, col])
        return possibleMoves
      }
      
      else if (selected === '1' && !redToMove){
        //calculate possible moves for blue piece selected
        let possibleMoves = getMovesBlue(board, row, col)
        //calculate all forced moves for blue
        const forcedMoves = nestedToStr(searchForced(board, "blue")) //maybe represented it in str format in utils.js to shorten code.
        //If there are forced moves on the board AND the selected piece has possible move, then
        //make sure the possible moves are among the forced.
        if (forcedMoves.length > 0 && possibleMoves.length > 0){
            possibleMoves = possibleMoves.filter(move => forcedMoves.includes(move.toString()))
        }

        // Record the selectedPiece and return possible moves
        setSelectedPiece([row, col])
        setShowingMoves(true)
        return possibleMoves
      }
      //empty square was clicked
      else{
        //hide moves
        setShowingMoves(false)
        setSelectedPiece([])
        //remove all highlights
        const newBoard = removeHighlights(copyBoard(board))
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
      
      //invalid final square => early return
      if (board[final[0]][final[1]] !== "+" || (final[0] === inital[0] && final[1] === inital[1])){
        setShowingMoves(false)
        setSelectedPiece([])
        //remove highlights
        const newBoard = copyBoard(board)
        removeHighlights(newBoard)
        setBoard(newBoard)
        return 
      }
      let newBoard = copyBoard(board)
      //##Mutate the copied board##
      //Check the move is taking (piece moves 2 rows if when taking)
      if(Math.abs(final[0] - inital[0]) === 2){
        mutateTaking(inital, final, newBoard)
      }
      
      //update the final and inital
      newBoard[final[0]][final[1]] = board[inital[0]][inital[1]]
      newBoard[inital[0]][inital[1]] = ' '
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
      } 
      //No piece selected, try to select a piece.
      else {
        let possibleMoves = showMoves(row, col)
        //highlight every possible move (+ means highlighted square)
        setBoard(updateCoordinates(copyBoard(board), possibleMoves, '+'))
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