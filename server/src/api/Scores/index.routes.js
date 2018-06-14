import handlers from './index.handlers';
import responseSender from '../../services/responseSender';

const routes = [{
    method: 'POST',
    path: '/api/scores',
    handlers: [
        handlers.postScore,
        responseSender.responseSender
    ]
}];

module.exports = routes;
