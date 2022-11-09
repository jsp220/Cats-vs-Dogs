import { gql } from '@apollo/client';

export const QUERY_WORDS = gql`
  query Words {
    words {
      _id
      name
    }
  }
`;
