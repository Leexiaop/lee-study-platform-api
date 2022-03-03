// const moment = require('moment');
// const mysql = require('../config/mysqlConfig');

// const now = moment().format('YYYY-MM-DD HH:mm:ss');

// module.exports = {
//     get: async (ctx, next) => {
//         const sql = 'select * from module;';
//         const query = await mysql.mysqlQuery(sql);
//         ctx.body = {
//             code: 0,
//             msg: '请求成功',
//             data: query
//         };
//     },
//     post: async (ctx, next) => {
//         const param = ctx.request.body;
//         const sql = `INSERT INTO module (name, src, tip, create_time, update_time) VALUES ('${param.name}', '${param.src}', '${param.tip}', '${now}', '${now}');`;
//         const data = await mysql.mysqlQuery(sql);
//         ctx.body = {
//             code: 0,
//             msg: '添加成功',
//             data
//         };
//     },
//     delete: async (ctx, next) => {
//         const param = ctx.params;
//         if (!param.id) {
//             ctx.body = {
//                 code: 0,
//                 msg: '删除失败',
//                 data: false
//             };
//             return;
//         }
//         const sql = `DELETE FROM module WHERE id=${param.id};`;
//         await mysql.mysqlQuery(sql);
//         ctx.body = {
//             code: 0,
//             msg: '删除成功',
//             data: true
//         };
//     },
//     put: async (ctx, next) => {
//         const param = ctx.request.body;
//         const sql = `UPDATE module SET name='${param.name}', src='${param.src}', tip='${param.tip}', update_time='${now}' WHERE id=${param.id};`;
//         await mysql.mysqlQuery(sql);
//         ctx.body = {
//             code: 0,
//             msg: '更新成功',
//             data: true
//         };
//     }
// };

const ModulesModel = require('../model/modules');

module.exports = {
    get: async (ctx) => {
        const {current, size} = ctx.query;
        try {
            const {count, rows} = await ModulesModel.onModulesQuery({current, size});
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
