import { gql } from "@apollo/client";


export const QUERY_USERS = gql`
query user {
  users {
    _id
    username
    email
    savedBooks {
      _id
      title
      authors
      bookId
      description
      image
    }
  }
}
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    getSingleUser(username: $username) {
      _id
      username
      email
      savedBooks {
        _id
      title
      authors
      bookId
      description
      image
      }
    }
  }
`;

export const QUERY_BOOKS = gql`
 query getSavedBooks($username: String!) {
  getSavedBooks(username: $username) {
      savedBooks {
        _id
      title
      authors
      bookId
      description
      image
      }
    }
  }
`;


export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      }
    }
  }
`;
