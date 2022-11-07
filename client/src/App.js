import * as React from 'react'
import './App.css';
import Title from './pages/title';
import GameLog from './pages/gameLog';
import Team1 from './pages/team1';
import Team2 from './pages/team2';
import Card from './pages/card';
import Rules from './pages/rules';
import Header from './pages/header';
import { ChakraProvider } from '@chakra-ui/react';



function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <header className="App-header">
          <Header />
          <Title />
          <Team1 />
          <Team2 />
          <Card />
          <Rules />
          <GameLog />
        </header>
      </div>
    </ChakraProvider>
  );
}

export default App;
