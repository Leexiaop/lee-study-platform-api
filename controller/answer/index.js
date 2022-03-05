const AnswerModel = require('../../model/answer');

module.exports = {
    get: async (ctx) => {
        try {
            const {count, rows} = await AnswerModel.onAnswerQuery(ctx.query);
            ctx.body = {
                code: 10000,
                msg: 'success',
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
            const data = await AnswerModel.onAnswerAdd(ctx.request.body);
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
            await AnswerModel.onAnswerDelete(id);
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
            const data = await AnswerModel.onAnswerUpdate(param);
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
