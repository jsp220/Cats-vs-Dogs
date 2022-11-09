import React from 'react';
import CodeNames from '../components/codeNames'


function Game({client}) {
  return (
    <div className="App">
      <header className="App-header">
        <CodeNames client={client}/>
      </header>
    </div>
  );
}

export default Game;
