import React, { Component } from 'react';
import Square from './Square';

const randomNumberBetween = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

const isPositionBomb = (bombPositions, targetPosition) => bombPositions.some(position => {
    return position.x === targetPosition.x
        && position.y === targetPosition.y;
});

const buildBombPositions = (rowsLength, columnsLength, bombAmount) => {
    let bombPositions = [];

    while (bombPositions.length !== bombAmount) {

        let newBombPosition = {
            x: randomNumberBetween(0, rowsLength - 1),
            y: randomNumberBetween(0, columnsLength -1)
        };

        if (!isPositionBomb(bombPositions, newBombPosition)) {
            bombPositions.push(newBombPosition);
        }

    }

    return bombPositions;

};

const getNeighborPositions = (position, rowsLength, columnsLength) => {

    const isOutOfBounds = (position) => {
        return (
            position.x < 0
            || position.x > (rowsLength - 1)
            || position.y < 0
            || position.y > (columnsLength - 1)
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

const buildMap = (bombPositions, rowsLength, columnsLength) => {
    let positions = Array.from({length: rowsLength}, (value, x) => {
        return Array.from({length: columnsLength}, (value, y) => {
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

        this.bombPositions = buildBombPositions(props.rowsLength, props.columnsLength, props.bombAmount);

        this.state = {
            boardMap: buildMap(this.bombPositions, props.rowsLength, props.columnsLength),
            gameStatus: 'playing' //won, lost
        };

        this.positionLost = null;

    }

    renderSquare(squareInfo) {

        const keyValue = squareInfo.position.x * this.state.boardMap[0].length + squareInfo.position.y;

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
            clickable={this.state.gameStatus === 'playing'}
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
            this.state.gameStatus = this.computeGameStatus();

            if (this.state.gameStatus === 'lost') {

                this.showBombs(position);
                this.positionLost = position;

            } else if (this.state.gameStatus === 'won') {

                this.markAllBombs();

            }

        });
    };

    markAllBombs = () => {

        this.setState((prevState) => {

            this.bombPositions.forEach((bombPosition) => {
                prevState.boardMap[bombPosition.x][bombPosition.y].visibility = 'marked';
            });

            return {
                boardMap: prevState.boardMap
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

            let markedPositions = getNeighborPositions(position, this.props.rowsLength, this.props.columnsLength)
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
            this.state.gameStatus = this.computeGameStatus();

            if (this.state.gameStatus === 'lost') {

                this.showBombs(position);
                this.positionLost = position;

            } else if (this.state.gameStatus === 'won') {

                this.markAllBombs();

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
        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA', 'BB', 'CC', 'DD'];

        return `${letters[position.y]}${position.x + 1}`;
    }

    getCodeFromPositions = (positions) => {
        return positions.map(position => this.getCodeFromPosition(position));
    }

    getNeighborHiddenPositions = (position) => {

        return getNeighborPositions(position, this.props.rowsLength, this.props.columnsLength).filter(neighborPosition => {
            return this.state.boardMap[neighborPosition.x][neighborPosition.y].visibility === 'hidden';
        });

    };

    getNeighborEmptyPositions = (position) => {
        return getNeighborPositions(position, this.props.rowsLength, this.props.columnsLength).filter(neighborPosition => {
            return this.state.boardMap[neighborPosition.x][neighborPosition.y].value === 0;
        });
    };

    render() {

        let titleRibbon;
        if (this.state.gameStatus === 'won') {

            titleRibbon = (<div className="alert alert-success">You won the game !</div>);

        } else if (this.state.gameStatus === 'lost') {

            titleRibbon = (<div className="alert alert-danger">You lost the game</div>);

        } else {

            titleRibbon = (<div className="alert alert-warning">Playing</div>);

        }

        return (
            <div>
                {titleRibbon}
                {
                    Array.from({length: this.props.rowsLength}, (value, index) => index).map(x => {
                        return (
                            <div key={x} className="board-row">
                                {
                                    Array.from({length: this.props.columnsLength}, (value, index) => index).map(y => {
                                        return this.renderSquare(this.state.boardMap[x][y]);
                                    })
                                }
                            </div>
                        );
                    })
                }

                {['won', 'lost'].includes(this.state.gameStatus) && (
                    <div className="result">
                        <button className="play-again" onClick={this.props.onPlayAgain}>
                            Play Again
                        </button>
                    </div>
                )}
            </div>
        );

    }
}

export default Board;