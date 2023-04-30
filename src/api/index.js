import axios from 'axios'

const httpClient = axios.create({
  baseURL: 'https://7icgi9.sse.codesandbox.io/'
})

export const getTasks = () => httpClient.get('/contacts')

export const createNewTask = values => {
  return httpClient.post('/contacts', values)
}

export const updateTask = (id, values) =>
  httpClient.patch(`/contacts/${id}`, values)

export const deleteTask = id => httpClient.delete(`/contacts/${id}`)
