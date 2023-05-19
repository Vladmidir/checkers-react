import Piece from './Piece.js'

export default function Square({id, piece, handleClick}) {
    //determine the color of the square based on id. (we use square coordinates as id)
    let isWhite = false
    if((id[0] % 2 !== 0 && id[1] % 2 !== 0) || (id[0] % 2 === 0 && id[1] % 2 ===0)){
      isWhite = true
    }

    //pass 'piece' to the Piece element
    return (
      <button 
      id={id} 
      className={"square " + (isWhite ? "white " : "black ")}
      onClick={handleClick}>
        <Piece color={piece}></Piece>
      </button>
    )
  }