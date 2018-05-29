import axios from 'axios';

const localDomain = 'http://localhost:8089';

export const createUser = (user) => {

    const { fullName, email, password, confirmationPassword } = user;

    return axios.post(`${localDomain}/api/users`, {
        fullName,
        email,
        password,
        confirmationPassword
    });

};