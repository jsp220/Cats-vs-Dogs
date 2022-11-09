import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import "../CodeNames.css";
import { useQuery } from '@apollo/client';
import { QUERY_WORDS } from '../utils/queries';

//import { CSSTransitionGroup } from 'react-transition-group'
import "animate.css";
import styled, { keyframes } from "styled-components";
import {
  bounce,
  flipInX,
  rollIn,
  rollOut,
  hinge,
  zoomIn,
} from "react-animations";

import { REVEALED_CLASSNAMES, BASE_TURNS } from "../constants";
import { pickRandomPlayer, initializeCardRevealed } from "../util_functions";

const FlipInX = styled.div`
  animation: 2s ${keyframes`${flipInX}`};
`;
const Bounce = styled.div`
  animation: 2s ${keyframes`${bounce}`};
`;
const RollIn = styled.div`
  animation: 2s ${keyframes`${rollIn}`};
`;
const RollOut = styled.div`
  animation: 2s ${keyframes`${rollOut}`};
`;
const Hinge = styled.div`
  animation: 2s ${keyframes`${hinge}`};
`;
const ZoomIn = styled.div`
  animation: 2s ${keyframes`${zoomIn}`};
`;

const CODENAMELIST = ["Hollywood", "Well", "Foot", "New", "York", "Spring", "Court", "Tube", "Point", "Tablet", "Slip", "Date", "Drill", "Lemon", "Bell", "Screen", "Fair", "Torch", "State", "Match", "Iron", "Block", "France", "Australia", "Limousine", "Stream", "Glove", "Nurse", "Leprechaun", "Play", "Tooth", "Arm", "Bermuda", "Diamond", "Whale", "Comic", "Mammoth", "Green", "Pass", "Missile", "Paste", "Drop", "Pheonix", "Marble", "Staff", "Figure", "Park", "Centaur", "Shadow", "Fish", "Cotton", "Egypt", "Theater", "Scale", "Fall", "Track", "Force", "Dinosaur", "Bill", "Mine", "Turkey", "March", "Contract", "Bridge", "Robin", "Line", "Plate", "Band", "Fire", "Bank", "Boom", "Cat", "Shot", "Suit", "Chocolate", "Roulette", "Mercury", "Moon", "Net", "Lawyer", "Satellite", "Angel", "Spider", "Germany", "Fork", "Pitch", "King", "Crane", "Trip", "Dog", "Conductor", "Part", "Bugle", "Witch", "Ketchup", "Press", "Spine", "Worm", "Alps", "Bond", "Pan", "Beijing", "Racket", "Cross", "Seal", "Aztec", "Maple", "Parachute", "Hotel", "Berry", "Soldier", "Ray", "Post", "Greece", "Square", "Mass", "Bat", "Wave", "Car", "Smuggler", "England", "Crash", "Tail", "Card", "Horn", "Capital", "Fence", "Deck", "Buffalo", "Microscope", "Jet", "Duck", "Ring", "Train", "Field", "Gold", "Tick", "Check", "Queen", "Strike", "Kangaroo", "Spike", "Scientist", "Engine", "Shakespeare", "Wind", "Kid", "Embassy", "Robot", "Note", "Ground", "Draft", "Ham", "War", "Mouse", "Center", "Chick", "China", "Bolt", "Spot", "Piano", "Pupil", "Plot", "Lion", "Police", "Head", "Litter", "Concert", "Mug", "Vacuum", "Atlantis", "Straw", "Switch", "Skyscraper", "Laser", "Scuba", "Diver", "Africa", "Plastic", "Dwarf", "Lap", "Life", "Honey", "Horseshoe", "Unicorn", "Spy", "Pants", "Wall", "Paper", "Sound", "Ice", "Tag", "Web", "Fan", "Orange", "Temple", "Canada", "Scorpion", "Undertaker", "Mail", "Europe", "Soul", "Apple", "Pole", "Tap", "Mouth", "Ambulance", "Dress", "Ice", "Cream", "Rabbit", "Buck", "Agent", "Sock", "Nut", "Boot", "Ghost", "Oil", "Superhero", "Code", "Kiwi", "Hospital", "Saturn", "Film", "Button", "Snowman", "Helicopter", "Loch", "Ness", "Log", "Princess", "Time", "Cook", "Revolution", "Shoe", "Mole", "Spell", "Grass", "Washer", "Game", "Beat", "Hole", "Horse", "Pirate", "Link", "Dance", "Fly", "Pit", "Server", "School", "Lock", "Brush", "Pool", "Star", "Jam", "Organ", "Berlin", "Face", "Luck", "Amazon", "Cast", "Gas", "Club", "Sink", "Water", "Chair", "Shark", "Jupiter", "Copper", "Jack", "Platypus", "Stick", "Olive", "Grace", "Bear", "Glass", "Row", "Pistol", "London", "Rock", "Van", "Vet", "Beach", "Charge", "Port", "Disease", "Palm", "Moscow", "Pin", "Washington", "Pyramid", "Opera", "Casino", "Pilot", "String", "Night", "Chest", "Yard", "Teacher", "Pumpkin", "Thief", "Bark", "Bug", "Mint", "Cycle", "Telescope", "Calf", "Air", "Box", "Mount", "Thumb", "Antarctica", "Trunk", "Snow", "Penguin", "Root", "Bar", "File", "Hawk", "Battery", "Compound", "Slug", "Octopus", "Whip", "America", "Ivory", "Pound", "Sub", "Cliff", "Lab", "Eagle", "Genius", "Ship", "Dice", "Hood", "Heart", "Novel", "Pipe", "Himalayas", "Crown", "Round", "India", "Needle", "Shop", "Watch", "Lead", "Tie", "Table", "Cell", "Cover", "Czech", "Back", "Bomb", "Ruler", "Forest", "Bottle", "Space", "Hook", "Doctor", "Ball", "Bow", "Degree", "Rome", "Plane", "Giant", "Nail", "Dragon", "Stadium", "Flute", "Carrot", "Wake", "Fighter", "Model", "Tokyo", "Eye", "Mexico", "Hand", "Swing", "Key", "Alien", "Tower", "Poison", "Cricket", "Cold", "Knife", "Church", "Board", "Cloak", "Ninja", "Olympus", "Belt", "Light", "Death", "Stock", "Millionaire", "Day", "Knight", "Pie", "Bed", "Circle", "Rose", "Change", "Cap", "Triangle"];

