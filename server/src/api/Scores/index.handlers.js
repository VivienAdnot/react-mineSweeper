import { insertScore } from 'api/Scores/index/score.model';

exports.postScore = (req, res, next) => {

    const {
        _user,
        score
    } = req.body;

    insertScore({
        _user,
        score,
        createdAt: new Date()
    })
        .then(({ newVal: scoreCreated }) => {

            res.data = {
                score: scoreCreated
            };

            next();

        })
        .catch(next);

};
