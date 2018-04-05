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

};

const buildMap = (bombPositions) => {
    let positions = Array.from({length: 10}, (value, x) => {
        return Array.from({length: 10}, (value, y) => {
            return {
                position: {x, y},
                value: (isPositionBomb(bombPositions, {x, y})
                    ? 'B'
                    : countNeighborBombs(bombPositions, {x, y})
                ),
                visibility: 'hidden' // visible, marked
            };
        });
    });

    return positions;
};

class Board extends Component {

    constructor(props) {
        super(props);

        this.bombPositions = buildBombPositions();

        this.state = {
            boardMap: buildMap(this.bombPositions),
            gameStatus: 'playing' //won, lost
        };
    }

    renderSquare(squareInfo) {

        const keyValue = squareInfo.position.x * 10 + squareInfo.position.y;

        return (
            <Square
                key={keyValue}
                position={squareInfo.position}
                value={squareInfo.value}
                visibility={squareInfo.visibility}
                onLeftClick={this.onSquareLeftClick}
                onRightClick={this.onSquareRightClick}
            ></Square>
        );

    };

    onSquareLeftClick = (position) => {
        console.log(`board onSquareLeftClick reached: ${JSON.stringify(position)}`);

        this.setState((prevState) => {

            switch(prevState.boardMap[position.x][position.y].visibility) {
                case 'hidden':

                    prevState.boardMap[position.x][position.y].visibility = 'visible';
                    return {
                        boardMap: prevState.boardMap
                    }
                default:
                    return null;
            }

        }, () => {
            const gameStatus = this.computeGameStatus();
            console.log(gameStatus);
            if (['won', 'lost'].includes(gameStatus)) {
                alert(gameStatus);
            }
        });
    }

    onSquareRightClick = (position) => {
        console.log(`board onSquareRightClick reached: ${JSON.stringify(position)}`);

        this.setState((prevState) => {

            switch(prevState.boardMap[position.x][position.y].visibility) {
            case 'hidden':

                prevState.boardMap[position.x][position.y].visibility = 'marked';
                return {
                    map: prevState.boardMap
                }
            case 'marked':
                prevState.boardMap[position.x][position.y].visibility = 'hidden';
                return {
                    map: prevState.boardMap
                }
            default:
                return null;
            }

        });
    }

    computeGameStatus = () => {
        const isBombVisible = () => {
            return this.state.boardMap.some((row) => {

                return row.some((squareInfo) => {
                    return squareInfo.value === 'B' && squareInfo.visibility === 'visible';
                });

            })

        }

        const areAllNumberSquaresDisplayed = () => {
            const numberSquaresSum = 100 - this.bombPositions.length;

            const visibleNumberSquares = this.state.boardMap.reduce((acc, row) => {

                const visibleNumberSquaresPerRow = row.filter((squareInfo) => {
                    return squareInfo.value !== 'B' && squareInfo.visibility === 'visible';
                });

                return acc + visibleNumberSquaresPerRow.length;
            }, 0);

            console.log(visibleNumberSquares.length);

            return numberSquaresSum === visibleNumberSquares;
        };

        if (isBombVisible()) {
            return 'lost';
        } else if (areAllNumberSquaresDisplayed()) {
            return 'won';
        }
        return 'playing';
    }

    render() {

        return (
            <div>
                {
                    Array.from({length: 10}, (value, index) => index).map(x => {
                        return (
                            <div key={x} className="board-row">
                                {
                                    Array.from({length: 10}, (value, index) => index).map(y => {
                                        return this.renderSquare(this.state.boardMap[x][y]);
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