const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]!
  }

  type Book {
    _id: ID
    title: String
    authors: [String]
    bookId: String
    description: String
    image: String
  }



  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    getSingleUser(username: String!): User
    books(username: String): [Book]
    book(bookId: ID!): Book
    me: User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(title: String!): Book
    deleteBook(bookId: ID!): Book
  }
`;

module.exports = typeDefs;
