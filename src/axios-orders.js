import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-hamburger-app.firebaseio.com/',
});

export default instance;