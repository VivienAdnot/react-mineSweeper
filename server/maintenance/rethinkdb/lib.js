import rethinkdbdash from 'rethinkdbdash';
import Promise from 'bluebird';
import utils from './utils';
import config from '../../config/config';
import { DATABASE_NAME, TABLE_NAMES } from './config';

const rethinkdb = rethinkdbdash(config.rethinkdb);

const dropExistingTable = () => {

    return rethinkdb
    .dbList()
    .contains(DATABASE_NAME)
    .run()
    .then((databaseExists) => {

        if (databaseExists) {

            console.log('Existing database found. Dropping...');
            return rethinkdb.dbDrop(DATABASE_NAME).run().then(() => {

                utils.success();

            });

        }

        console.log('No database found');
        return Promise.resolve();

    });

};

const createDatabase = () => {

    console.log(`Creating database ${DATABASE_NAME}`);

    return rethinkdb.dbCreate(DATABASE_NAME).run().then(() => {

        utils.success();

    });

};

const createTables = () => {

    console.log(`Creating tables into ${DATABASE_NAME}`);

    return Promise.map(
        TABLE_NAMES,
        table => rethinkdb.db(DATABASE_NAME).tableCreate(table).run()
    ).then(() => {

        utils.success();

    });

};

const drainPoolMaster = () => {

    return rethinkdb.getPoolMaster().drain().then(() => {

        utils.success();

    });

};

module.exports = {
    drainPoolMaster,
    dropExistingTable,
    createDatabase,
    createTables
};
