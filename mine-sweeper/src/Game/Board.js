import React, { Component } from 'react';
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
import { getCodeFromPosition, getCodeFromPositions } from './logic/utils';

class Board extends Component {

    constructor(props) {

        super(props);

        this.bombPositions = buildBombPositions(props.rowsLength, props.columnsLength, props.bombAmount);

        this.state = {
            boardMap: buildMap(this.bombPositions, props.rowsLength, props.columnsLength),
            gameStatus: 'playing', //won, lost
            timer: 0
        };

        this.positionLost = null;

        this.timerRef = setInterval(() => {

            this.setState((prevState) => {

                const timer = this.state.timer += 1;
                return { timer };

            })

        }, 1000);

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
            this.state.gameStatus = this.computeGameStatus();

            if (this.state.gameStatus === 'lost') {

                this.onGameLost(position);

            } else if (this.state.gameStatus === 'won') {

                this.onGameWon(position);

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
            this.state.gameStatus = this.computeGameStatus();

            if (this.state.gameStatus === 'lost') {

                this.onGameLost(position);

            } else if (this.state.gameStatus === 'won') {

                this.onGameWon(position);

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

            //return numberSquaresSum === visibleNumberSquares;

            return true;
        };

        if (isBombVisible()) {
            return 'lost';
        } else if (areAllNumberSquaresDisplayed()) {
            return 'won';
        }
        return 'playing';
    };

    onGameWon = (position) => {

        clearInterval(this.timerRef);
        this.markAllBombs();

    }

    onGameLost = (position) => {

        clearInterval(this.timerRef);
        this.showAllBombs(position);
        this.positionLost = position;

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

    render() {

        let titleRibbon;
        if (this.state.gameStatus === 'won') {

            titleRibbon = (
                <div className="alert alert-success">
                    You won the game in {this.state.timer} seconds !

                    {/* <SimpleDialogWrapped
                        selectedValue={emails[1]}
                        open={true}
                        onClose={() => {}}
                    /> */}
                </div>
            );

        } else if (this.state.gameStatus === 'lost') {

            titleRibbon = (<div className="alert alert-danger">You lost the game</div>);

        } else {

            titleRibbon = (<div className="alert alert-warning">
                Playing. Performance: {this.state.timer}
            </div>);

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