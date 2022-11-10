import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import PrivateRoute from "./components/PrivateRoute";
import Game from "./pages/game";
import Home from "./pages/home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";


const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

export const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <Fragment>
        <Routes>
          <Route exact path="/game" element={<PrivateRoute />}>
            <Route exact path="/game" element={<Game />} />
          </Route>
          <Route exact path="/" element={ <PrivateRoute />}>
            <Route exact path="/" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Fragment>
    </Router>
  </ApolloProvider>
);

export default App;
