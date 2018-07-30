import React, { Component } from 'react';
import './App.css';
import AppBar from './AppBar';
import Main from './Main';
import { storeJwtToken, storeUser, getJwtToken, getUser } from './services/localStorage';
import { saveScore } from './services/scores';

class App extends Component {

    constructor(props) {

        super(props);

        this.state = {
            isAuthenticated: false,
            user: null
        };

    }

    onUserCreated = (infos) => {

        const { userCreated: { user, token }, time} = infos;
        console.log(user, token, time);

        storeJwtToken(token);
        storeUser(user);

        saveScore(user.id, time);

        this.setState(() => ({
            isAuthenticated: true,
            user
        }));

    }

    render() {

        return (
            <div>
                <AppBar {...this.state} />
                <Main {...this.state} onUserCreated={this.onUserCreated} />
            </div>
        );

    }

}

export default App;
