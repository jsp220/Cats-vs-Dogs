import { gql } from '@apollo/client';

export const QUERY_WORDS = gql`
  query Words {
    words {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  query User($userId: ID!) {
    user(userId: $userId) {
      _id
      email
      username
    }
  }
`;

export const QUERY_GAME = gql`
  query Game($gameName: String!) {
    game(gameName: $gameName) {
      _id
      name
      teamCat {
        _id
        users {
          username
        }
      }
      teamDog {
        _id
        users {
          username
        }
      }
      wordList {
        _id
        allWords {
          _id
          name
        }
        catWords {
          _id
          name
        }
        dogWords {
          _id
          name
        }
        neutralWords {
          _id
          name
        }
        deathWord {
          _id
          name
        }
      }
    }
  }
`
