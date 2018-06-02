import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto'
import { makeMainRoutes } from './routes';
import axios from 'axios';
import { cloneDeep } from 'lodash';
import { getJwtToken } from './services/localStorage';

axios.interceptors.request.use((requestConfig) => {

    const newRequestConfig = cloneDeep(requestConfig);
    const jwtToken = getJwtToken();

    if (jwtToken) {

        newRequestConfig.headers.common.Authorization = jwtToken;

    }

    return newRequestConfig;

});

const routes = makeMainRoutes();

ReactDOM.render(routes, document.getElementById('root'));