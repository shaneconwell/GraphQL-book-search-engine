const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String
    email: String
    password: String
    savedBooks: [Book]!
  }

  type Book {
    bookId: ID!
    title: String
    authors: [String]
    link: String
    description: String
    image: String
  }

	input bookContent {
    bookId: ID!
    title: String
    authors: [String]
    link: String
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
    getSavedBooks(username: String!): User
    me: User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(content: bookContent!): User
    # saveBook(userId:ID! title: String!, authors: [String], bookId: String, description: String image: String ): User
    deleteBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
