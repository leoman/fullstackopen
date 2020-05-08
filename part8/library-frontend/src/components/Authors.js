  
import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client';
import Select from 'react-select';

const UPDATE_BORN = gql`
mutation updateBorn($name: String!, $setBornTo: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $setBornTo,
  ) {
    name
    born
    id
  }
}
`

const Authors = ({ authors, ...props }) => {

  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ updateBorn ] = useMutation(UPDATE_BORN)

  const submit = async (event) => {
    event.preventDefault()

    updateBorn({  variables: { name, setBornTo: born } })

    setName('')
    setBorn('')
  }

  if (!props.show || !authors) {
    return null
  }

  const options = authors.map(author => ({value: author.name, label: author.name}))

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookcount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <div>
        <form onSubmit={submit}>
          <div>
            name
            <Select
              onChange={(selectedOption) => setName(selectedOption.value)}
              options={options}
            />
          </div>
          <div>
            born
            <input
              value={born}
              onChange={({ target }) => setBorn(parseInt(target.value))}
            />
          </div>
          <button type='submit'>update author</button>
        </form>
      </div>

    </div>
  )
}

export default Authors
