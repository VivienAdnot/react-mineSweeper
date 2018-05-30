import { insertUser, getAllUsers } from './index/user.model';
import { insertScore } from '../Scores/index/score.model';

exports.getUsers = (req, res, next) =>

    getAllUsers()
        .then((result) => {

            res.data = result;
            next();

        })
        .catch(next);

exports.postUsers = (req, res, next) => {

    const {
        fullName,
        email,
        password,
        score
    } = req.body;

    insertUser({
        fullName,
        email,
        password
    })
        .then(({ newVal: userCreated }) => {

            insertScore({
                _user: userCreated.id,
                score,
                createdAt: new Date()
            })
                .then(({ newVal: scoreCreated }) => {

                    res.data = {
                        user: userCreated,
                        score: scoreCreated
                    };

                    next();

                });

        })
        .catch(next);

};
