import sha1 from 'sha1';
import { DATABASE_NAME, USERS_TABLE_NAME } from './index.const';

const hashPassword = plainPassword => sha1(plainPassword);

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

exports.postUsers = (req, res, next) => {

    const { fullName, email, password } = req.body;

    const newUser = {
        fullName,
        email,
        password: hashPassword(password)
    };

    global.rethinkdb
        .db(DATABASE_NAME)
        .table(USERS_TABLE_NAME)
        .insert(newUser)
        .run()
        .then((result) => {

            res.data = result;
            next();

        })
        .catch(next);

};
