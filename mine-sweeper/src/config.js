const dev = {
    api: 'http://localhost:8089'
};

const prod = {
    api: 'http://165.227.153.242:8089'
};

const envConfig = process.env.NODE_ENV === 'production' ? prod : dev;

const rowsLength = 16;
const columnsLength = 30;
const bombAmount = 99;

export const config = {
    ...envConfig,
    title: 'Minesweeper',
    drawerWidth: 350,
    rowsLength,
    columnsLength,
    bombAmount,
    squaresSum: rowsLength * columnsLength,
    numberSquaresSum: rowsLength * columnsLength - bombAmount
};

export const _ = undefined;