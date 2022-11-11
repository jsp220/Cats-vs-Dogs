import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "../CodeNames.css";
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { QUERY_WORDS, QUERY_USER, QUERY_GAME } from '../utils/queries';
import { UPDATE_GAME, UPDATE_TEAM } from "../utils/mutations";

import Auth from '../utils/auth';

// Added for card images... (BZ)
import dog1 from "../images/dog1.png";
import dog2 from "../images/dog2.png";
import dog3 from "../images/dog3.png";
import dog4 from "../images/dog4.png";
import dog5 from "../images/dog5.png";
import dog6 from "../images/dog6.png";
import dog7 from "../images/dog7.png";
import dog8 from "../images/dog8.png";
import dog9 from "../images/dog9.png";
import dog10 from "../images/dog10.png";
import dog11 from "../images/dog11.png";
import dog12 from "../images/dog12.png";
import dog13 from "../images/dog13.png";
import dog14 from "../images/dog14.png";
import dog15 from "../images/dog15.png";
import cat1 from "../images/cat1.png";
import cat2 from "../images/cat2.png";
import cat3 from "../images/cat3.png";
import cat4 from "../images/cat4.png";
import cat5 from "../images/cat5.png";
import nut1 from "../images/neutral1.png";
import nut2 from "../images/neutral1.png";
import nut3 from "../images/neutral1.png";
import assassin from "../images/corgiAssassin.png"


//import { CSSTransitionGroup } from 'react-transition-group'
import "animate.css";
import styled, { keyframes } from "styled-components";
// import {
//   bounce,
//   flipInX,
//   rollIn,
//   rollOut,
//   hinge,
//   zoomIn,
// } from "react-animations"; 
// Adjusted for the used animation methods. (BZ)
import { rollIn,  zoomIn } from "react-animations";

import { REVEALED_CLASSNAMES, BASE_TURNS } from "../constants";
import { pickRandomPlayer, initializeCardRevealed } from "../util_functions";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3000");

// Removed, not used... (BZ)
// const FlipInX = styled.div`
//   animation: 2s ${keyframes`${flipInX}`};
// `;
// const Bounce = styled.div`
//   animation: 2s ${keyframes`${bounce}`};
// `;
const RollIn = styled.div`
  animation: 2s ${keyframes`${rollIn}`};
`;

// Removed, not used... (BZ)
// const RollOut = styled.div`
//   animation: 2s ${keyframes`${rollOut}`};
// `;
// const Hinge = styled.div`
//   animation: 2s ${keyframes`${hinge}`};
// `;
const ZoomIn = styled.div`
  animation: 2s ${keyframes`${zoomIn}`};
`;

// declare variables for setting up the game
const HIDDEN_CLASSNAMES = new Array(25).fill("hidden-card");
const ROWS = 5;
const COLUMNS = 5;


function Card(props) {

    /* Added card Images. (BZ) */
    let idx = props.backgroundImage;
    let image = null;
    if (!props.word) {
      if (idx == 1) image = dog1;
      if (idx == 2) image = dog2;
      if (idx == 3) image = dog3;
      if (idx == 4) image = dog4;
      if (idx == 5) image = dog5;
      if (idx == 6) image = dog6;
      if (idx == 7) image = dog7;
      if (idx == 8) image = dog8;
      if (idx == 9) image = dog9;
      if (idx == 10) image = dog10;
      if (idx == 11) image = dog11;
      if (idx == 12) image = dog12;
      if (idx == 13) image = dog13;
      if (idx == 14) image = dog14;
      if (idx == 15) image = dog15;
      if (idx == 16) image = cat1;
      if (idx == 17) image = cat2;
      if (idx == 18) image = cat3;
      if (idx == 19) image = cat4;
      if (idx == 20) image = cat5;
      if (idx == 21) image = nut1;
      if (idx == 22) image = nut2;
      if (idx == 23) image = nut3;
      if (image == null) image = assassin;
    } else
      image = "";
  
  return (
    <ZoomIn key={props.word}>
      <button style={
        { backgroundImage: `url(${image})`, 
          backgroundSize: "100% 100%" }} 
          className={props.cardClass} 
          onClick={props.onClick}>
        {props.word}
      </button>
    </ZoomIn>
  );
}

