import {useState} from 'react';
import { WINNING_COMBINATIONS } from './winning-combinations';

import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from './components/Log';

const intialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriveActivePlayer(gameTurns){
  return gameTurns.length % 2 === 0 ? 'X' : 'O';
}

function App() {

  const [gameTurns, setGameTurns] = useState([]);
  
  let gameBoard = intialGameBoard;

  for(const turn of gameTurns){
    const {square, player} = turn;
    const { row , col } = square;

    gameBoard[row][col] = player;
  }

  const activePlayer = deriveActivePlayer(gameTurns);

  let winner; 

  for (const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol  = gameBoard[combination[0].row][combination[0].col];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].col];
    const thirdSquareSymbol  = gameBoard[combination[2].row][combination[2].col];

    console.log(firstSquareSymbol);
   
    if(
      firstSquareSymbol && 
      firstSquareSymbol === secondSquareSymbol &&
       firstSquareSymbol === thirdSquareSymbol
    ){
      console.log('winner');
      winner = firstSquareSymbol; 
      break;
    }
  }
 
  function handleSelectSquare({rowIndex, colIndex}){
    setGameTurns((prevTurns) => {
    const currentPlayer = deriveActivePlayer(prevTurns);
    const updatedTurns = [{square : { row: rowIndex, col: colIndex }, player: currentPlayer},...prevTurns,]; 

    return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName='Player 1' symbol='X'isActive={activePlayer === 'X'}/>
          <Player initialName='Player 2' symbol='O'isActive={activePlayer === 'O'}/>
        </ol>
        {winner && <p> You're the winner {winner}</p>}
        <GameBoard 
        onSelectSquare={handleSelectSquare} 
        turns={gameTurns}
        board={gameBoard}
        />
      </div>
    <Log turns={gameTurns} />
    </main>
  )
}

export default App
