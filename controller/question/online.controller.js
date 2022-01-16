const mysql = require('../../config/mysqlConfig')

module.exports = {
    put: async (ctx) => {
        const param = ctx.request.body
        const sql = `UPDATE question SET online='${param.online}' WHERE id=${param.id};`
        const data = await mysql.mysqlQuery(sql)
        ctx.body = {
            code: 0,
            msg: '更新成功',
            data
        }
    }
}