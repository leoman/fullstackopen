import axios from 'axios'
import currentUser from '../utils/user'
const baseUrl = '/api/blogs'

const getConfig = () => {
  const user = currentUser.getCurrentUser()
  return {
    headers: { Authorization: `bearer ${user.token}` },
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async blog => await axios.post(baseUrl, blog, getConfig())
const update = async (id, blog) => await axios.put(`${baseUrl}/${id}`, blog, getConfig())
const remove = async id => await axios.delete(`${baseUrl}/${id}`, getConfig())

export default { getAll, create, update, remove }