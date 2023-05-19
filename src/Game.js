import { useEffect, useState } from "react";
import Board from "./Board";
import {redWon, blueWon} from "./utils"

export default function Game(){
    const [redToMove, setRedToMove] = useState(false)
    const [text, setText] = useState('blue to move')
    //unfortunately had to take the board out of the Board element, to check for the winner.
    const [board, setBoard] = useState([
      [' ', '0', ' ', '0', ' ', '0', ' ', '0'],
      ['0', ' ', '0', ' ', '0', ' ', '0', ' '],
      [' ', '0', ' ', '0', ' ', '00', ' ', '0'],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      ['1', ' ', '1', ' ', '1', ' ', '1', ' '],
      [' ', '1', ' ', '1', ' ', '11', ' ', '1'],
      ['1', ' ', '1', ' ', '1', ' ', '1', ' ']
    ])

    async function makeMove(){
      //swap turn
      setRedToMove(!redToMove)
      setText((!redToMove ? 'red' : 'blue') + ' to move') 
    }

    //check for the winner every time board rerenders
    useEffect(() => {
      if(redWon(board)){
        setText("RED WINS !!!")
      }
      else if (blueWon(board)){
        setText("BLUE WINS !!!")
      }
    }, [board])

    return( 
    <>
      <h2>{text}</h2>
      <Board 
      redToMove={redToMove}
      moveMade={makeMove}
      board={board}
      setBoard={setBoard}
      ></Board>
    </>)
  }