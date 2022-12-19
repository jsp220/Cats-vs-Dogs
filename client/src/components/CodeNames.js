import React, { useState, useEffect, useRef } from "react";

// import CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "../CodeNames.css";

// import components
import Rules from "./rules";
import Board from "./Board";
// import Gear from "./Gear";

// import apollo queries/mutations
import { useLazyQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_GAME } from '../utils/queries';
import { UPDATE_TEAM } from "../utils/mutations";

// import auth.js for login/authorization
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
// import styled, { keyframes } from "styled-components";

// Adjusted for the used animation methods. (BZ)
// import { rollIn, zoomIn } from "react-animations";

// socket connection
import io from "socket.io-client";
const ROOT_URL = 'https://young-bayou-37103.herokuapp.com/';

const socket = io.connect(ROOT_URL); // for deployment
// const socket = io.connect("http://localhost:3000"); // for development

// declare variables for setting up the game
const hiddenClasses = new Array(25).fill("hidden-card");
// let renderNumber = 0;

// main react component
function CodeNames() {
  // define states and refs to be used

  const [cardFlipped, setCardFlipped] = useState(new Array(25).fill(false)); // Added for card flip. (BZ)
  // const [words, setWords] = useState([]);
  const words = useRef([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [startGame, setStartGame] = useState(false);
  const [cardColor, setCardColor] = useState([]); // css class: hidden-card, red, blue
  // const [cardClass, setCardClass] = useState(hiddenClasses); // initial classNames are 'hidden-card'
  const cardClass = useRef(hiddenClasses);
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

  // define async queries/mutations to be used
  const [queryUser] = useLazyQuery(QUERY_USER);
  const [queryGame] = useLazyQuery(QUERY_GAME);
  const [updateTeam] = useMutation(UPDATE_TEAM);

  // function to be executed at page load via useEffect
  const init = async () => {
    // load profile using Auth (token)
    const profile = await Auth.getProfile();
    const userId = profile.data._id;

    let teamCatId = "";
    const URL = document.URL;
    const gameName = URL.slice(URL.lastIndexOf('/') + 1)

    // query the Game data to assign words and images
    try {
      const { data } = await queryGame({ variables: { gameName } });
      teamCatId = data.game.teamCat._id;

      // get the wordlist data
      const wordList = data.game.wordList;

      const allWords = wordList.allWords.map((word) => word.name);
      const catWords = wordList.catWords.map((word) => word.name);
      const dogWords = wordList.dogWords.map((word) => word.name);
      const neutralWords = wordList.neutralWords.map((word) => word.name);
      const deathWord = wordList.deathWord.name;

      // put images into arrays to assign to each word
      const catImgs = [cat1, cat2, cat3, cat4, cat5];
      const dogImgs = [dog1, dog2, dog3, dog4, dog5, dog6, dog7, dog8, dog9, dog10, dog11, dog12, dog13, dog14, dog15];
      const miscImgs = [nut1, nut2, nut3];

      let imgs = [];

      // map through all words and assign colors (red, blue, bystander, assassin) and images
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
        return null;
      }))

      // update refs and states
      words.current = allWords;
      setCardColor(wordColors);
      setBgImgs(imgs);
    } catch (err) {
      console.error(err);
    }

    // get username from database
    try {
      const { data: userData } = await queryUser({ variables: { userId } });
      setMyUsername(userData.user.username);
    } catch (err) {
      console.error(err);
    }

    // insert username to temporary database list of online users
    try {
      const { data } = await updateTeam({
        variables:
        {
          teamId: teamCatId,
          userId
        }
      });
      const usersFromBackend = data.updateTeam.users.map((user) => user.username);

      // send user list via socket to update everyone
      socket.emit("send_users", usersFromBackend);
    } catch (err) {
      console.error(err);
    }
  }

  // set state of onlineusers to the latest received data from socket
  const receiveUsers = (data) => {
    // const uniqueUsers = [...new Set(data)];
    setOnlineUsers(data);
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

  // receive data via socket and update state variables
  const receiveGameStart = (data) => {
    setTeamCat(data.teamCat);
    setTeamDog(data.teamDog);
    setCatSpyMaster(data.catSpyMaster);
    setDogSpyMaster(data.dogSpyMaster);
    setStartGame(true);
  }

  // when a clue is submitted
  function handleClueSubmit(e) {
    // prevent refresh
    e.preventDefault();

    // process the clue
    const clue = e.target[0].value;
    const firstBlank = clue.indexOf(" ");
    const secondBlank = clue.indexOf(" ", firstBlank + 1);
    const number = parseInt(clue.slice(firstBlank + 1));

    // process errors
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

    // send the clue and whose turn it is via socket
    socket.emit("send_clue", { clue, isRedTurn });

    // reset the clue field
    e.target[0].value = "";
  }

  // update state variables with data received via socket
  const receiveClue = (data) => {
    setClue(data.clue);
    setIsClueTurn(false);
    setStatusMessage(data.isRedTurn ? "Team Cat's turn to guess!" : "Team Dog's turn to guess!")
  }

  // populate the clue on the screen
  const renderLog = () => {
    if (clue) return <div>Team {isRedTurn ? "Cat" : "Dog"}'s spymaster gives a clue: {clue}.</div>
  }

  // when the end turn button is clicked
  const handleEndTurnClick = () => {
    if (isRedTurn) {
      if (teamDog.includes(myUsername)) return;
    } else {
      if (teamCat.includes(myUsername)) return;
    }
    if (isClueTurn) {
      // console.log("abc");
      return;
    }

    // send current turn via socket
    socket.emit("send_end_turn", { isRedTurn });
  };

  // update turn related state variables via socket
  const receiveEndTurn = (data) => {
    setIsRedTurn(!data.isRedTurn);
    setStatus(data.isRedTurn ? "blue-turn" : "red-turn");
    setStatusMessage(data.isRedTurn ? "Team Dog's turn to give a clue!" : "Team Cat's turn to give a clue!")
    setIsClueTurn(true);
  }

  // when a card is clicked
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

    // send data via socket
    socket.emit("send_card_click", { i, cardFlipped, isRedTurn })
  };

  // handle card click via socket
  const receiveCardClick = (data) => {
    const i = data.i;
    let flippedCards = [...data.cardFlipped]; // Added for socket IO. (BZ)
    let classOfCards = [...cardClass.current];
    let colorOfCards = [...cardColor];

    classOfCards[i] = colorOfCards[i]; // switch css classNames for the clicked card

    // Added for card flipping. (BZ)
    words.current[i] = " ";
    flippedCards[i] = true;

    // when the wrong card is clicked (except assassin)
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
    }
    // when the assassin is clicked 
    else if (colorOfCards[i] === "assassin") {
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

  // update scores
  const updateScore = (data) => {
    // update red or blue team's score
    if (cardColor[data.i] === "red") {
      // setRedRemaining(redRemaining - 1);
      redRemaining.current = redRemaining.current - 1;
    }
    else if (cardColor[data.i] === "blue") {
      // setBlueRemaining(blueRemaining - 1);
      blueRemaining.current = blueRemaining.current - 1;
    }
  }

  // function to check if game is over
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

  // useEffect for initial load and sockets for before starting game
  useEffect(() => {
    init();
    socket.on("receive_users", (data) => receiveUsers(data));
    socket.on("receive_game_start", (data) => receiveGameStart(data));
  }, [])

  // useEffect for checking if SpyMaster
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

  // sockets for during the game
  useEffect(() => {
    // handle all socket emits received by calling respective functions
    socket.on("receive_clue", (data) => receiveClue(data));
    socket.on("receive_end_turn", (data) => receiveEndTurn(data));
    socket.on("receive_card_click", (data) => receiveCardClick(data));
  }, [startGame])

  // check if game over every time red/blue remaining changes
  useEffect(() => {
    isGameOver();
    // }, [])  
  }, [redRemaining.current, blueRemaining.current])

  // TODO: include logic here to create a new game
  const newGame = (i) => {
    // window.location.reload(false);
    return;
  }

  // when gear clicked
  const handleGearClick = () => {
    alert("How to play codenames: https://www.youtube.com/watch?v=zQVHkl8oQEU");
  };

  // end turn button
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

  // when game starts
  const renderGame = () => {
    return (
      <div className="game container-fluid p-2">
        <div className="row">
          <div className="info col-12 mx-0">
            <h3 className={"turn col " + status}>{statusMessage}</h3>
            {/* display end turn and show winner based on state */}
            {showEndTurn
              && !isSpyMaster
              && !isClueTurn
              && (
                (isRedTurn && teamCat.includes(myUsername))
                || (!isRedTurn && teamDog.includes(myUsername)))
              ? renderEndTurn()
              : null}
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="teamCat col-4 col-lg-2 border">
            <h3 className="red-turn fw-bolder">Team Cat</h3>
            <h4>
              Card Remaining:{" "}
              <span className="red-turn">{redRemaining.current}</span>
            </h4>
            <h4>Team Members:</h4>
            {teamCat.map((user, index) => {
              if (index == 0) return (
                <h4>{user} - Spymaster</h4>
              );
              else return (<h4>{user}</h4>);
            })}
          </div>
          <Board
            cardFlipped={cardFlipped} // Added for card flip. (BZ)
            cardWords={words.current}
            cardClass={cardClass.current}
            bgImgs={bgImgs}
            onClick={handleCardClick}
          />
          <div className="teamDog col-4 col-lg-2 border">
            <h3 className="blue-turn fw-bolder">Team Dog</h3>
            <h4>
              Card Remaining:{" "}
              <span className="blue-turn">{blueRemaining.current}</span>
            </h4>
            <h4>Team Members: </h4>
            {teamDog.map((user, index) => {
              if (index == 0) return (
                <h4>{user} - Spymaster</h4>
              );
              else return (<h4>{user}</h4>);
            })}
          </div>
          <div className="info col-12 mx-0">
            {isSpyMaster
              ? (
                <>
                  {teamCat.includes(myUsername)
                    ? <h3 className="red-turn text-center">You are Team Cat's Spymaster!</h3>
                    : <h3 className="blue-turn text-center">You are Team Dog's Spymaster!</h3>
                  }
                  {!winner
                    && (
                      (isRedTurn && teamCat.includes(myUsername))
                      || (!isRedTurn && teamDog.includes(myUsername))
                    )
                    ? (
                      <>
                        <form className="row justify-content-center" onSubmit={handleClueSubmit}>
                          <label className="clueInput col-8 col-md-6 col-lg-4 col-xl-2 p-0">
                            <input type="text" name="clue" placeholder="Clue" className="formInput" />
                          </label>
                          <div className="row justify-content-center">
                            <input className="col-2 col-md-1" type="submit" value="Submit" />
                          </div>
                        </form>
                      </>
                    ) : null
                  }
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

          <div className="gameLog col-4 border">
            <h3 className="fw-bolder">Game Log</h3>
            {!isClueTurn
              ? renderLog()
              : null
            }
          </div>
        </div>
      </div>
    )
  }

  // waiting room shows who has joined the room so far, before game starts
  const renderWaitingRoom = () => {
    return (
      <div className="game container" >
        <div className="mt-2">Game Code: {document.URL.slice(document.URL.lastIndexOf('/') + 1)}</div>
        <div className="info row col-12 mx-0">
          <ul className="list-group px-0">
            <li className="h4 currently-online list-group-item active text-center">Currently online:</li>
            {onlineUsers.map((user) => (
              <li className="list-group-item text-center" key={user}>{user}</li>
            ))}
          </ul>
          <button className="m-2" onClick={gameStart}>Start Game!</button>
        </div>
      </div>
    )
  }

  // renderNumber++;
  // console.log(renderNumber);

  // on load, startGame is false so "renderWaitingRoom" runs. 
  return (
    <>
      {startGame
        ? renderGame()
        : renderWaitingRoom()
      }
      <Rules />
    </>
  );

}

export default CodeNames;