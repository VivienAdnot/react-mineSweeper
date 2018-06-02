import { insertScore } from 'api/Scores/index/score.model';
import { generateJwtToken } from 'services/utils';
import { insertUser, getAllUsers } from './index/user.model';

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
                        token: generateJwtToken({ id: userCreated.id }),
                        user: userCreated,
                        score: scoreCreated
                    };

                    next();

                });

        })
        .catch(next);

};
