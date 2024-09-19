export default function GameOver({winner, onRestart, hasDraw}){
    return <div id="game-over">
        <h2>Game Over!</h2>
        { winner && <p >{winner} won!</p>}
        { hasDraw && <p >Draw!</p>}
        <p><button onClick={onRestart}>Rematch!</button></p>
    </div>
}