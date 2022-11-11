import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import PrivateRouteNoToken from "./components/PrivateRouteNoToken";
import PrivateRouteWithToken from "./components/PrivateRouteWithToken";
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
          <Route exact path="/game" element={<PrivateRouteNoToken />}>
            <Route exact path="/game" element={<Game />} />
          </Route>
          <Route exact path="/" element={ <PrivateRouteNoToken />}>
            <Route exact path="/" element={<Home />} />
          </Route>
          <Route exact path="/login" element={ <PrivateRouteWithToken />}>
            <Route exact path="/login" element={<Login />} />
          </Route>
          <Route exact path="/signup" element={ <PrivateRouteWithToken />}>
            <Route exact path="/signup" element={<Signup />} />
          </Route>
        </Routes>
      </Fragment>
    </Router>
  </ApolloProvider>
);

export default App;
