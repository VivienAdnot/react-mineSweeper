import React, { Component } from 'react';
import Square from './Square';

const randomNumberBetween = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

const isPositionBomb = (bombPositions, targetPosition) => bombPositions.some(position => {
    return position.x === targetPosition.x
        && position.y === targetPosition.y;
});

const buildBombPositions = () => {
    let bombPositions = [];

    while (bombPositions.length !== 10) {

        let newBombPosition = {
            x: randomNumberBetween(0, 10),
            y: randomNumberBetween(0, 10)
        };

        if (!isPositionBomb(bombPositions, newBombPosition)) {
            bombPositions.push(newBombPosition);
        }

    }

    return bombPositions;

};

const countNeighborBombs = (bombPositions, position) => {
    let neighborBombs = 0;

    // upper row

    if ((position.x > 0 && position.y > 0)
        && (isPositionBomb(bombPositions, {
            x: position.x - 1,
            y: position.y - 1
        }))
    ) {
        neighborBombs++;
    }

    if ((position.y > 0)
        && (isPositionBomb(bombPositions, {
            x: position.x,
            y: position.y - 1
        }))
    ) {
        neighborBombs++;
    }

    if ((position.x < 9 && position.y > 0)
        && (isPositionBomb(bombPositions, {
            x: position.x + 1,
            y: position.y - 1
        }))
    ) {
        neighborBombs++;
    }

    // same row

    if ((position.x > 0)
        && (isPositionBomb(bombPositions, {
            x: position.x - 1,
            y: position.y
        }))
    ) {
        neighborBombs++;
    }

    if ((position.x < 9)
        && (isPositionBomb(bombPositions, {
            x: position.x + 1,
            y: position.y
        }))
    ) {
        neighborBombs++;
    }

    // lower row

    if ((position.x > 0 && position.y < 9)
        && (isPositionBomb(bombPositions, {
            x: position.x - 1,
            y: position.y + 1
        }))
    ) {
        neighborBombs++;
    }

    if ((position.y < 9)
        && (isPositionBomb(bombPositions, {
            x: position.x,
            y: position.y + 1
        }))
    ) {
        neighborBombs++;
    }

    if ((position.x < 9 && position.y < 9)
        && (isPositionBomb(bombPositions, {
            x: position.x + 1,
            y: position.y + 1
        }))
    ) {
        neighborBombs++;
    }

    return neighborBombs;

}

class Board extends Component {

    constructor(props) {
        super(props);

        this.bombPositions = buildBombPositions();

        this.state = {
            squaresInfos: Array.from({length: 10}, () => {
                return Array.from({length: 10}, () => {
                    return {
                        status: 'hidden'
                    }
                });
            })
        }
    }

    renderSquare(position) {

        const keyValue = position.x * 10 + position.y;

        const positionValue = (isPositionBomb(this.bombPositions, position)
            ? 'B'
            : countNeighborBombs(this.bombPositions, position)
        );

        return (
            <Square
                key={keyValue}
                value={positionValue}
            ></Square>
        );

    };

    render() {

        return (
            <div>
                {
                    Array.from({length: 10}, (v, k) => k).map(row => {
                        return (
                            <div key={row} className="board-row">
                                {
                                    Array.from({length: 10}, (v, k) => k).map(column => {
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