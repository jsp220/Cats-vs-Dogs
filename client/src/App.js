import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Game from './pages/game'

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
});
 
export const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <Routes>
        <Route
          path = "/game"
          element={<Game />}
        />
      </Routes>
    </Router>
  </ApolloProvider>
)

export default App;