const HIDDEN_CLASSNAMES = new Array(25).fill("hidden-card");

const ROWS = 5;
const COLUMNS = 5;

function Card(props) {
  return (
    <ZoomIn>
      <button className={props.cardClass} onClick={props.onClick}>
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
    return (
      <Card
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
        <div className="board-row">{renderColumns(rowPosition)}</div>
      );
    }
    return rows;
  }

  return <div> {renderRows()} </div>
}

function CodeNames(props) {
  const { loading, data } = useQuery(QUERY_WORDS);
  const words = data.data.words.map((entry) => entry.name.toUpperCase());

  const [cardWords, setCardWords] = useState(words);
  const [cardColor, setCardColor] = useState(initializeCardRevealed(secondPlayer)); // css class: hidden-card, red, blue
  const [cardClass, setCardClass] = useState(HIDDEN_CLASSNAMES); // initial classNames are 'hidden-card'
  const [clue, setClue] = useState("");
  const [isRedTurn, setisRedTurn] = useState(secondPlayer === REVEALED_CLASSNAMES.blue);
  const [isClueTurn, setisClueTurn] = useState(true);
  const [status, setStatus] = useState(secondPlayer === REVEALED_CLASSNAMES.blue ? "red-turn" : "blue-turn");
  const [blueRemaining, setBlueRemaining] = useState(secondPlayer === REVEALED_CLASSNAMES.blue ? BASE_TURNS + 1 : BASE_TURNS);
  const [redRemaining, setRedRemaining] = useState(secondPlayer === REVEALED_CLASSNAMES.red ? BASE_TURNS + 1 : BASE_TURNS);
  const [showEndTurn, setShowEndTurn] = useState(true);
  const [view, setView] = useState("agent");
  const [winner, setWinner] = useState("");


  // check for game end every time either teams remaining cards changes 
  useEffect(() => {
    isGameOver();
  }, [redRemaining, blueRemaining])


  handleCardClick = (i) => {
    if (
      status.includes("game-over") ||
      view === "spymaster"
    ) {
      return null; // disable clicking
    }

    updateScore(i);
    cardClass[i] = cardColor[i]; // switch css classNames

    if (
      cardColor[i] === "bystander" ||
      (isRedTurn === true && cardColor[i] === "blue") ||
      (isRedTurn === false && cardColor[i] === "red")
    ) {
      setIsRedTurn(!isRedTurn)
      setStatus(!isRedTurn ? "red-turn" : "blue-turn");
    } else if (cardColor[i] === "assassin") {
      alert("You have chosen the assassin. Game Over.");
      const status = "game-over-" + (isRedTurn ? "blue" : "red");
      setStatus(status);
      setShowEndTurn(false);
      setWinner(isRedTurn ? "Blue" : "Red");
    }

    setCardWords(cardWords);
    setCardClass(cardClass);
    setIsClueTurn(isClueTurn);

  };

  function updateScore(i) {
    // only update score if card has not been revealed already
    if (cardClass[i] !== "hidden-card") {
      return null;
    }

    // update red or blue team's score
    // ensure game over is checked only after remaining
    if (cardColor[i] === "red") {
      setRedRemaining(redRemaining - 1);
    }
    else if (cardColor[i] === "blue") {
      setBlueRemaining(blueRemaining - 1);
    }
  }

  isGameOver = () => {
    if (redRemaining === 0 || blueRemaining === 0) {
      const status = "game-over-" + (isRedTurn ? "red" : "blue");
      setStatus(status);
      setShowEndTurn(false);
      setWinner(isRedTurn ? "Red" : "Blue");
    }
  };

  handleEndTurnClick = () => {
    setIsRedTurn = (!isRedTurn);
    setStatus = (!isRedTurn ? "red-turn" : "blue-turn");
  };

  handleSpymasterClick = () => {
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

  handleAgentClick = () => {
    setCardClass(HIDDEN_CLASSNAMES);
    setView("agent");
    // when clicked, all text should bold and 'status' is used as font-color
  };

  handleGearClick = () => {
    alert("How to play codenames: https://www.youtube.com/watch?v=zQVHkl8oQEU");
  };

  newGame(i) {
    window.location.reload(false);
  }

  // toggle only clue/guess on Change
  handleSubmit(e) {
    // prevent refresh of game on each submit
    e.preventDefault();

    setInputClue("");
    setClue(e.target[0].value);
    setIsClueTurn(!isClueTurn);
    // clear input box after setting state with clue
    e.target[0].value = "";
  }

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

  function renderShowWinner() {
    const message = winner.toUpperCase() + " TEAM WINS!";
    return <div className={"turn col " + status}>{message}</div>;
  }

  re() {
    let statusMessage;
    if (status.includes("-turn")) {
      statusMessage = (isRedTurn ? "Red" : "Blue") + "'s Turn";
    } else {
      statusMessage = null;
    }

    let agentView;
    let spyView;
    if (view === "agent") {
      agentView = "gray-click";
    } else {
      spyView = "gray-click";
    }

    return (
      <div className="game">
        <div className="title col-12">Codenames</div>
        <div className="info row col-12">
          <div className={"turn col " + status}>{statusMessage}</div>
          {/* display end turn and show winner based on state */}
          {showEndTurn
            ? renderEndTurn()
            : renderShowWinner()}
        </div>
        <Board
          cardWords={cardWords}
          cardClass={cardClass}
          onClick={handleCardClick}
        />

        <div className="info row col-12">
          <form>
            <label className="clueInput">
              Clue:
              <input type="text" name="clue" className="formInput" />
            </label>
            <input type="submit" value="Submit" />
          </form>
          <button
            className="btn btn-info btn-light new-game"
            onClick={(i) => newGame(i)}
          >
            New Game
          </button>
        </div>
        <div className="teamDog">
          <h2>Team Dog</h2>
          <h3>
            Card Remaining:{" "}
            <span className="blue-turn">{blueRemaining}</span>
          </h3>
          <h4>Team Member: </h4>
          <div roleChoice>
            <div className="dogAgent">
              <label
                className={"btn btn-info btn-light " + agentView}
                onClick={handleAgentClick}
              >
                Agent1
              </label>
              <label
                className={"btn btn-info btn-light " + agentView}
                onClick={handleAgentClick}
              >
                Agent2
              </label>
            </div>
            <div className="catSpy">
              <label
                className={"btn btn-info btn-light " + spyView}
                onClick={handleSpymasterClick}
              >
                Spymasters
              </label>
            </div>
          </div>
        </div>
        <div className="teamCat">
          <h2>Team Cat</h2>
          <h3>
            Card Remaining:{" "}
            <span className="red-turn">{redRemaining}</span>
          </h3>
          <h4>Team Member: </h4>
          <div roleChoice>
            <div className="catAgent">
              <label
                className={"btn btn-info btn-light " + agentView}
                onClick={handleAgentClick}
              >
                Agent1
              </label>
              <label
                className={"btn btn-info btn-light " + agentView}
                onClick={handleAgentClick}
              >
                Agent2
              </label>
            </div>
            <div className="catSpy">
              <label
                className={"btn btn-info btn-light " + spyView}
                onClick={handleSpymasterClick}
              >
                Spymasters
              </label>
            </div>
          </div>
        </div>
        <div className="rules">
          Rules
          <Gear onClick={handleGearClick} />
          <div
            className="btn-group btn-group-toggle"
            data-toggle="buttons"
          ></div>
        </div>
        <div className="gameLog">Game Log</div>
      </div>
    );
  }

}

// ========================================

async function initializeCardWords(client) {
  // Returns a list of 25 unique word strings
  // Index indicates hidden-card position on board
  const data = await client.query({ query: QUERY_WORDS });
  const words = data.data.words.map((entry) => entry.name.toUpperCase());
  console.log(words);
  // var word = "";
  // var dict = {};

  // dedupe using dict
  // while (Object.keys(dict).length < 25) {
  //   word = CODENAMELIST[Math.floor(Math.random() * CODENAMELIST.length)];
  //   dict[word.toUpperCase()] = 0;
  // }

  // console.log(Object.keys(dict));
  // return Object.keys(dict);

  return words;
}

export default CodeNames;
