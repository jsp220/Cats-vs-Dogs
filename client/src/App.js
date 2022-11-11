import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import PrivateRoute from "./components/PrivateRoute";
import Game from "./pages/game";
import Home from "./pages/home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Test from "./pages/Test";


const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

export const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <Fragment>
        <Routes>
          <Route path="/game/:gameName" element={<PrivateRoute />}>
            <Route path="/game/:gameName" element={<Game />} />
          </Route>
          <Route exact path="/" element={ <PrivateRoute />}>
            <Route exact path="/" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </Fragment>
    </Router>
  </ApolloProvider>
);

export default App;
