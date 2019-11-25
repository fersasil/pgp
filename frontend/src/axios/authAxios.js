import axios from 'axios';
import {serverUrl} from "../store/constants";

const headers = {
    'Content-Type': 'application/json',
};

export default axios.create({
    baseURL: `${serverUrl}/api/`,
    // baseURL: `http://131.108.54.142:3000/`,
    headers: headers
});