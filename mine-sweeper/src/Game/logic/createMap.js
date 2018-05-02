import { getNeighborPositions } from './accessors';

const randomNumberBetween = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

const isPositionBomb = (bombPositions, targetPosition) => bombPositions.some(position => {
    return position.x === targetPosition.x
        && position.y === targetPosition.y;
});

const getVirtualNeighborPositions = (position, rowsLength, columnsLength) => {

    let tempArray = Array(rowsLength).fill(Array(columnsLength));
    return getNeighborPositions(tempArray, position);

}

const getNeighborBombPositions = (bombPositions, position, rowsLength, columnsLength) => {

    return getVirtualNeighborPositions(position, rowsLength, columnsLength).filter(neighborPosition => {
        return isPositionBomb(bombPositions, neighborPosition);
    });

};

export const buildBombPositions = (rowsLength, columnsLength, bombAmount) => {
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

export const buildMap = (bombPositions, rowsLength, columnsLength) => {
    let positions = Array.from({length: rowsLength}, (value, x) => {
        return Array.from({length: columnsLength}, (value, y) => {
            return {
                position: {x, y},
                value: (isPositionBomb(bombPositions, {x, y})
                    ? 'B'
                    : getNeighborBombPositions(bombPositions, {x, y}, rowsLength, columnsLength).length
                ),
                visibility: 'hidden' // visible, marked
            };
        });
    });

    return positions;
};