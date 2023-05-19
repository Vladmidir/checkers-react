### Structure
- App consists of Game, Board and Squares
- Game keeps track of whose turn it is, passing props to Board.
- Board keeps Sqaure array that keep 
- Board decides which square are allowed to move (has piece & their turn)
- Board tells which squares to highlight (onClick if the checker is allowed to move, highlight possible moves. 
The Board calculates moves based on 'position' state). Recalculate highlights on every click.
- If the hilighted square is clicked, make the move. Update 'position' state, pass the props to each square that needs to change.
- After every move, Game checks for Winner.

- Each square has a piece. Each piece has a color.


### do next
- Check if the player is blocked to determine winner.
- Finished the game! Maybe do drag-and-drop next.

### interesting
- React fails to change the same state (array) twice in a row. When I setBoard and then setBoard right after, the first setBoard does not save, and only the second (last) setBoard applies. Why?
- King does not jump across the board (interesting).

### General notes
- useRef() hook creates an object with value .current that preservs its value after every render, but (unlike state) does NOT rerender the element when the .current value is updated.
- refs can not be used on custom components. We must use React.forwardRef instead   