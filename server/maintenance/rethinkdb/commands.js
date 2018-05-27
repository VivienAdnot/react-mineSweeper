import rethinkdbLib from './lib';

exports.reset = () => {

    return rethinkdbLib.dropExistingTable()
        .then(rethinkdbLib.createDatabase)
        .then(rethinkdbLib.createTables)
        .then(rethinkdbLib.drainPoolMaster);

};
