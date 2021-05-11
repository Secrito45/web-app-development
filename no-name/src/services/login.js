import axios from 'axios'
const baseURI = 'http://localhost:3001/api/login'

const login = async credentials => {
  const response = await axios.post(baseURI, credentials);
  return response.data;
}

const exports = { login };

export default exports;