function Gear(props) {
  return (
    <RollIn>
      <div className="gear" onClick={props.onClick}>
        <svg
          width="30"
          height="30"
          viewBox="0 0 35 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.3344 4.86447L24.31 8.23766C21.9171 9.80387 21.1402 12.9586 22.5981 15.4479C23.038 16.1989 23.6332 16.8067 24.3204 17.2543L22.2714 20.7527C20.6682 19.9354 18.6888 19.9151 17.0088 20.8712C15.3443 21.8185 14.3731 23.4973 14.2734 25.2596H10.3693C10.3241 24.4368 10.087 23.612 9.64099 22.8504C8.16283 20.3266 4.93593 19.4239 2.34593 20.7661L0.342913 17.3461C2.85907 15.8175 3.70246 12.5796 2.21287 10.0362C1.74415 9.23595 1.09909 8.59835 0.354399 8.14386L2.34677 4.74208C3.95677 5.5788 5.95446 5.60726 7.64791 4.64346C9.31398 3.69524 10.2854 2.0141 10.3836 0.25H14.267C14.2917 1.11932 14.5297 1.99505 15.0012 2.80013C16.4866 5.33635 19.738 6.23549 22.3344 4.86447ZM15.0038 17.3703C17.6265 15.8776 18.5279 12.5685 17.0114 9.97937C15.4963 7.39236 12.1437 6.50866 9.52304 8.00013C6.90036 9.4928 5.99896 12.8019 7.5154 15.391C9.03058 17.978 12.3832 18.8617 15.0038 17.3703Z"
            transform="translate(12.7548) rotate(30)"
            fill="#EEE"
            stroke="#BBB"
            strokeWidth="0.5"
          ></path>
        </svg>
      </div>
    </RollIn>
  );
}



function Board(props) {
  function renderCard(i) {

    // Clear word with card has been flipped. (BZ)
    if (props.cardFlipped[i]) props.cardWords[i] = "";

    return (
      <Card
        backgroundImage={i} // Added for card image. (BZ)
        word={props.cardWords[i].toUpperCase()}
        cardClass={props.cardClass[i]}
        onClick={() => props.onClick(i)}
        className="card-body"
      />
    );
  }

  function renderColumns(rowPosition) {
    const columns = [];
    for (let columnPosition = 0; columnPosition < COLUMNS; columnPosition++) {
      columns.push(renderCard(columnPosition + rowPosition * ROWS));
    }
    return columns;
  }

  function renderRows() {
    const rows = [];
    for (let rowPosition = 0; rowPosition < ROWS; rowPosition++) {
      rows.push(
        <div className="board-row" key={rowPosition}>{renderColumns(rowPosition)}</div>
      );
    }
    return rows;
  }

  return <div> {renderRows()} </div>
}

