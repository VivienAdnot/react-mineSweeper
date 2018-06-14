import axios from 'axios';

const localDomain = 'http://localhost:8089';

export const saveScore = (_user, score) => {

    return axios.post(`${localDomain}/api/scores`, {
        _user,
        score
    });

};