import React, { Component } from 'react';
import Board from './Board';
import './Game.css';
import { AppContext } from '../AppProvider';

export const GAME_PLAYING = 0;
export const GAME_WIN = 1;
export const GAME_LOSS = 2;

class Game extends Component {

    constructor(props) {
        super(props);

        this.state = {
            gameId: 1,
            gameStatus: GAME_PLAYING,
            timer: 0
        };

        this.interval = null;
        this.startInterval();
    }

    startInterval = () => {
        this.interval = setInterval(() => {

            this.setState((prevState) => {

                return { timer: prevState.timer + 1 };

            })

        }, 1000);
    }

    resetGame = () => {
        this.setState((prevState) => ({
            timer: 0,
            gameStatus: GAME_PLAYING,
            gameId: prevState.gameId + 1
        }), () => { this.startInterval() });
    };

    onWin = (context) => {

        context.onWin(this.state.timer);
        clearInterval(this.interval);

        this.setState(() => ({
            gameStatus: GAME_WIN
        }));

    };

    onLoss = () => {
        clearInterval(this.interval);
        this.setState(() => ({
            gameStatus: GAME_LOSS
        }));
    };

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
            <AppContext.Consumer>
            {(context) =>
                <div className="game container">

                    {titleRibbon}

                    <div className="game-board">
                        <Board
                            key={this.state.gameId}
                            rowsLength={16}
                            columnsLength={30}
                            bombAmount={99}
                            gameStatus={this.state.gameStatus}
                            onWin={() => this.onWin(context)}
                            onLoss={this.onLoss}
                        ></Board>
                    </div>


                    <div className="result">
                        <button className="play-again" onClick={this.resetGame}>
                            Restart game
                        </button>
                    </div>
                </div>
            }
            </AppContext.Consumer>
        );

    };
}

export default Game;