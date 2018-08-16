import React, { Component } from 'react';
import {
    storeJwtToken,
    storeUser,
    getJwtToken,
    getUser
} from './services/localStorage';
import { saveScore } from './services/scores';

export const AppContext = React.createContext();

export class AppProvider extends Component {

    token = getJwtToken();
    user = getUser();
    timeTemp = null;

    saveScoreInternal = (score) => {

        saveScore(this.state.user.id, score);

    }

    state = {
        isAuthenticated: !!this.user,
        user: this.user || null,
        token: this.token || null,
        showRegisterPopup: false,

        onUserCreated: (userCreated) => {

            const { user, token } = userCreated;

            this.setState(() => ({
                isAuthenticated: true,
                user,
                showRegisterPopup: false
            }), () => {

                storeJwtToken(token);
                storeUser(user);
                this.saveScoreInternal(this.timeTemp);

            });

        },

        onWin: (score) => {

            if (this.state.isAuthenticated) {

                this.saveScoreInternal(score);

            } else {

                this.timeTemp = score;
                this.setState({
                    showRegisterPopup: true
                });

            }

        }
    };

    render() {

        return <AppContext.Provider value={this.state}>
            {this.props.children}
        </AppContext.Provider>

    }

}