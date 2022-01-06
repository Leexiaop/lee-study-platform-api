const mysql = require('../config/mysqlConfig')

module.exports = {
    getData: async (ctx, next) => {
        const sql = `select * from study_module;`
        const query =  await mysql.mysqlQuery(sql)
        ctx.body = {
            code: 0,
            msg: '请求成功',
            data: query
        }
    }
}