const dev = {
    api: 'http://localhost:8089'
};

const prod = {
    api: 'http://165.227.153.242:8089'
};

const envConfig = process.env.NODE_ENV === 'production' ? prod : dev;

export const config = {
    ...envConfig,
    title: 'Minesweeper',
    drawerWidth: 350
};

export const _ = undefined;