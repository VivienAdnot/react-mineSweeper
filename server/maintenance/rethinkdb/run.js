#!/usr/bin/env node

import program from 'commander';

let command;

program
    .arguments('<cmd>')
    .action((cmd) => {

        command = cmd;

    })
    .parse(process.argv);

const rethinkdb = require('./commands');
const utils = require('./utils');

if (!command) {

    throw new Error('argument "command" is missing. Possible values : reset');

}

rethinkdb[command]()
    .then(() => utils.exit())
    .catch((err) => {

        console.error(err);
        utils.exit();

    });
