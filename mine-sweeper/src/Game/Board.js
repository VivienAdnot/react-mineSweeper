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
            map: buildMap(this.bombPositions),
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

            switch(prevState.map[position.x][position.y].visibility) {
                case 'hidden':

                    prevState.map[position.x][position.y].visibility = 'visible';
                    return {
                        map: prevState.map
                    }
                default:
                    return null;
            }

        }, () => {
            const gameStatus = this.computeGameStatus();
            console.log(gameStatus);
            if (['won', 'lost'].includes(gameStatus)) {
                alert(this.gameStatus);
            }
        });
    }

    onSquareRightClick = (position) => {
        console.log(`board onSquareRightClick reached: ${JSON.stringify(position)}`);

        this.setState((prevState) => {

            switch(prevState.map[position.x][position.y].visibility) {
            case 'hidden':

                prevState.map[position.x][position.y].visibility = 'marked';
                return {
                    map: prevState.map
                }
            case 'marked':
                prevState.map[position.x][position.y].visibility = 'hidden';
                return {
                    map: prevState.map
                }
            default:
                return null;
            }

        });
    }

    computeGameStatus = () => {
        const areAllNumberSquaresDisplayed = () => {
            const squaresSum = 100;

            const visibleNumberSquares = this.state.map.filter((squareInfo) => {
                return squareInfo.value !== 'B' && squareInfo.visibility === 'visible';
            });

            return squaresSum === visibleNumberSquares.length;
        };

        const isBombVisible = () => {
            return this.state.map.some((squareInfo) => {
                console.log(`isBombVisible: ${JSON.stringify(squareInfo)}`)
                return squareInfo.value === 'B' && squareInfo.visibility === 'visible';
            });
        }

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
                                        return this.renderSquare(this.state.map[x][y]);
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