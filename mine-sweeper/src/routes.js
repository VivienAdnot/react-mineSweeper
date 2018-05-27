import React from 'react';
import { Redirect, Route, Router } from 'react-router-dom';
import App from './App';
import Profile from './Profile/Profile';
import Game from './Game/Game';
import PageContainer from './Auth/PageContainer';
import history from './history';

export const makeMainRoutes = () => {
    return (
        <Router history={history}>
            <div>
                <Route path="/" render={(props) => <App {...props} />} />

                <Route path="/game" render={(props) => <Game {...props} />} />

                <Route path="/page" render={(props) => <PageContainer {...props} />} />
            </div>
        </Router>
    );
};