import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_WORDLIST = gql`
  mutation AddWordList($wordIds: [ID]) {
    addWordList(wordIds: $wordIds) {
      _id    
      allWords {
        _id
      }
      catWords {
        _id
      }
      dogWords {
        _id
      }
      neutralWords {
        _id
      }
      deathWord {
        _id
      }
    }
  }
`;

export const ADD_GAME = gql`
  mutation AddGame($name: String!) {
    addGame(name: $name) {
      _id
      name
    }
  }
`

export const UPDATE_GAME = gql`
  mutation UpdateGame($gameId: ID, $teamCatId: ID, $teamDogId: ID, $wordListId: ID) {
    updateGame(gameId: $id, teamCatId: $teamCatId, teamDogId: $teamDogId, wordListId: $wordListId) {
      _id
      name
      teamCat {
        _id
      }
      teamDog {
        _id
      }
      wordList {
        _id
      }
    }
  }
`

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
