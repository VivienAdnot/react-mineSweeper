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
    const bombAmount = 10;

    while (bombPositions.length !== bombAmount) {

        let newBombPosition = {
            x: randomNumberBetween(0, 9),
            y: randomNumberBetween(0, 9)
        };

        if (!isPositionBomb(bombPositions, newBombPosition)) {
            bombPositions.push(newBombPosition);
        }

    }

    return bombPositions;

};

const getNeighborPositions = (position) => {

    const isOutOfBounds = (position) => {
        return (
            position.x < 0
            || position.x > (9)
            || position.y < 0
            || position.y > (9)
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

    return getNeighborPositions(position).filter(neighborPosition => {
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

const buildFixedMap = () => {
    let boardMap = Array.from({length: 10}, (value, x) => {
        return Array.from({length: 10}, (value, y) => {
            return {
                position: {x, y},
                value: 1,
                visibility: 'hidden' // visible, marked
            };
        });
    });

    let zerosPositions = [
        { x: 0, y: 1 },
        { x: 0, y: 2 },

        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 1, y: 3 },

        { x: 2, y: 1 },
        { x: 3, y: 1 }
    ];

    zerosPositions.forEach(zeroPosition => {
        boardMap[zeroPosition.x][zeroPosition.y].value = 0;
    });

    return boardMap;
}

class Board extends Component {

    constructor(props) {

        super(props);

        this.bombPositions = buildBombPositions();

        this.state = {
            boardMap: buildMap(this.bombPositions),
            gameStatus: 'playing' //won, lost
        };

        this.positionLost = null;

    }

    renderSquare(squareInfo) {

        const keyValue = squareInfo.position.x * 10 + squareInfo.position.y;
        const isPositionLost = this.positionLost
            && squareInfo.position.x === this.positionLost.x
            && squareInfo.position.y === this.positionLost.y;

        const isBomb = squareInfo.value === 'B';

        return (
            <Square
            key={keyValue}
            position={squareInfo.position}
            value={squareInfo.value}
            visibility={squareInfo.visibility}
            isPositionLost={isPositionLost}
            isBomb={isBomb}
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

            positionsToDisplay = this.getAllNeighborEmptyPositions(position);
            positionsToDisplay = this.getEmptyZoneNextNeighbours(positionsToDisplay);

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

            if (gameStatus === 'lost') {
                this.showBombs(position);
                this.positionLost = position;
            }

            if (['won', 'lost'].includes(gameStatus)) {
                alert(gameStatus);
                return;
            }

        });
    };

    showBombs = (lostPosition) => {
        this.setState((prevState) => {

            this.bombPositions.forEach((bombPosition) => {
                prevState.boardMap[bombPosition.x][bombPosition.y].visibility = 'visible';
            });

            return {
                boardMap: prevState.boardMap
            }

        })
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

        let targetValue = this.state.boardMap[position.x][position.y].value;

        const isAllowed = (position) => {

            let markedPositions = getNeighborBombPositions(this.bombPositions, position)
            .filter((neighborPosition) => {

                return this.state.boardMap[neighborPosition.x][neighborPosition.y].visibility === 'marked';

            });

            return targetValue === markedPositions.length;

        };

        if (!isAllowed(position)) {
            return;
        }

        let positionsToDisplay = this.getNeighborHiddenPositions(position)
        .filter(neighborPosition => {
            return this.state.boardMap[neighborPosition.x][neighborPosition.y].visibility !== 'marked';
        });

        let emptyNeighbourPositions = positionsToDisplay
        .filter(neighborPosition => {
            return this.state.boardMap[neighborPosition.x][neighborPosition.y].value === 0;
        });

        if (emptyNeighbourPositions.length) {

            emptyNeighbourPositions = this.getAllNeighborEmptyPositions(
                emptyNeighbourPositions[0],
                emptyNeighbourPositions);

            const emptyZone = this.getEmptyZoneNextNeighbours(emptyNeighbourPositions);

            positionsToDisplay.push(...emptyZone);
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

        if (!knownEmptyPositions.length) {

            knownEmptyPositions.push(position);

        }

        let nextUnknownEmptyPositions = this.getNeighborEmptyPositions(position)
        .filter(neighborPosition => {
            return this.state.boardMap[neighborPosition.x][neighborPosition.y].visibility === 'hidden'
        })
        .filter(neighborPosition => {

            return !knownEmptyPositions.some(knownPosition => {

                return knownPosition.x === neighborPosition.x
                    && knownPosition.y === neighborPosition.y;

            });

        });

        if (!nextUnknownEmptyPositions.length) {
            return knownEmptyPositions;
        }

        knownEmptyPositions.push(...nextUnknownEmptyPositions);

        for (let emptyPosition of nextUnknownEmptyPositions) {

            let next = this.getAllNeighborEmptyPositions(emptyPosition, knownEmptyPositions);
            knownEmptyPositions = [...next];
        }

        return knownEmptyPositions;
    }

    getEmptyZoneNextNeighbours = (emptyZone) => {

        let positionsToDisplay = emptyZone;
        let numberPositionsDiscovered = []

        for (let knownEmptyPosition of positionsToDisplay) {

            let numberHiddenNeighbours = this.getNeighborHiddenPositions(knownEmptyPosition)
            .filter(numberHiddenNeighbour => {

                return !positionsToDisplay.some(knownPosition => {

                    return knownPosition.x === numberHiddenNeighbour.x
                        && knownPosition.y === numberHiddenNeighbour.y

                });

            })
            .filter(numberHiddenNeighbour => {

                return !numberPositionsDiscovered.some(numberPosition => {

                    return numberPosition.x === numberHiddenNeighbour.x
                        && numberPosition.y === numberHiddenNeighbour.y

                });

            });

            numberPositionsDiscovered.push(...numberHiddenNeighbours);

        }

        positionsToDisplay.push(...numberPositionsDiscovered);
        return positionsToDisplay;
    }

    getCodeFromPosition = (position) => {
        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

        return `${letters[position.y]}${position.x + 1}`;
    }

    getCodeFromPositions = (positions) => {
        return positions.map(position => this.getCodeFromPosition(position));
    }

    getNeighborHiddenPositions = (position) => {

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