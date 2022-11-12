import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect, useRef } from "react";
// import ReactDOM from "react-dom";
import "../CodeNames.css";
import { useLazyQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_GAME } from '../utils/queries';
import { UPDATE_TEAM } from "../utils/mutations";

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
import nut2 from "../images/neutral2.png";
import nut3 from "../images/neutral3.png";
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
import { rollIn, zoomIn } from "react-animations";
import io from "socket.io-client";

const ROOT_URL = 'https://mysterious-hollows-84029.herokuapp.com';
// const socket = io.connect(ROOT_URL);

const socket = io.connect("http://localhost:3000");

const RollIn = styled.div`
  animation: 2s ${keyframes`${rollIn}`};
`;

// declare variables for setting up the game
const HIDDEN_CLASSNAMES = new Array(25).fill("hidden-card");
const ROWS = 5;
const COLUMNS = 5;
let renderNumber = 0;

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

function Card(props) {

  /* Added card Images. (BZ) */
  let idx = props.backgroundImage;
  let image = null;

  if (!props.word) {
    image = props.bgImg;
  } else
    image = "";

  return (
    // <ZoomIn key={props.word}>
    <button style={
      {
        backgroundImage: `url(${image})`,
        backgroundSize: "100% 100%"
      }}
      className={props.cardClass}
      onClick={props.onClick}>
      {props.word}
    </button>
    // </ZoomIn>
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
        bgImg={props.bgImgs[i]}
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

  return (
    <div>
      {renderRows()}
    </div>
  );
}

function CodeNames() {
  const [cardFlipped, setCardFlipped] = useState(new Array(25).fill(false)); // Added for card flip. (BZ)
  const [words, setWords] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [startGame, setStartGame] = useState(false);
  const [cardColor, setCardColor] = useState([]); // css class: hidden-card, red, blue
  // const [cardClass, setCardClass] = useState(HIDDEN_CLASSNAMES); // initial classNames are 'hidden-card'
  const cardClass = useRef(HIDDEN_CLASSNAMES);
  const [clue, setClue] = useState("");
  const [isRedTurn, setIsRedTurn] = useState(true);
  const [isClueTurn, setIsClueTurn] = useState(true);
  const [status, setStatus] = useState("red-turn");
  // const [blueRemaining, setBlueRemaining] = useState(8);
  const blueRemaining = useRef(8);
  // const [redRemaining, setRedRemaining] = useState(9);
  const redRemaining = useRef(9);
  const [showEndTurn, setShowEndTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [statusMessage, setStatusMessage] = useState("Team Cat's turn to give a clue!");
  const [isSpyMaster, setIsSpyMaster] = useState(false);
  const [teamCat, setTeamCat] = useState([]);
  const [teamDog, setTeamDog] = useState([]);
  const [catSpyMaster, setCatSpyMaster] = useState([]);
  const [dogSpyMaster, setDogSpyMaster] = useState([]);
  const [bgImgs, setBgImgs] = useState([]);
  const [myUsername, setMyUsername] = useState("");

  const [queryUser, { uLoading, uError, uData }] = useLazyQuery(QUERY_USER);
  const [queryGame, { gLoading, gError, gData }] = useLazyQuery(QUERY_GAME);
  const [updateTeam, { uErr }] = useMutation(UPDATE_TEAM);

  const init = async () => {
    const profile = await Auth.getProfile();
    const userId = profile.data._id;

    // await Username(userId);
    let gameId = "";
    let teamCatId = "";

    const URL = document.URL;
    const gameName = URL.slice(URL.lastIndexOf('/') + 1)

    try {
      const { data } = await queryGame({ variables: { gameName } });
      gameId = data.game._id;
      teamCatId = data.game.teamCat._id;

      const wordList = data.game.wordList;

      const allWords = wordList.allWords.map((word) => word.name);
      const catWords = wordList.catWords.map((word) => word.name);
      const dogWords = wordList.dogWords.map((word) => word.name);
      const neutralWords = wordList.neutralWords.map((word) => word.name);
      const deathWord = wordList.deathWord.name;

      const catImgs = [cat1, cat2, cat3, cat4, cat5];
      const dogImgs = [dog1, dog2, dog3, dog4, dog5, dog6, dog7, dog8, dog9, dog10, dog11, dog12, dog13, dog14, dog15];
      const miscImgs = [nut1, nut2, nut3];

      let imgs = [];

      const wordColors = allWords.map((word => {
        if (catWords.includes(word)) {
          imgs.push(catImgs[Math.floor(Math.random() * catImgs.length)]);
          return 'red';
        }
        if (dogWords.includes(word)) {
          imgs.push(dogImgs[Math.floor(Math.random() * dogImgs.length)]);
          return 'blue';
        }
        if (neutralWords.includes(word)) {
          imgs.push(miscImgs[Math.floor(Math.random() * miscImgs.length)]);
          return 'bystander';
        }
        if (deathWord === word) {
          imgs.push(assassin);
          return 'assassin';
        }
      }))

      setWords(allWords);
      setCardColor(wordColors);
      setBgImgs(imgs);

    } catch (err) {
      console.error(err);
    }

    try {
      const { data: userData } = await queryUser({ variables: { userId } });
      setMyUsername(userData.user.username);
    } catch (err) {
      console.error(err);
    }

    try {
      const { data } = await updateTeam({
        variables:
        {
          teamId: teamCatId,
          userId
        }
      });
      const usersFromBackend = data.updateTeam.users.map((user) => user.username);
      socket.emit("send_users", usersFromBackend);
    } catch (err) {
      console.error(err);
    }
  }

  const newGame = (i) => {
    window.location.reload(false);
  }

  const handleGearClick = () => {
    alert("How to play codenames: https://www.youtube.com/watch?v=zQVHkl8oQEU");
  };

  const receiveUsers = (data) => {
    const uniqueUsers = [...new Set(data)];
    setOnlineUsers(uniqueUsers);
  }

  // when start game button is clicked
  const gameStart = () => {

    // put all users who joined to team dog, and then...
    let teamDog = [...onlineUsers];
    let teamCat = [];
    const teamCatSize = Math.ceil(teamDog.length / 2);

    // move half (rounded up) into team cat
    for (let i = 0; i < teamCatSize; i++) {

      teamCat.push(teamDog.splice(Math.floor(Math.random() * teamDog.length), 1)[0]);
    }

    //set 0th index members of each team to be spymaster
    const catSpyMaster = teamCat[0];
    const dogSpyMaster = teamDog[0];

    //send all states and team cat/dog info via socket
    socket.emit("send_game_start", { catSpyMaster, dogSpyMaster, teamDog, teamCat });
  }

  const receiveGameStart = (data) => {
    setTeamCat(data.teamCat);
    setTeamDog(data.teamDog);
    setCatSpyMaster(data.catSpyMaster);
    setDogSpyMaster(data.dogSpyMaster);
    setStartGame(true);
  }

  function handleClueSubmit(e) {
    // prevent refresh of game on each submit
    e.preventDefault();

    const clue = e.target[0].value;
    const firstBlank = clue.indexOf(" ");
    const secondBlank = clue.indexOf(" ", firstBlank + 1);
    const number = parseInt(clue.slice(firstBlank + 1));

    if (
      (isRedTurn && teamDog.includes(myUsername))
      || (!isRedTurn && teamCat.includes(myUsername))
    ) {
      alert("It's not your turn!")
      return;
    }
    if (!isClueTurn) {
      alert("You can only give one clue at at time.")
      return;
    }
    if (
      firstBlank === -1 ||
      secondBlank !== -1 ||
      (!number && number !== 0)
    ) {
      alert(`Please enter a valid clue. A valid clue consists of "<word> <number>". For example: "fruit 2"`)
      return;
    }

    socket.emit("send_clue", { clue, isRedTurn });

    e.target[0].value = "";
  }

  const receiveClue = (data) => {
    setClue(data.clue);
    setIsClueTurn(false);
    setStatusMessage(data.isRedTurn ? "Team Cat's turn to guess!" : "Team Dog's turn to guess!")
  }

  const renderLog = () => {
    if (clue) return <div>Team {isRedTurn ? "Cat" : "Dog"}'s spymaster gives a clue: {clue}.</div>
  }

  const handleEndTurnClick = () => {
    if (isRedTurn) {
      if (teamDog.includes(myUsername)) return;
    } else {
      if (teamCat.includes(myUsername)) return;
    }
    if (isClueTurn) {
      console.log("abc");
      return;
    }
    socket.emit("send_end_turn", { isRedTurn });
  };

  const receiveEndTurn = (data) => {
    setIsRedTurn(!data.isRedTurn);
    setStatus(data.isRedTurn ? "blue-turn" : "red-turn");
    setStatusMessage(data.isRedTurn ? "Team Dog's turn to give a clue!" : "Team Cat's turn to give a clue!")
    setIsClueTurn(true);
  }

  const handleCardClick = (i) => {
    // disable clicking if game over, for spy master, or if time for clue
    // console.log(isSpyMaster);
    if (
      status.includes("game-over") ||
      isSpyMaster ||
      isClueTurn ||
      cardFlipped[i]
    ) return;

    // disable clicking if not my turn
    if (isRedTurn) {
      if (teamDog.includes(myUsername)) return null;
    } else {
      if (teamCat.includes(myUsername)) return null;
    }

    socket.emit("send_card_click", { i, cardFlipped, isRedTurn })
  };

  const receiveCardClick = (data) => {
    const i = data.i;
    let flippedCards = [...data.cardFlipped]; // Added for socket IO. (BZ)
    let classOfCards = [...cardClass.current];
    let colorOfCards = [...cardColor];

    classOfCards[i] = colorOfCards[i]; // switch css classNames

    // console.log(classOfCards);

    // Added for card flipping. (BZ)
    words[i] = " ";
    flippedCards[i] = true;

    if (
      colorOfCards[i] === "bystander" ||
      (data.isRedTurn === true && cardColor[i] === "blue") ||
      (data.isRedTurn === false && cardColor[i] === "red")
    ) {
      setIsRedTurn(!data.isRedTurn);
      setIsClueTurn(true);
      setStatus(data.isRedTurn ? "blue-turn" : "red-turn");
      setStatusMessage(!data.isRedTurn
        ? "Team Cat's turn to give a clue!"
        : "Team Dog's turn to give a clue!"
      );
    } else if (colorOfCards[i] === "assassin") {
      // alert("You have chosen the assassin. Game Over.");
      const status = "game-over-" + (data.isRedTurn ? "blue" : "red");
      setStatus(status);
      setShowEndTurn(false);
      setWinner(data.isRedTurn ? "TEAM DOG" : "TEAM CAT");
      setStatusMessage(data.isRedTurn ? "TEAM DOG WINS!" : "TEAM CAT WINS!")
    }

    // setCardClass(classOfCards);
    cardClass.current = classOfCards;
    updateScore(data);
    setCardFlipped(flippedCards); // Added for Socket IO. (BZ)
  }

  const updateScore = (data) => {
    // update red or blue team's score
    // ensure game over is checked only after remaining
    console.log(cardColor);
    if (cardColor[data.i] === "red") {
      // setRedRemaining(redRemaining - 1);
      redRemaining.current = redRemaining.current - 1;
    }
    else if (cardColor[data.i] === "blue") {
      // setBlueRemaining(blueRemaining - 1);
      blueRemaining.current = blueRemaining.current - 1;
    }
  }

  const isGameOver = () => {
    // if (redRemaining === 0 || blueRemaining === 0) {
    if (redRemaining.current === 0 || blueRemaining.current === 0) {
      const status = "game-over-" + (isRedTurn ? "red" : "blue");
      setStatus(status);
      setShowEndTurn(false);
      setWinner(isRedTurn ? "Red" : "Blue");
      setStatusMessage(isRedTurn ? "TEAM CAT WINS!" : "TEAM DOG WINS!");
    }
  };

  useEffect(() => {
    isGameOver();
  }, [redRemaining.current, blueRemaining.current])

  useEffect(() => {
    if ([catSpyMaster, dogSpyMaster].includes(myUsername)) {
      const spymasterCardNames = cardClass.current.map((card, i) => {
        return "spymaster-" + cardColor[i];
      }
      );
      // setCardClass(spymasterCardNames);
      cardClass.current = spymasterCardNames;
      setIsSpyMaster(true);
    }
  }, [catSpyMaster, dogSpyMaster]);

  useEffect(() => {
    // handle all socket emits received by calling respective functions
    socket.on("receive_clue", (data) => receiveClue(data));
    socket.on("receive_end_turn", (data) => receiveEndTurn(data));
  }, [startGame])

  useEffect(() => {
    // handle all socket emits received by calling respective functions
    socket.on("receive_card_click", (data) => receiveCardClick(data));
  }, [startGame])

  // useEffect for initial load
  useEffect(() => {
    init();
    socket.on("receive_users", (data) => receiveUsers(data));
    socket.on("receive_game_start", (data) => receiveGameStart(data));
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
          {showEndTurn && !isSpyMaster
            ? renderEndTurn()
            : null}
        </div>
        <Board
          cardFlipped={cardFlipped} // Added for card flip. (BZ)
          cardWords={words}
          cardClass={cardClass.current}
          bgImgs={bgImgs}
          onClick={handleCardClick}
        />
        <div className="info row col-12">
          <div>
            {isSpyMaster
              ? (
                <>
                  {teamCat.includes(myUsername)
                    ? <h4 className="red-turn">You are Team Cat's Spymaster!</h4>
                    : <h4 className="blue-turn">You are Team Dog's Spymaster!</h4>
                  }
                  <form onSubmit={handleClueSubmit}>
                    <label className="clueInput">
                      Clue:
                      <input type="text" name="clue" className="formInput" />
                    </label>
                    <input type="submit" value="Submit" />
                  </form>
                </>
              ) : null
            }
          </div>
          {winner
            ? (
              <button
                className="btn btn-info btn-light new-game"
                onClick={(i) => newGame(i)}
              >
                New Game
              </button>
            ) : null
          }
        </div>
        <div className="teamDog">
          <h2 className="blue-turn">Team Dog</h2>
          <h3>
            Card Remaining:{" "}
            <span className="blue-turn">{blueRemaining.current}</span>
          </h3>
          <h4>Team Members: </h4>
          {teamDog.map((user, index) => {
            if (index == 0) return (
              <h5>{user} - Spymaster</h5>
            );
            else return (<h5>{user}</h5>);
          })}
        </div>
        <div className="teamCat">
          <h2 className="red-turn">Team Cat</h2>
          <h3>
            Card Remaining:{" "}
            <span className="red-turn">{redRemaining.current}</span>
          </h3>
          <h4>Team Members:</h4>
          {teamCat.map((user, index) => {
            if (index == 0) return (
              <h5>{user} - Spymaster</h5>
            );
            else return (<h5>{user}</h5>);
          })}
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
          {!isClueTurn
            ? renderLog()
            : null
          }
        </div>
      </div>
    )
  }

  // waiting room shows who has joined the room so far
  const renderWaitingRoom = () => {
    return (
      <div className="game" >
        <div className="title col-12 mx-0">CATS VS. DOGS</div>
        <div className="info row col-12 mx-0">
          <ul className="list-group px-0">
            <li className="h4 list-group-item active text-center">Currently online:</li>
            {onlineUsers.map((user) => (
              <li className="list-group-item text-center" key={user}>{user}</li>
            ))}
          </ul>
          <button className="m-2" onClick={gameStart}>Start Game!</button>
        </div>
      </div>
    )
  }

  // on load, startGame is false so "renderWaitingRoom" runs. 
  // when game is started, renderGame runs
  renderNumber++;
  console.log(renderNumber);
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