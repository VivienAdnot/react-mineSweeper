export const getCodeFromPosition = (position) => {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA', 'BB', 'CC', 'DD'];

    return `${letters[position.y]}${position.x + 1}`;
}

export const getCodeFromPositions = (positions) => {
    return positions.map(position => this.getCodeFromPosition(position));
}