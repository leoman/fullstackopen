  
import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAllPersons = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const createPerson = async newObject => {
    const request = axios.post(baseUrl, newObject)
    const response = await request
    return response.data
}

const deletePerson = async id => {
  const deleteUrl = `${baseUrl}/${id}`
  return axios.delete(deleteUrl)
}

const updatePerson = async (id, newPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, newPerson)
  const response = await request
  return response.data
}

export default { getAllPersons, createPerson, deletePerson, updatePerson }