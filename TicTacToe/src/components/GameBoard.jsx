import {useState} from 'react';


export default function GameBoard() {
    const intialGameBoard = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];

    const [gameBoard, setGameBoard] = useState(intialGameBoard);
    
    function handleSelectSquare(rowIndex, colIndex){
        setGameBoard((prevGameBoard)=>{
            const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
            updatedBoard[rowIndex][colIndex] = 'X';
            return updatedBoard;
        });
    }

    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => (
                            <li key={colIndex}> 
                                <button onClick={() => handleSelectSquare(rowIndex,colIndex) }>{playerSymbol}</button> 
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
    
}