import axios from 'axios'
const baseUrl = '/api/login'

const login = loginBody => {
  const request = axios.post(baseUrl, loginBody)
  return request.then(response => response.data)
}

export default { login }
