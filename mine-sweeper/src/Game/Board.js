import React, { Component } from 'react';
import Square from './Square';

const randomNumberBetween = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

const isPositionBomb = (bombPositions, targetPosition) => bombPositions.some(position => {
    return position.x === targetPosition.x
        && position.y === targetPosition.y;
});

const buildBombPositions = (rowSize, columnSize) => {
    let bombPositions = [];
    const bombAmount = rowSize;

    while (bombPositions.length !== bombAmount) {

        let newBombPosition = {
            x: randomNumberBetween(0, rowSize - 1),
            y: randomNumberBetween(0, columnSize -1)
        };

        if (!isPositionBomb(bombPositions, newBombPosition)) {
            bombPositions.push(newBombPosition);
        }

    }

    return bombPositions;

};

const getNeighborPositions = (position, rowSize, columnSize) => {

    const isOutOfBounds = (position) => {
        return (
            position.x < 0
            || position.x > (rowSize - 1)
            || position.y < 0
            || position.y > (columnSize - 1)
        );
    }

    let neighborPositionsRules = [
        // upper row
        (position) => ({
            x: position.x - 1,
            y: position.y - 1
        }),
        (position) => ({
            x: position.x,
            y: position.y - 1
        }),
        (position) => ({
            x: position.x + 1,
            y: position.y - 1
        }),
        // middle row
        (position) => ({
            x: position.x - 1,
            y: position.y
        }),
        (position) => ({
            x: position.x + 1,
            y: position.y
        }),
        // lower row
        (position) => ({
            x: position.x - 1,
            y: position.y + 1
        }),
        (position) => ({
            x: position.x,
            y: position.y + 1
        }),
        (position) => ({
            x: position.x + 1,
            y: position.y + 1
        })
    ];

    let neighborPositions = []

    for (let rule of neighborPositionsRules) {

        const nextPosition = rule(position);

        if (!isOutOfBounds(nextPosition)) {

            neighborPositions.push(nextPosition);

        }

    }

    return neighborPositions;

}

const getNeighborBombPositions = (bombPositions, position) => {

    return getNeighborPositions(position, this.props.rows, this.props.columns).filter(neighborPosition => {
        return isPositionBomb(bombPositions, neighborPosition);
    });

};

