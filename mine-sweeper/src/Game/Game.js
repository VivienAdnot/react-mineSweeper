import React, { Component } from 'react';
import Board from './Board';
import './Game.css';

class Game extends Component {
    render() {

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        rowsLength={16}
                        columnsLength={30}
                        bombAmount={99}
                    ></Board>
                </div>
            </div>
        );

    }
}

export default Game;