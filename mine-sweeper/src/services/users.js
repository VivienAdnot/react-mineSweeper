import axios from 'axios';

const localDomain = 'http://localhost:8089';

export const requestCreateUser = (user) => {

    return axios.post(`${localDomain}/api/users`, user);

};

export const requestAuthenticateUser = (user) => {

    return axios.post(`${localDomain}/auth/login`, user);

};