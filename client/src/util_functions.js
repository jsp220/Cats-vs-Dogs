import { REVEALED_CLASSNAMES, BASE_TURNS, BYSTANDERS, ASSASSINS } from './constants';

export function pickRandomPlayer() {
    const number = Math.floor((Math.random() * 100) + 1);
    if (number % 2 === 0) {
        return REVEALED_CLASSNAMES.red
    } else {
        return REVEALED_CLASSNAMES.blue
    }
} 

export function initializeCardRevealed(secondPlayer) {
    // Returns a list of 25 unique word types
    // Index indicates hidden-card position on board
  
    const revealedClassnames = [];

    for (let i = 0; i < (BASE_TURNS); i++) {
        revealedClassnames.push(REVEALED_CLASSNAMES.red);
        revealedClassnames.push(REVEALED_CLASSNAMES.blue);
    }

    revealedClassnames.push(REVEALED_CLASSNAMES[secondPlayer]);

    for (let i=0; i < (BYSTANDERS); i++) {
        revealedClassnames.push(REVEALED_CLASSNAMES.bystander)
    }
    for (let i=0; i < (ASSASSINS); i++) {
        revealedClassnames.push(REVEALED_CLASSNAMES.assassin)
    }

    return shuffle(revealedClassnames);
  }
  
  
export function shuffle(array) {
    // Fisher-Yates Shuffle
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    while (0 !== currentIndex) { // while there are elements to shuffle
  
      // pick a remaining element
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // and swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  