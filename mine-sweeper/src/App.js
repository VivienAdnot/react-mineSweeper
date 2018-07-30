import React, { Component } from 'react';
import './App.css';
import AppBar from './AppBar';
import Main from './Main';
import { storeJwtToken, storeUser, getJwtToken, getUser } from './services/localStorage';
import { saveScore } from './services/scores';
import RegisterDialog from './Auth/RegisterDialog';

class App extends Component {

    constructor(props) {

        super(props);

        const token = getJwtToken();
        const user = getUser();

        this.state = {
            isAuthenticated: !!user,
            user: user || null,
            token: token || null,
            showRegisterPopup: false
        };

        this.timeTemp = null;

    }

    onUserCreated = (userCreated) => {

        const { user, token } = userCreated;

        this.setState(() => ({
            isAuthenticated: true,
            user,
            showRegisterPopup: false
        }));

        storeJwtToken(token);
        storeUser(user);

        saveScore(user.id, this.timeTemp);

        this.timeTemp = null;

    }

    onWin = (time) => {

        if (this.state.isAuthenticated) {

            saveScore(this.state.user.id, time);

        } else {

            this.timeTemp = time;
            this.setState(() => ({
                showRegisterPopup: true
            }));

        }

    }

    render() {

        return (
            <div>
                {this.state.showRegisterPopup &&

                    <RegisterDialog
                        key={Date.now()}
                        open={true}
                        onUserCreated={this.onUserCreated}
                    />

                }
                <AppBar {...this.state} />
                <Main {...this.state} onWin={this.onWin} />
            </div>
        );

    }

}

export default App;
