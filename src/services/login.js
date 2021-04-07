import axios from 'axios'
const baseUrl = '/api/login'
// eslint-disable-next-line
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const login = async(credentials) => {
  const res = await axios.post(baseUrl, credentials)
  return res.data
}

// eslint-disable-next-line
export default { login,setToken,token }