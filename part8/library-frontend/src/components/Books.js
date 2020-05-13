import React, { useState } from 'react'

const Books = ({ books, ...props }) => {

  const [filter, setFilter] = useState(null)

  if (!props.show || !books) {
    return null
  }

  const genres = [...new Set(books.reduce((agg, next) => [...agg, ...next.genres], []))]

  const filterBooks = () => books.filter(b => b.genres.includes(filter))
  
  const filteredBooks = filter ? filterBooks() : books;

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres.map(g => 
        <button onClick={() => setFilter(g)} key={g}>{g}</button>
      )}
      
    </div>
  )
}

export default Books