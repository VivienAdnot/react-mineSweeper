import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AppProvider } from './AppProvider';
import './index.css';

console.log(process.env.REACT_APP_STAGE);

// split is necessary to fix this problem
// https://github.com/ReactTraining/react-router/issues/6072
const Provider = () => (
    <AppProvider>
        <App />
    </AppProvider>
);

ReactDOM.render((
    <BrowserRouter>
        <Provider/>
    </BrowserRouter>
), document.getElementById('root'));