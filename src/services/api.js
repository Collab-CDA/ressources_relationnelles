import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://10.176.131.156:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;
