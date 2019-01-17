module.exports = {
    apps: [{
        name: 'API',
        script: './src/server.js',
        interpreter: './node_modules/.bin/babel-node',
        env: {
            NODE_ENV: 'development'
        },
        env_production: {
            NODE_ENV: 'production'
        }
    }]
};
