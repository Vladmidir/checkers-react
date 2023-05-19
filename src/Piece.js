
export default function Piece({color}) {
    //do I really need this to be a state? Keep it as is for now.
    let char = '●'
    /**
      * Determine the color of the piece, or if it is highlighted
      */
    function determineColor(){
      
      if (color === '0'){
        return 'red'
      }
      else if(color === '1'){
        return 'blue'
      }
      else if(color === '11'){
        char = '★'
        return 'blue queen'
      }
      else if(color === '00'){
        char = '★'
        return 'red queen'
      }
      else if(color === '+'){
        //The square of this piece is highlighted
        return 'highlighted'
      }
      else {
        return ' '
      }
    }
  
    return (
      <div
      className={"piece " + determineColor()}>
        {(color !== ' ') ? char : ' '}
      </div>
    )
  }