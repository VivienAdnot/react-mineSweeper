import { generateJwtToken } from 'services/utils';
import { insertUser, getAllUsers } from './index/user.model';

exports.getUsers = (req, res, next) =>

    getAllUsers()
    .then((result) => {

        res.data = result;
        next();

    })
    .catch(next);

exports.postUser = (req, res, next) => {

    const {
        fullName,
        email,
        password
    } = req.body;

    insertUser({
        fullName,
        email,
        password
    })
    .then(({ newVal: userCreated }) => {

        res.data = {
            token: generateJwtToken({ id: userCreated.id }),
            user: userCreated
        };

        next();

    })
    .catch(next);

};
