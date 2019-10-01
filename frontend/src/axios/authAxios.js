import axios from 'axios';

const headers = {
    'Content-Type': 'application/json',
};

export default axios.create({
    baseURL: `http://localhost:3000/api/`,
    // baseURL: `http://131.108.54.142:3000/`,
    headers: headers
});