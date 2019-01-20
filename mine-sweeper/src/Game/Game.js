import React, { Component } from 'react';
import './Game.css';


import Square from './Square';
import {
    buildBombPositions,
    buildMap
} from './logic/createMap';
import {
    getNeighborPositions,
    getNeighborHiddenPositions,
    getAllNeighborEmptyPositions,
    getEmptyZoneNextNeighbours
} from './logic/accessors';
import { doWinFast } from './debug';
import { config } from '../config';

export const GAME_PLAYING = 0;
export const GAME_WIN = 1;
export const GAME_LOSS = 2;

class Game extends Component {

    constructor(props) {
        super(props);

        this.bombPositions = buildBombPositions(config.rowsLength, config.columnsLength, config.bombAmount);
        this.positionLost = null;

        this.state = {
            gameId: 1,
            gameStatus: GAME_PLAYING,
            timer: 0,
            boardMap: buildMap(this.bombPositions, config.rowsLength, config.columnsLength)
        };

        this.interval = null;
        this.startInterval();

    }

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

    showAllBombs = (lostPosition) => {

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

    onSquareLeftClick = (position) => {

        if (this.state.boardMap[position.x][position.y].visibility !== 'hidden') {
            return;
        }

        let positionsToDisplay = [position];

        if (this.state.boardMap[position.x][position.y].value === 0) {

            positionsToDisplay = getAllNeighborEmptyPositions(this.state.boardMap, position);
            positionsToDisplay = getEmptyZoneNextNeighbours(this.state.boardMap, positionsToDisplay);

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

            if (gameStatus === GAME_LOSS) {

                this.onLoss(position);

            } else if (gameStatus === GAME_WIN) {

                this.onWin();

            }

        });
    };

    onSquareDoubleClick = (position) => {

        let targetValue = this.state.boardMap[position.x][position.y].value;

        const isAllowed = (position) => {

            let markedPositions = getNeighborPositions(this.state.boardMap, position)
            .filter((neighborPosition) => {

                return this.state.boardMap[neighborPosition.x][neighborPosition.y].visibility === 'marked';

            });

            return targetValue === markedPositions.length;

        };

        if (!isAllowed(position)) {
            return;
        }

        let positionsToDisplay = getNeighborHiddenPositions(this.state.boardMap, position)
        .filter(neighborPosition => {
            return this.state.boardMap[neighborPosition.x][neighborPosition.y].visibility !== 'marked';
        });

        let emptyNeighbourPositions = positionsToDisplay
        .filter(neighborPosition => {
            return this.state.boardMap[neighborPosition.x][neighborPosition.y].value === 0;
        });

        if (emptyNeighbourPositions.length) {

            emptyNeighbourPositions = getAllNeighborEmptyPositions(
                this.state.boardMap,
                emptyNeighbourPositions[0],
                emptyNeighbourPositions);

            const emptyZone = getEmptyZoneNextNeighbours(this.state.boardMap, emptyNeighbourPositions);

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

            if (gameStatus === GAME_LOSS) {

                this.onLoss(position);

            } else if (gameStatus === GAME_WIN) {

                this.onWin(position);

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

        // shortcut for debug:
        if (doWinFast) {
            return GAME_WIN;
        }

        if (isBombVisible()) {
            return GAME_LOSS;
        } else if (areAllNumberSquaresDisplayed()) {
            return GAME_WIN;
        }
        return GAME_PLAYING;
    };

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
                clickable={this.state.gameStatus === GAME_PLAYING}
            ></Square>
        );

    }

    startInterval = () => {
        this.interval = setInterval(() => {

            this.setState((prevState) => {

                return { timer: prevState.timer + 1 };

            })

        }, 1000);
    }

    resetGame = () => {
        this.bombPositions = buildBombPositions(config.rowsLength, config.columnsLength, config.bombAmount);
        this.positionLost = null;

        this.setState((prevState) => ({
            timer: 0,
            gameStatus: GAME_PLAYING,
            gameId: prevState.gameId + 1,
            boardMap: buildMap(this.bombPositions, config.rowsLength, config.columnsLength)
        }), () => { this.startInterval() });
    };

    onWin = () => {

        this.markAllBombs();

        this.props.context.onWin(this.state.timer);
        clearInterval(this.interval);

        this.setState(() => ({
            gameStatus: GAME_WIN
        }));

    };

    onLoss = (position) => {
        this.showAllBombs(position);
        this.positionLost = position;

        clearInterval(this.interval);
        this.setState(() => ({
            gameStatus: GAME_LOSS
        }));
    };

    render() {

        let titleRibbon;
        if (this.state.gameStatus === GAME_WIN) {

            titleRibbon = (

                <div className="alert alert-success">
                    You won the game in {this.state.timer} seconds !
                </div>

            );

        } else if (this.state.gameStatus === GAME_LOSS) {

            titleRibbon = (<div className="alert alert-danger">You lost the game</div>);

        } else {

            titleRibbon = (<div className="alert alert-warning">
                Playing. Performance: {this.state.timer}
            </div>);

        }

        return (
                <div className="game container">

                    {titleRibbon}

                    <div className="game-board">
                        <div>
                        {
                            Array.from({length: config.rowsLength}, (value, index) => index).map(x => {
                                return (
                                    <div key={x} className="board-row">
                                        {
                                            Array.from({length: config.columnsLength}, (value, index) => index).map(y => {
                                                return this.renderSquare(this.state.boardMap[x][y]);
                                            })
                                        }
                                    </div>
                                );
                            })
                        }
                        </div>
                    </div>

                    <div className="result">
                        <button className="play-again" onClick={this.resetGame}>
                            Restart game
                        </button>
                    </div>
                </div>
        );

    };
}

export default Game;