const mysql = require('../../config/mysqlConfig')
const moment = require('moment')

const now = moment().format('YYYY-MM-DD HH:mm:ss')

module.exports = {
    get: async (ctx, next) => {
        const { moduleId } = ctx.query
        let questionSql = `select * from question`
        if (moduleId) {
            questionSql += ` WHERE module='${moduleId}'`
        }
        const questionList =  await mysql.mysqlQuery(questionSql)
        const answerList = await mysql.mysqlQuery(`select * from answer;`)
        questionList.forEach(question => {
            question.answerList = []
            answerList.forEach(answer => {
                if (question.id === answer.questionId) {
                    question.answerList.push(answer)
                }
            })
        });
        ctx.body = {
            code: 0,
            msg: '请求成功',
            data: questionList
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
    },
    delete: async (ctx) => {
        const param = ctx.params
        if (!param.id) {
            ctx.body = {
                code: 0,
                msg: '删除失败',
                data: false
            }
            return
        }
        const sql = `DELETE FROM question WHERE id=${param.id};`
        await mysql.mysqlQuery(sql)
        ctx.body = {
            code: 0,
            msg: '删除成功',
            data: true
        }
    }
}