import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8000/api', // Replace with your Django backend API endpoint
});

export default API;
