const mysql = require('../config/mysqlConfig')
const moment = require('moment')

const now = moment().format('YYYY-MM-DD HH:mm:ss')

module.exports = {
    get: async (ctx, next) => {
        const sql = `select * from question;`
        const query =  await mysql.mysqlQuery(sql)
        ctx.body = {
            code: 0,
            msg: '请求成功',
            data: query
        }
    },
    post: async (ctx, next) => {
        const param = ctx.request.body
        const sql = `INSERT INTO question (module, question, create_time, update_time) VALUES ('${param.module}', '${param.question}', '${now}', '${now}');`
        const data = await mysql.mysqlQuery(sql)
        ctx.body = {
            code: 0,
            msg: '添加成功',
            data
        }
    },
    put: async (ctx) => {
        const param = ctx.request.body
        const sql = `UPDATE question SET module='${param.module}', question='${param.question}', update_time='${now}' WHERE id=${param.id};`
        await mysql.mysqlQuery(sql)
        ctx.body = {
            code: 0,
            msg: '更新成功',
            data: true
        }
    }
}