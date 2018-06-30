import React, { Component } from 'react';
import Board from './Board';
import './Game.css';

import RegisterDialog from '../Auth/RegisterDialog';
import { storeJwtToken, storeUser, getJwtToken, getUser } from '../services/localStorage';
import { saveScore } from '../services/scores';

export const GAME_PLAYING = 0;
export const GAME_WIN = 1;
export const GAME_LOSS = 2;

class Game extends Component {

    constructor(props) {
        super(props);

        this.state = {
            gameId: 1,
            isAuthenticated: false,
            gameStatus: GAME_PLAYING,
            timer: 0
        };

        this.timerRef = null;

        this.startInterval();
    }

    startInterval = () => {
        this.timerRef = setInterval(() => {

            this.setState((prevState) => {

                return { timer: prevState.timer + 1 };

            })

        }, 1000);
    }

    resetGame = () => {
        this.state.timer = 0;
        this.startInterval();
        this.setState((prevState) => ({
            gameStatus: GAME_PLAYING,
            gameId: prevState.gameId + 1
        }));
    };

    onWin = (score) => {
        clearInterval(this.timerRef);
        this.score = score;
        this.setState(() => ({
            gameStatus: GAME_WIN
        }));
    };

    onLoss = () => {
        clearInterval(this.timerRef);
        this.setState(() => ({
            gameStatus: GAME_LOSS
        }));
    };

    // onUserCreated = (userCreatedWithToken) => {

    //     // todo save token and userCreated.id
    //     // todo save score

    //     storeJwtToken(userCreatedWithToken.token);
    //     storeUser(userCreatedWithToken.user);

    //     saveScore(userCreatedWithToken.user.id, this.state.timer);

    //     this.setState({
    //         isAuthenticated: true
    //     });
    // }

    render() {

        let titleRibbon;
        if (this.state.gameStatus === GAME_WIN) {

            titleRibbon = (
                <div className="alert alert-success">
                    You won the game in {this.state.timer} seconds !
                </div>
            );

        } else if (this.state.gameStatus === GAME_LOSS) {

            titleRibbon = (<div className="alert alert-danger">You lost the game</div>);

        } else {

            titleRibbon = (<div className="alert alert-warning">
                Playing. Performance: {this.state.timer}
            </div>);

        }

        return (
            <div className="game container">

                {titleRibbon}

                <div className="game-board">
                    <Board
                        key={this.state.gameId}
                        rowsLength={16}
                        columnsLength={30}
                        bombAmount={99}
                        gameStatus={this.state.gameStatus}
                        onWin={this.onWin}
                        onLoss={this.onLoss}
                    ></Board>
                </div>

                {[GAME_WIN, GAME_LOSS].includes(this.state.gameStatus) && (
                    <div className="result">
                        <button className="play-again" onClick={this.resetGame}>
                            Play Again
                        </button>
                    </div>
                )}
            </div>
        );

    };
}

export default Game;