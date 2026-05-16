import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || process.env.RENDER_EXTERNAL_URL;

const BASE_URL = `${API_URL}/persons`

const getAll = () => {
  const request = axios.get(BASE_URL)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(BASE_URL, newObject)
  return request.then(response => response.data)
}

const remove = id => {
  const request = axios.delete(`${BASE_URL}/${id}`)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${BASE_URL}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, remove, update }