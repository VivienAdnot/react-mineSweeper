import Boom from 'boom';
import { DATABASE_NAME, SCORES_TABLE_NAME } from './score.const';
import formatRdbResult from '../../../services/utils';

export const insertScore = score =>

    global.rethinkdb
        .db(DATABASE_NAME)
        .table(SCORES_TABLE_NAME)
        .insert(score, { returnChanges: true })
        .run()
        .then(formatRdbResult);

export const getAllBestScores = () => {

    /* TBD */
    throw Error(Boom.notImplemented('getAllBestScores'));

};

export const getBestScores = (_user) => {

    /* TBD */
    throw Error(Boom.notImplemented('getBestScores'));

};
