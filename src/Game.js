import { useState } from "react";
import Board from "./Board";

export default function Game(){
    const [redToMove, setRedToMove] = useState(true)
  
    function makeMove(){
      setRedToMove(!redToMove)
    }
  
  
    return( 
    <>
      <h2>{(redToMove ? 'red' : 'blue') + ' to move'}</h2>
      <Board 
      redToMove={redToMove}
      moveMade={makeMove}
      ></Board>
    </>)
  }