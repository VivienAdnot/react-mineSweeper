import { AUTHORS_DATABASE_NAME, AUTHORS_TABLE_NAME } from './index.const';

exports.getUsers = (req, res, next) =>

    global.rethinkdb
    .db(DATABASE_NAME)
    .table(USERS_TABLE_NAME)
    .run()
    .then((result) => {

        res.data = result;
        next();

    })
    .catch(next);

exports.postAuthors = (req, res, next) =>

    global.rethinkdb
    .db(DATABASE_NAME)
    .table(USERS_TABLE_NAME)
    .insert(req.body)
    .run()
    .then((result) => {

        res.data = result;
        next();

    })
    .catch(next);