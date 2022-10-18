const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    authorCount: Int!
    bookCount: Int!
    allAuthors: [Author!]!
    allBooks(genre: String, author: String): [Book!]!
    findAuthor(name: String!): Author
    findBook(title: String!): Book
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: String!
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!
      setBornTo: String!
    ): Author

    createUser(
      username: String!
      favouriteGenre: String!
    ): User
    
    login(
      username: String!
      password: String!
    ): Token
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int
  }
  type Book {
    title: String!
    author: Author
    published: Int!
    genres: [String!]!
    id: ID!
  }
  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
`;

module.exports = typeDefs