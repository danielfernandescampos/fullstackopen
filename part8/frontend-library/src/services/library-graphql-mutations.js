import { gql } from "@apollo/client";

export const CREATE_BOOK = gql`
    mutation createBook(
        $title: String!, 
        $author: String!, 
        $published: String!, 
        $genres: [String!]!
    ) {
        addBook(
            title: $title
            author: $author
            published: $published
            genres: $genres
        ) {
            title
            author {
                name
            }
            published
        }
    }
`;

export const EDIT_AUTHOR = gql`
    mutation editAuthor(
        $name: String!,
        $born: String!
    ) {
        editAuthor(
            name: $name
            setBornTo: $born
        ) {
            name
            born
        }
    }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
