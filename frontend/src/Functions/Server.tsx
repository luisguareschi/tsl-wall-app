import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const localURL = 'http://localhost:8000/';

const server = axios.create({
    baseURL: localURL,
})

export default server;