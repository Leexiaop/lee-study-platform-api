const ModulesModel = require('../model/modules');

module.exports = {
    get: async (ctx) => {
        try {
            const {count, rows} = await ModulesModel.onModulesQuery(ctx.query);
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
        const param = ctx.request.body;
        try {
            const data = await ModulesModel.onModulesAdd(param);
            ctx.body = {
                code: 10000,
                msg: 'success',
                data: data
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
            await ModulesModel.onModulesDelete(id);
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
            const data = await ModulesModel.onModulesUpdate(param);
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
