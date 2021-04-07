import axios from 'axios';
const baseUrl = 'api/blogs';



const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const addBlog = (params) => {
  let token = JSON.parse(localStorage.getItem('loggedUser'))
  if (token) axios.defaults.headers['authorization'] = `bearer ${token.token}`;
  const request = axios.post(baseUrl, params);
  return request.then((response) => response.data);
};
// eslint-disable-next-line
export default { getAll, addBlog };
