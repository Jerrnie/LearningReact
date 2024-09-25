import {useState, useRef} from 'react';

export default function Player() {
  const thePlayerName = useRef();

  const [playerName,setPlayerName] = useState(null);


  function handleClick(){
    setPlayerName(thePlayerName.current.value);
    thePlayerName.current.value = "";
  }
    
  return (
    <section id="player">
      <h2>Welcome {playerName ?? 'unknown entity'}</h2>
      <p>
        <input 
        ref={thePlayerName} 
        type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
