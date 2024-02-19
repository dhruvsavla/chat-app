import axios from 'axios';

const instance = axios.create({
    //baseURL: 'https://powerful-castle-52397-5218dd5cede0.herokuapp.com',
    baseURL:'http://localhost:3000',
});

export default instance;