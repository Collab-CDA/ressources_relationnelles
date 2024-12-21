//  Service pour gérer les appels API généraux
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api', // Backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;
