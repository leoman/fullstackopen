
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

import { gql, useLazyQuery } from '@apollo/client';

const ALL_AUTHORS = gql`
query {
  allAuthors  {
    name
    bookcount
    born
    id
  }
}
`
const ALL_BOOKS = gql`
query {
  allBooks  {
    title
    published
    author
    genres
    id
  }
}
`


const App = () => {
  const [page, setPage] = useState('authors')
  const [getAuthors, authorResult] = useLazyQuery(ALL_AUTHORS)
  const [getBooks, booksResult] = useLazyQuery(ALL_BOOKS)
  const [authors, setAuthors] = useState(null)
  const [books, setBooks] = useState(null)

  const showAuthors = () => {
    setPage('authors')
    getAuthors()
  }

  const showBooks = () => {
    setPage('books')
    getBooks()
  }

  useEffect(() => {
    if (authorResult.data) {
      setAuthors(authorResult.data.allAuthors)
    }
  }, [authorResult.data])

  useEffect(() => {
    if (booksResult.data) {
      setBooks(booksResult.data.allBooks)
    }
  }, [booksResult.data])

  return (
    <div>
      <div>
        <button onClick={() => showAuthors()}>authors</button>
        <button onClick={() => showBooks()}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        authors={authors}
        show={page === 'authors'}
      />

      <Books
        books={books}
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}

export default App