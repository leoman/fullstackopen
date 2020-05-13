import React from 'react'

const Recommend = ({ books, user, ...props }) => {

  if (!props.show || !books) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>

      <p>books in your fave genre: {user.favoriteGenre}</p>

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
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      
    </div>
  )
}

export default Recommend