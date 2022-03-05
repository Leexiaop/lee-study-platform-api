const QuestionModel = require('../../model/question');

module.exports = {
    put: async (ctx) => {
        const param = ctx.request.body;
        try {
            const data = await QuestionModel.onQuestionOnlineUpdate(param);
            ctx.body = {
                code: 10000,
                msg: 'success',
                data
            };
        } catch (err) {
            ctx.body = {
                code: 10004,
                msg: 'error',
                err
            };
        }
    }
};
