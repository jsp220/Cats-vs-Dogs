import React from "react";
import JoinGame from "../components/JoinGame";
import Rules from "../components/rules";
import LogoutBtn from "../components/logout";
import NewGame from "../components/newGame";
import "bootstrap/dist/css/bootstrap.min.css";

export const Home = () => {

  return (
    <div>
      <LogoutBtn />
      <div className="row">
        <div className="title text-center col-12">CATS VS. DOGS</div>
      </div>
      <Rules />
      <div className="container-fluid">
        <div className="gameCard row">
          <NewGame />
          <JoinGame />
        </div>
      </div>

    </div>
  );
};

export default Home;
