import axios from 'axios';
import { config } from '../config';

export const saveScore = (_user, score) => {

    return axios.post(`${config.api}/api/scores`, {
        _user,
        score
    });

};
