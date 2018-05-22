import React from 'react';
import { Redirect, Route, Router } from 'react-router-dom';
import App from './App';
import Profile from './Profile/Profile';
import Game from './Game/Game';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';

const auth = new Auth();

const handleAuthentication = ({location}) => {
    if (/access_token|id_token|error/.test(location.hash)) {
        auth.handleAuthentication();
    }
};

export const makeMainRoutes = () => {
    return (
        <Router history={history}>
            <div>
                <Route path="/" render={(props) => <App auth={auth} {...props} />} />

                <Route path="/game" render={(props) => <Game auth={auth} {...props} />} />

                <Route path="/profile" render={(props) => (
                    !auth.isAuthenticated() ? (
                        <Redirect to="/game"/>
                    ) : (
                        <Profile auth={auth} {...props} />
                    )
                )} />

                <Route path="/callback" render={(props) => {
                    handleAuthentication(props);
                    return <Callback {...props} />
                }}/>
            </div>
        </Router>
    );
};
