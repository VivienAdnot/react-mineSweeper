import chalk from 'chalk';

const success = () => {

    console.log(chalk.green('...Done'));

};

const exit = () => {

    console.log('bye !');
    process.exit();

};

module.exports = {
    exit,
    success
};