function CodeNames() {
  const firstPlayer = "red";

  const [cardFlipped, setCardFlipped] = useState(new Array(25).fill(false)); // Added for card flip. (BZ)
  const [words, setWords] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [startGame, setStartGame] = useState(false);
  const [cardColor, setCardColor] = useState([]); // css class: hidden-card, red, blue
  const [cardClass, setCardClass] = useState(HIDDEN_CLASSNAMES); // initial classNames are 'hidden-card'
  const [clue, setClue] = useState("");
  const [isRedTurn, setIsRedTurn] = useState(true);
  const [isClueTurn, setIsClueTurn] = useState(true);
  const [status, setStatus] = useState("red-turn");
  const [blueRemaining, setBlueRemaining] = useState(8);
  const [redRemaining, setRedRemaining] = useState(9);
  const [showEndTurn, setShowEndTurn] = useState(true);
  const [view, setView] = useState("agent");
  const [winner, setWinner] = useState("");
  const [inputClue, setInputClue] = useState("");
  const [statusMessage, setStatusMessage] = useState("Team Cat's Turn")

  const [queryUser, { uLoading, uError, uData }] = useLazyQuery(QUERY_USER)
  const [queryGame, { gLoading, gError, gData }] = useLazyQuery(QUERY_GAME)
  const [updateGame, { gErr }] = useMutation(UPDATE_GAME);
  const [updateTeam, { uErr }] = useMutation(UPDATE_TEAM);

  const isGameOver = () => {
    if (redRemaining === 0 || blueRemaining === 0) {
      const status = "game-over-" + (isRedTurn ? "red" : "blue");
      setStatus(status);
      setShowEndTurn(false);
      setWinner(isRedTurn ? "Red" : "Blue");
      setStatusMessage(isRedTurn ? "TEAM CAT WINS!" : "TEAM DOG WINS!")

    }
  };

  const renderLog = () => {
    if (clue) return <div>Team {isRedTurn ? "Cat" : "Dog"}'s spymaster gives a clue: {clue}.</div>
  }

  const handleCardClick = (i) => {
    if (
      status.includes("game-over") ||
      view === "spymaster"
    ) {
      return null; // disable clicking if spymaster
    }

    // console.log(i);
    // Added for card flipping. (BZ)
    if (!cardFlipped[i]) {
      words[i] = "";
      cardFlipped[i] = true;
    }    

    socket.emit("send_card_click", {
      i: i,
      isRedTurn: isRedTurn,
      cardFlipped: cardFlipped, // Added updated array to socket. (BZ)
      cardClass: cardClass,
      cardColor: cardColor,
      blueRemaining: blueRemaining,
      redRemaining: redRemaining
    })

  };

  function updateScore(data) {
    // only update score if card has not been revealed already
    if (cardClass[data.i] !== "hidden-card") {
      return null;
    }

    // update red or blue team's score
    // ensure game over is checked only after remaining
    if (cardColor[data.i] === "red") {
      setRedRemaining(data.redRemaining - 1);
    }
    else if (cardColor[data.i] === "blue") {
      setBlueRemaining(data.blueRemaining - 1);
    }
  }

  const handleEndTurnClick = () => {
    // console.log("end turn");
    socket.emit("send_end_turn", { turn: isRedTurn });
    // console.log(isRedTurn, "sending end")
  };

  const handleSpymasterClick = () => {
    // do not map cards that aren't "hiddencard" for class
    const spymasterCardNames = cardClass.map((card, i) => {
      if (card === "hidden-card") {
        return "spymaster-" + cardColor[i];
      } else {
        return card;
      }
    });

    setCardClass(spymasterCardNames);
    setView("spymaster");
    // when clicked, all text should bold and 'status' is used as font-color
  };

  const handleAgentClick = () => {
    setCardClass(HIDDEN_CLASSNAMES);
    setView("agent");
    // when clicked, all text should bold and 'status' is used as font-color
  };

  const handleGearClick = () => {
    alert("How to play codenames: https://www.youtube.com/watch?v=zQVHkl8oQEU");
  };

  function newGame(i) {
    window.location.reload(false);
  }

  // toggle only clue/guess on Change
  function handleSubmit(e) {
    // prevent refresh of game on each submit
    e.preventDefault();

    if (!isClueTurn) alert("You can only give one clue at at time.")
    else {
      // console.log("hi");
      socket.emit("send_clue", { clue: e.target[0].value });
      // clear input box after setting state with clue
      e.target[0].value = "";
    }
  }

  const gameStart = () => {
    socket.emit("send_game_start");
  }

  // check for game end every time either teams remaining cards changes 

  let agentView;
  let spyView;
  if (view === "agent") {
    agentView = "gray-click";
  } else {
    spyView = "gray-click";
  }

  const init = async () => {
    const profile = await Auth.getProfile();
    const userId = profile.data._id;
    let gameId = "";
    let teamCatId = "";

    const URL = document.URL;
    const gameName = URL.slice(URL.lastIndexOf('/') + 1)
    // console.log(gameName)

    try {
      const { data } = await queryGame({ variables: { gameName } });
      // console.log(data);
      gameId = data.game._id;
      teamCatId = data.game.teamCat._id;

      const wordList = data.game.wordList;

      const allWords = wordList.allWords.map((word) => word.name);
      const catWords = wordList.catWords.map((word) => word.name);
      const dogWords = wordList.dogWords.map((word) => word.name);
      const neutralWords = wordList.neutralWords.map((word) => word.name);
      const deathWord = wordList.deathWord.name;

      const wordColors = allWords.map((word => {
        if (catWords.includes(word)) return 'red';
        if (dogWords.includes(word)) return 'blue';
        if (neutralWords.includes(word)) return 'bystander';
        if (deathWord === word) return 'assassin';
      }))

      // console.log(wordColors);

      setWords(allWords);
      setCardColor(wordColors);

    } catch (err) {
      console.error(err);
    }

    try {
      // console.log(userId)
      const { data } = await updateTeam({
        variables:
        {
          teamId: teamCatId,
          userId
        }
      });
      // console.log(data);
      const usersFromBackend = data.updateTeam.users.map((user) => user.username);
      socket.emit("send_users", usersFromBackend);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    isGameOver();
  }, [redRemaining, blueRemaining])

  // useEffect for all socket functions
  useEffect(() => {
    init();

    socket.on("receive_users", (data) => {
      const uniqueUsers = [...new Set(data)];
      setOnlineUsers(uniqueUsers);
    })

    socket.on("receive_game_start", () => {
      setStartGame(true);
    })
    socket.on("receive_clue", (data) => {
      setInputClue("");
      setClue(data.clue);
      setIsClueTurn(false);
      // console.log(data.clue);
    })

    socket.on("receive_end_turn", (data) => {
      // console.log(isRedTurn, "is not changing");
      setIsRedTurn(!data.turn);
      setStatus(!data.turn ? "red-turn" : "blue-turn");
      setStatusMessage(!data.turn ? "Team Cat's Turn" : "Team Dog's Turn")
      setIsClueTurn(true);
    })

    socket.on("receive_card_click", (data) => {
      const i = data.i;
      const cardFlipped = data.cardFlipped; // Added for socket IO. (BZ)
      const classOfCards = data.cardClass;
      updateScore(data);
      classOfCards[i] = data.cardColor[i]; // switch css classNames

      if (
        data.cardColor[i] === "bystander" ||
        (data.isRedTurn === true && data.cardColor[i] === "blue") ||
        (data.isRedTurn === false && data.cardColor[i] === "red")
      ) {
        setIsRedTurn(!data.isRedTurn)
        setStatus(!data.isRedTurn ? "red-turn" : "blue-turn");
        setStatusMessage(!data.isRedTurn ? "Team Cat's Turn" : "Team Dog's Turn");
      } else if (data.cardColor[i] === "assassin") {
        alert("You have chosen the assassin. Game Over.");
        const status = "game-over-" + (data.isRedTurn ? "blue" : "red");
        setStatus(status);
        setShowEndTurn(false);
        setWinner(data.isRedTurn ? "TEAM DOG" : "TEAM CAT");
        setStatusMessage(data.isRedTurn ? "TEAM DOG WINS!" : "TEAM CAT WINS!")
      }

      setCardFlipped(cardFlipped); // Added for Socket IO. (BZ)
      setCardClass(classOfCards);
      setIsClueTurn(true);
    })
  }, [])

  function renderEndTurn() {
    return (
      <button
        className="btn btn-info btn-light"
        onClick={handleEndTurnClick}
      >
        End Turn
      </button>
    );
  }

  const renderGame = () => {
    return (
      <div className="game" >
        <div className="title col-12">CATS VS. DOGS</div>
        <div className="info row col-12">
          <h3 className={"turn col " + status}>{statusMessage}</h3>
          {/* display end turn and show winner based on state */}
          {showEndTurn
            ? renderEndTurn()
            : null}
        </div>
          <Board
            cardFlipped={cardFlipped} // Added for card flip. (BZ)
            cardWords={words}
            cardClass={cardClass}
            onClick={handleCardClick}
          />
        <div className="info row col-12">
          {view == "agent"
            ? null
            : (
              <form onSubmit={handleSubmit}>
                <label className="clueInput">
                  Clue:
                  <input type="text" name="clue" className="formInput" />
                </label>
                <input type="submit" value="Submit" />
              </form>
            )}
          <button
            className="btn btn-info btn-light new-game"
            onClick={(i) => newGame(i)}
          >
            New Game
          </button>
        </div>
        <div className="teamDog">
          <h2 className="blue-turn">Team Dog</h2>
          <h3>
            Card Remaining:{" "}
            <span className="blue-turn">{blueRemaining}</span>
          </h3>
          <h4>Team Member: </h4>
          <div>
            <div className="dogAgent">
              <label
                className={"btn btn-info btn-light " + agentView}
                onClick={handleAgentClick}
              >
                Agent
              </label>
            </div>
            <div className="catSpy">
              <label
                className={"btn btn-info btn-light " + spyView}
                onClick={handleSpymasterClick}
              >
                Spymaster
              </label>
            </div>
          </div>
        </div>
        <div className="teamCat">
          <h2 className="red-turn">Team Cat</h2>
          <h3>
            Card Remaining:{" "}
            <span className="red-turn">{redRemaining}</span>
          </h3>
          <h4>Team Member: </h4>
          <div>
            <div className="catAgent">
              <label
                className={"btn btn-info btn-light " + agentView}
                onClick={handleAgentClick}
              >
                Agent
              </label>
            </div>
            <div className="catSpy">
              <label
                className={"btn btn-info btn-light " + spyView}
                onClick={handleSpymasterClick}
              >
                Spymaster
              </label>
            </div>
          </div>
        </div>
        <div className="rules">
          <h4>Rules</h4>
          <Gear onClick={handleGearClick} />
          <div
            className="btn-group btn-group-toggle"
            data-toggle="buttons"
          ></div>
        </div>
        <div className="gameLog">
          <h4>Game Log</h4>
          {renderLog()}
        </div>
      </div>
    )
  }

  const renderWaitingRoom = () => {
    return (
      <div className="game" >
        <div className="title col-12">CATS VS. DOGS</div>
        <div className="info row col-12">
          <h3>Currently online:</h3>
          <ul>
            {onlineUsers.map((user) => (
                <li key={user}>{user}</li>
              ))}
          </ul>
          <button onClick={gameStart}>Start Game!</button>
        </div>
      </div>
    )
  }

  return (
    <>
      {startGame
        ? renderGame()
        : renderWaitingRoom()
      }
    </>
  );

}

export default CodeNames;