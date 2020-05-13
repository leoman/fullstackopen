import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
      id
    }
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      bookcount
      born
      id
    }
  }
`
export const ALL_BOOKS = gql`
  query {
    allBooks  {
      title
      published
      author {
        name
      }
      genres
    }
  }
`

export const ALL_BOOKS_BY_FAVE = gql`
  query {
    allBooksByFave  {
      title
      published
      author {
        name
      }
      genres
    }
    me {
      favoriteGenre
    } 
  }
`