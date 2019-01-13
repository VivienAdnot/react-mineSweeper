const dev = {
    api: 'http://localhost:8089'
};

const prod = {
    api: 'http://165.227.153.242:8089'
};

const envConfig = process.env.REACT_APP_STAGE === 'production' ? prod : dev;

export const config = {
    ...envConfig,
    title: 'Minesweeper',
    drawerWidth: 400
};

export const _ = undefined;