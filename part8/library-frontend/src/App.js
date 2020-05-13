
import React, { useState, useEffect } from 'react'
import { useLazyQuery, useApolloClient } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS, ALL_BOOKS_BY_FAVE } from './queries'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'

const App = () => {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [page, setPage] = useState('authors')
  const [getAuthors, authorResult] = useLazyQuery(ALL_AUTHORS)
  const [getBooks, booksResult] = useLazyQuery(ALL_BOOKS)
  const [getFaveBooks, faveBooksResult] = useLazyQuery(ALL_BOOKS_BY_FAVE)
  const [authors, setAuthors] = useState(null)
  const [books, setBooks] = useState(null)
  const [faveBooks, setFaveBooks] = useState(null)
  const client = useApolloClient()

  const showAuthors = () => {
    setPage('authors')
    getAuthors()
  }

  const showBooks = () => {
    setPage('books')
    getBooks()
  }

  const showFave = () => {
    setPage('recommend')
    getFaveBooks()
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

  useEffect(() => {
    if (faveBooksResult.data) {
      setFaveBooks(faveBooksResult.data.allBooksByFave)
      setUser(faveBooksResult.data.me)
    }
  }, [faveBooksResult.data])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if(!token && localStorage.getItem('phonenumbers-user-token')) {
    setToken(localStorage.getItem('phonenumbers-user-token'))
  }

  return (
    <div>
      <div>
        <button onClick={() => showAuthors()}>authors</button>
        <button onClick={() => showBooks()}>books</button>
        {!token && 
          <>
            <button onClick={() => setPage('login')}>login</button>
          </>
        }
        {token && 
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => showFave('recommend')}>recommend</button>
            <button onClick={() => logout()}>logout</button>
          </>
        }
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

      <Recommend
        books={faveBooks}
        user={user}
        show={page === 'recommend'}
      />

      <LoginForm
        setToken={setToken}
        show={page === 'login'}
      />

    </div>
  )
}

export default App