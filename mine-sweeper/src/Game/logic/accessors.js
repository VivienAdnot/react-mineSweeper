export const getNeighborPositions = (boardMap, position) => {

    const rowsLength = boardMap.length;
    const columnsLength = boardMap[0].length;

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

//====

export const getNeighborHiddenPositions = (boardMap, position) => {

    return getNeighborPositions(boardMap, position).filter(neighborPosition => {
        return boardMap[neighborPosition.x][neighborPosition.y].visibility === 'hidden';
    });

};

const getNeighborEmptyPositions = (boardMap, position) => {
    return getNeighborPositions(boardMap, position).filter(neighborPosition => {
        return boardMap[neighborPosition.x][neighborPosition.y].value === 0;
    });
};

// heavy

export const getAllNeighborEmptyPositions = (boardMap, position, knownEmptyPositions = []) => {

    if (!knownEmptyPositions.length) {

        knownEmptyPositions.push(position);

    }

    let nextUnknownEmptyPositions = getNeighborEmptyPositions(boardMap, position)
    .filter(neighborPosition => {
        return boardMap[neighborPosition.x][neighborPosition.y].visibility === 'hidden'
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

        let next = getAllNeighborEmptyPositions(boardMap, emptyPosition, knownEmptyPositions);
        knownEmptyPositions = [...next];
    }

    return knownEmptyPositions;
}

export const getEmptyZoneNextNeighbours = (boardMap, emptyZone) => {

    let positionsToDisplay = emptyZone;
    let numberPositionsDiscovered = []

    for (let knownEmptyPosition of positionsToDisplay) {

        let numberHiddenNeighbours = getNeighborHiddenPositions(boardMap, knownEmptyPosition)
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