const buildMap = (bombPositions) => {
    let positions = Array.from({length: 10}, (value, x) => {
        return Array.from({length: 10}, (value, y) => {
            return {
                position: {x, y},
                value: (isPositionBomb(bombPositions, {x, y})
                ? 'B'
                : getNeighborBombPositions(bombPositions, {x, y}).length
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

        this.bombPositions = buildBombPositions(props.rows, props.columns);

        this.state = {
            boardMap: buildMap(this.bombPositions),
            gameStatus: 'playing' //won, lost
        };

        this.round = 0;
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
            onDblClick={this.onSquareDoubleClick}
            ></Square>
        );

    };

    onSquareLeftClick = (position) => {

        if (this.state.boardMap[position.x][position.y].visibility !== 'hidden') {
            return;
        }

        let positionsToDisplay = [position];

        if (this.state.boardMap[position.x][position.y].value === 0) {

            positionsToDisplay.push(...this.getAllNeighborEmptyPositions(position));

        }

        this.setState((prevState) => {

            positionsToDisplay.forEach((positionToDisplay) => {
                prevState.boardMap[positionToDisplay.x][positionToDisplay.y].visibility = 'visible';
            });

            return {
                boardMap: prevState.boardMap
            }

        }, () => {
            const gameStatus = this.computeGameStatus();

            if (['won', 'lost'].includes(gameStatus)) {
                alert(gameStatus);
                return;
            }

        });
    };

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
    };

    onSquareDoubleClick = (position) => {

        console.log('onSquareDoubleClick reached with', position);

        let targetValue = this.state.boardMap[position.x][position.y].value;

        const isAllowed = (position) => {

            let markedPositions = getNeighborBombPositions(this.bombPositions, position)
            .filter((neighborPosition) => {

                return this.state.boardMap[neighborPosition.x][neighborPosition.y].visibility === 'marked';

            });

            return targetValue === markedPositions.length;

        };

        if (isAllowed(position)) {

            console.log('onSquareDoubleClick allowed ok');

            this.getNeighborHidenPositions(this.bombPositions, position)
            .filter(neighborPosition => {
                return this.state.boardMap[neighborPosition.x][neighborPosition.y].visibility !== 'marked';
            })
            .forEach((neighborPosition) => {
                console.log('new display', neighborPosition);

                this.setState((prevState) => {

                    prevState.boardMap[neighborPosition.x][neighborPosition.y].visibility = 'visible';
                    return {
                        boardMap: prevState.boardMap
                    };

                }, () => {
                    const gameStatus = this.computeGameStatus();

                    if (['won', 'lost'].includes(gameStatus)) {
                        alert(gameStatus);
                    }
                });

            });

        } else {
            console.log('onSquareDoubleClick NOT Allowed');
        }

    };

    computeGameStatus = () => {
        const isBombVisible = () => {
            return this.state.boardMap.some((row) => {

                return row.some((squareInfo) => {
                    return squareInfo.value === 'B' && squareInfo.visibility === 'visible';
                });

            })

        }

        const areAllNumberSquaresDisplayed = () => {
            const squaresSum = this.state.boardMap.length * this.state.boardMap[0].length;
            const numberSquaresSum = squaresSum - this.bombPositions.length;

            const visibleNumberSquares = this.state.boardMap.reduce((acc, row) => {

                const visibleNumberSquaresPerRow = row.filter((squareInfo) => {
                    return squareInfo.value !== 'B' && squareInfo.visibility === 'visible';
                });

                return acc + visibleNumberSquaresPerRow.length;
            }, 0);

            return numberSquaresSum === visibleNumberSquares;
        };

        if (isBombVisible()) {
            return 'lost';
        } else if (areAllNumberSquaresDisplayed()) {
            return 'won';
        }
        return 'playing';
    };

    getAllNeighborEmptyPositions = (position, knownEmptyPositions = []) => {

        this.round++;

        if (this.round > 15) {
            console.log("ROUND STOP");
            return;
        }

        if (!knownEmptyPositions.length) {

            knownEmptyPositions.push(position);

        }

        console.log(`getAllNeighborEmptyPositions called with x:${position.x},y:${position.y} - ${JSON.stringify(knownEmptyPositions)}`);

        let nextEmptyPositions = this.getNeighborEmptyPositions(position)
        .filter(neighborPosition => {
            return this.state.boardMap[neighborPosition.x][neighborPosition.y].visibility === 'hidden'
        });

        //console.log('first filter', nextEmptyPositions);

        let nextUnknownEmptyPositions = nextEmptyPositions.filter(neighborPosition => {
            return !knownEmptyPositions.some(knownPosition => {
                return knownPosition.x === neighborPosition.x
                    && knownPosition.y === neighborPosition.y;
            });
        });

        console.log('nextUnknownEmptyPositions', nextUnknownEmptyPositions);

        if (nextUnknownEmptyPositions.length) {
            knownEmptyPositions.push(...nextUnknownEmptyPositions);
        }

        //console.log('getAllNeighborEmptyPositions after filter', knownEmptyPositions);

        for (let emptyPosition of nextUnknownEmptyPositions) {

            let next = this.getAllNeighborEmptyPositions(emptyPosition, knownEmptyPositions);
            knownEmptyPositions.push(...next);

            //console.log('third filter', knownEmptyPositions);
        }

        console.log('before return', knownEmptyPositions);

        return knownEmptyPositions;
    }

    getNeighborHidenPositions = (bombPositions, position) => {

        return getNeighborPositions(position, this.props.rows, this.props.columns).filter(neighborPosition => {
            return this.state.boardMap[neighborPosition.x][neighborPosition.y].visibility === 'hidden';
        });

    };

    getNeighborEmptyPositions = (position) => {
        return getNeighborPositions(position, this.props.rows, this.props.columns).filter(neighborPosition => {
            return this.state.boardMap[neighborPosition.x][neighborPosition.y].value === 0;
        });
    };

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