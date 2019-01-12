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

    scoreInternal = {
        shouldSaveScore: false,
        time: null
    };

    saveScoreInternal = (score) => {

        saveScore(this.state.user.id, score);

    };

    clearScore = () => {

        this.scoreInternal = {
            shouldSaveScore: false,
            time: null
        };

    };

    state = {
        isAuthenticated: !!this.user,
        user: this.user || null,
        token: this.token || null,
        showRegisterPopup: false,
        showAuthenticatePopup: false,

        onUserCreated: (userCreated) => {

            const { user, token } = userCreated;

            this.setState(() => ({
                isAuthenticated: true,
                user,
                showRegisterPopup: false
            }), () => {

                storeJwtToken(token);
                storeUser(user);

                if (this.scoreInternal.shouldSaveScore) {
                    this.saveScoreInternal(this.scoreInternal.time);
                    this.clearScore();
                }

            });

        },

        onUserAuthenticated: (userAuthenticated) => {

            const { user, token } = userAuthenticated;

            this.setState(() => ({
                isAuthenticated: true,
                user,
                showAuthenticatePopup: false
            }), () => {

                storeJwtToken(token);
                storeUser(user);

            });

        },

        onWin: (score) => {

            if (this.state.isAuthenticated) {

                this.saveScoreInternal(score);

            } else {

                this.scoreInternal = {
                    shouldSaveScore: false,
                    time: score
                };
                this.setState({
                    showRegisterPopup: true
                });

            }

        },

        requestShowRegisterPopup: () => {
            this.setState({
                showRegisterPopup: true
            });
        },

        requestShowAuthenticatePopup: () => {
            this.setState({
                showAuthenticatePopup: true
            });
        }
    };

    render() {

        return <AppContext.Provider value={this.state}>
            {this.props.children}
        </AppContext.Provider>

    }

}