import React, { Component } from 'react';
import Board from './Board';
import './Game.css';

class Game extends Component {
    render() {

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        rows={10}
                        columns={10}
                    ></Board>
                </div>
            </div>
        );

    }
}

export default Game;