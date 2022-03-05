const QuestionModel = require('../../model/question');
// const AnswerModel = require('../../model/answer');

module.exports = {
    get: async (ctx) => {
        try {
            const {count, rows} = await QuestionModel.onQuestionQuery(ctx.query);
            // const answer = await AnswerModel.onAnswerQuery();
            ctx.body = {
                code: 10000,
                msg: 'error',
                data: {
                    list: rows,
                    total: count
                }
            };
        } catch (err) {
            ctx.body = {
                code: 10004,
                msg: 'error',
                err
            };
        }
    },
    post: async (ctx) => {
        try {
            const data = await QuestionModel.onQuestionAdd(ctx.request.body);
            ctx.body = {
                code: 10000,
                msg: 'error',
                data
            };
        } catch (err) {
            ctx.body = {
                code: 10004,
                msg: 'error',
                err
            };
        }
    },
    delete: async (ctx) => {
        const {id} = ctx.params;
        try {
            await QuestionModel.onQuestionDelete(id);
            ctx.body = {
                code: 10000,
                msg: 'success',
                data: true
            };
        } catch (err) {
            ctx.body = {
                code: 10004,
                msg: 'error',
                err
            };
        }
    },
    put: async (ctx) => {
        const param = ctx.request.body;
        try {
            const data = await QuestionModel.onQuestionUpdate(param);
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
