import { gql } from '@apollo/client'
import { AUTHOR_DETAILS } from './library-graphql-fragments'

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            ...AuthorDetails
        }
    }
    ${AUTHOR_DETAILS}
`

export const ALL_BOOKS = gql`
    query getBooks(
        $genre: String,
        $author: String
    ) {
        allBooks(
            genre: $genre,
            author: $author
        ) {
            title
            author {
                name
            }
            published
            genres
        }
    }
`

export const ME = gql`
    query { 
        me {
            username
            favouriteGenre
        } 
    }
`