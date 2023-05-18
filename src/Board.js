import { useState } from "react";
import Square from "./Square";
import {removeHighlights, mutateTaking, getMovesBlue, getMovesRed, copyBoard, 
  getForcedBlue, getForcedRed, updateCoordinates, searchForced, nestedToStr} from "./utils";
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
    const [series, setSeries] = useState(false)

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
        if (forcedMoves.length > 0 && possibleMoves.length > 0){
            possibleMoves = possibleMoves.filter(move => forcedMoves.includes(row + ',' + col + ',' + move.toString()))
        }
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
            possibleMoves = possibleMoves.filter(move => forcedMoves.includes(row + ',' + col + ',' + move.toString()))
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
     * move the piece at initial to final, leaving an empty square behind.
     */
    const makeMove = (initial, final) => {
      
      //invalid final square => early return
      if (board[final[0]][final[1]] !== "+" || (final[0] === initial[0] && final[1] === initial[1])){
        setShowingMoves(false)
        setSelectedPiece([])
        //remove highlights
        const newBoard = copyBoard(board)
        removeHighlights(newBoard)
        setBoard(newBoard)
        //end the series if the series is going
        if(series){
          setSeries(false)
          moveMade()
        }
        return 
      }
      let newBoard = copyBoard(board)

      //##MUTATE THE COPIED BOARD##
      //Check if the move is taking (piece moves 2 rows when taking)
      if(Math.abs(final[0] - initial[0]) === 2){
        //execute the taking on the newBoard
        mutateTaking(initial, final, newBoard)
        //If a piece was taken, check for other possible takes from `final`. If new takes are possible, show them. Else pass the turn.
        let continuedTakes = []
        //red just took, check for red series
        if(board[initial[0]][initial[1]] === '0'){
          continuedTakes = getForcedRed(newBoard, final[0], final[1])
          if(continuedTakes.length > 0){
            //update the board, because we will early return
            newBoard[final[0]][final[1]] = board[initial[0]][initial[1]]
            newBoard[initial[0]][initial[1]] = ' '
            removeHighlights(newBoard)
            //show the possible continuations
            setBoard(updateCoordinates(newBoard, continuedTakes, '+'))
            setShowingMoves(true)
            setSelectedPiece(final)
            setSeries(true) //start the taking series
            return
          }
        }
        //blue just took, check for blue series
        if(board[initial[0]][initial[1]] === '1'){
          continuedTakes = getForcedBlue(newBoard, final[0], final[1])
          //continued takes exist, display them
          if(continuedTakes.length > 0){
            //update the board, because we will early return
            newBoard[final[0]][final[1]] = board[initial[0]][initial[1]]
            newBoard[initial[0]][initial[1]] = ' '
            removeHighlights(newBoard)
            //show the possible continuations
            setBoard(updateCoordinates(newBoard, continuedTakes, '+'))
            setShowingMoves(true)
            setSelectedPiece(final)
            //start the taking series
            setSeries(true) 
            return
          }
        }
      }
      //update the final and initial
      newBoard[final[0]][final[1]] = board[initial[0]][initial[1]]
      newBoard[initial[0]][initial[1]] = ' '
      removeHighlights(newBoard)
  
      //update the board
      setBoard(newBoard)
      //Reset all selections
      setShowingMoves(false)
      setSelectedPiece([])
      setSeries(false)
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
        //break the series if the series is active.
        if (series){
          setShowingMoves(false)
          setSelectedPiece([])
          setSeries(!series)
          moveMade()
        }
        else{
          let possibleMoves = showMoves(row, col)
          //highlight every possible move (+ means highlighted square)
          setBoard(updateCoordinates(copyBoard(board), possibleMoves, '+'))
        }
        
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