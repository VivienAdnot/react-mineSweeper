import React, { Component } from 'react';
import Square from './Square';

class Board extends Component {

    renderSquare({x, y}) {

        return (
            <Square
                key={x * 10 + y}
                value={x * 10 + y}
            ></Square>
        );

    }

    render() {

        return (
            <div>
                {
                    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(row => {
                        return (
                            <div key={row} className="board-row">
                                {
                                    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(column => {
                                        return this.renderSquare({
                                            x: row,
                                            y: column
                                        });
                                    })
                                }
                            </div>
                        );
                    })
                }
            </div>
        );

    }
}

export default Board;