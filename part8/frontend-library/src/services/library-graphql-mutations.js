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
            author
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