const mysql = require('../config/mysqlConfig')
const moment = require('moment')

const now = moment().format('YYYY-MM-DD HH:mm:ss')

module.exports = {
    get: async (ctx) => {
        const sql = `select * from answer WHERE questionId=${ctx.query.questionId};`
        const query =  await mysql.mysqlQuery(sql)
        ctx.body = {
            code: 0,
            msg: '请求成功',
            data: query
        }
    },
    post: async (ctx, next) => {
        const param = ctx.request.body
        let answerList = param?.answerList?.map(answer => {
            return `('${param.questionId}', '${answer.replace(/\'/g, '"')}', '${now}', '${now}')`
        })
        const sql = `INSERT INTO answer (questionId, answer, create_time, update_time) VALUES ${answerList.toString()};`
        console.log(sql)
        try {
            const data = await mysql.mysqlQuery(sql)
            ctx.body = {
                code: 0,
                msg: '添加成功',
                data
            }
        } catch (err) {
            ctx.body = {
                code: err.sqlState,
                msg: err.sqlMessage,
                data: {}
            }
        }
    }
}