import axios from 'axios'
const baseURI = 'api/login'

const login = async credentials => {
  const response = await axios.post(baseURI, credentials);
  return response.data;
}

const exports = { login };

export default exports;