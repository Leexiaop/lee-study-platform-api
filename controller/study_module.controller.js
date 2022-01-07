const mysql = require('../config/mysqlConfig')

module.exports = {
    get: async (ctx, next) => {
        const sql = `select * from study_module;`
        const query =  await mysql.mysqlQuery(sql)
        ctx.body = {
            code: 0,
            msg: '请求成功',
            data: query
        }
    },
    post: async (ctx, next) => {
        const param = ctx.request.body
        const sql = `INSERT INTO study_module (name, src, tip) VALUES ('${param.name}', '${param.src}', '${param.tip}');`
        const data = await mysql.mysqlQuery(sql)
        ctx.body = {
            code: 0,
            msg: '添加成功',
            data
        }
    },
    delete: async (ctx, next) => {
        const param = ctx.params
        if (!param.id) {
            ctx.body = {
                code: 0,
                msg: '删除失败',
                data: false
            }
            return
        }
        const sql = `DELETE FROM study_module WHERE id=${param.id};`
        await mysql.mysqlQuery(sql)
        ctx.body = {
            code: 0,
            msg: '删除成功',
            data: true
        }
    },
    put: async (ctx, next) => {
        const param = ctx.request.body
        const sql = `UPDATE study_module SET name='${param.name}', src='${param.src}', tip='${param.tip}' WHERE id=${param.id};`
        await mysql.mysqlQuery(sql)
        ctx.body = {
            code: 0,
            msg: '更新成功',
            data: true
        }
    }
}