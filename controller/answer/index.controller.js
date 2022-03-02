const moment = require('moment');
const mysql = require('../../config/mysqlConfig');

const now = moment().format('YYYY-MM-DD HH:mm:ss');

module.exports = {
    get: async (ctx) => {
        const {moduleId, questionId, current, size} = ctx.query;
        let sql = 'select * from answer';
        let tSql = 'SELECT COUNT(*) AS total FROM answer';
        if (moduleId) {
            sql += ` WHERE moduleId='${moduleId}'`;
            tSql += ` WHERE moduleId='${moduleId}'`;
        }
        if (questionId) {
            sql += ` AND questionId='${questionId}'`;
            tSql += ` AND questionId='${questionId}'`;
        }
        if (current && size) {
            sql += ` LIMIT ${(current - 1) * size},${size}`;
        }
        const [total] = await mysql.mysqlQuery(tSql);
        const query = await mysql.mysqlQuery(sql);
        ctx.body = {
            code: 0,
            msg: '请求成功',
            data: {
                list: query,
                total: total.total
            }
        };
    },
    post: async (ctx, next) => {
        const param = ctx.request.body;
        const sql = `INSERT INTO answer (moduleId, questionId, answer, create_time, update_time, online) VALUES ('${param.moduleId}', '${param.questionId}', '${param.answer.replace(/'/g, '"')}', '${now}', '${now}', '0');`;
        try {
            const data = await mysql.mysqlQuery(sql);
            ctx.body = {
                code: 0,
                msg: '添加成功',
                data
            };
        } catch (err) {
            ctx.body = {
                code: err.sqlState,
                msg: err.sqlMessage,
                data: {}
            };
        }
    },
    put: async (ctx, next) => {
        const param = ctx.request.body;
        const sql = `UPDATE answer SET answer='${param.answer}', update_time='${now}' WHERE id=${param.id};`;
        const data = await mysql.mysqlQuery(sql);
        ctx.body = {
            code: 0,
            msg: '更新成功',
            data
        };
    },
    delete: async (ctx) => {
        const param = ctx.params;
        if (!param.id) {
            ctx.body = {
                code: 0,
                msg: '删除失败',
                data: false
            };
            return;
        }
        const sql = `DELETE FROM answer WHERE id=${param.id};`;
        await mysql.mysqlQuery(sql);
        ctx.body = {
            code: 0,
            msg: '删除成功',
            data: true
        };
    }
};
