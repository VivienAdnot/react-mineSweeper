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

        this.state = {
            isAuthenticated: false,
            user: null,
            showRegisterPopup: false
        };

        this.timeTemp = null;

    }

    onUserCreated = (userCreated) => {

        console.log('App.onUserCreated called with', userCreated);
        const { user, token } = userCreated;
        console.log(user, token, this.timeTemp);

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

        console.log('App.onWin called with time', time);
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
