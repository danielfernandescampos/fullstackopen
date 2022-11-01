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
    query {
        allBooks {
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