import React, { Component } from 'react';
import Board from './Board';
import './Game.css';

class Game extends Component {

    state = {
        gameId: 1
    };

    resetGame = () =>
        this.setState((prevState) => ({
            gameId: prevState.gameId + 1
        }));

    render() {

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        key={this.state.gameId}
                        rowsLength={16}
                        columnsLength={30}
                        bombAmount={99}
                        onPlayAgain={this.resetGame}
                    ></Board>
                </div>
            </div>
        );

    }
}

export default Game;