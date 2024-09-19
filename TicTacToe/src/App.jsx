import {useState} from 'react';
import { WINNING_COMBINATIONS } from './winning-combinations';

import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from './components/Log';
import GameOver from './components/GameOver';


const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriveActivePlayer(gameTurns){
  return gameTurns.length % 2 === 0 ? 'X' : 'O';
}

function deriveWinner(gameBoard, players){
  let winner; 

  for (const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol  = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol  = gameBoard[combination[2].row][combination[2].column];
    
    if(
      firstSquareSymbol && 
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ){
      winner = players[firstSquareSymbol]; 
      break;
    }
  }
  return winner;
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map(array=>[...array])];

  for(const turn of gameTurns){
    const {square, player} = turn;
    const { row , col } = square;
    gameBoard[row][col] = player;
  }

  return gameBoard;

}

function App() {

  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers]= useState(PLAYERS);

  const gameBoard = deriveGameBoard(gameTurns);
  const activePlayer = deriveActivePlayer(gameTurns);
  const winner = deriveWinner(gameBoard,players);
  const hasDraw = gameTurns.length === 9 && !winner;
 
  function handleSelectSquare({rowIndex, colIndex}){
    setGameTurns((prevTurns) => {
    const currentPlayer = deriveActivePlayer(prevTurns);
    const updatedTurns = [{square : { row: rowIndex, col: colIndex }, player: currentPlayer},...prevTurns,]; 

    return updatedTurns;
    });
  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayers=>{
      return{
        ...prevPlayers,
        [symbol]: newName
      }
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS.X} symbol='X'isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange}/>
          <Player initialName={PLAYERS.O} symbol='O'isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange}/>
        </ol>
        {(winner  || hasDraw) && 
        <GameOver winner={winner} 
        hasDraw={hasDraw}
        onRestart={handleRestart}
        />  }
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
