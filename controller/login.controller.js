const jsonwebtoken = require('jsonwebtoken');
const mysql = require('../config/mysqlConfig');
const secret = require('../config/secret.json');

module.exports = {
    login: async (ctx) => {
        const param = ctx.request.body;
        const sql = `select * from user where name="${param.username}";`;
        const query = await mysql.mysqlQuery(sql);
        if (!query.length) {
            ctx.body = {
                code: 1,
                msg: '登录失败,查无此人！',
                data: {}
            };
            return;
        }
        let userInfo = query.find(q => q.password === param.password);
        if (!userInfo) {
            ctx.body = {
                code: 2,
                msg: '登录失败,密码错误,请重试！',
                data: {}
            };
            return;
        }
        const token = jsonwebtoken.sign(
            {
                name: userInfo.name,
                idd: userInfo.id
            },
            secret.secret,
            {
                expiresIn: '1h'
            }
        );
        delete userInfo.password;
        ctx.body = {
            code: 0,
            msg: '登录成功',
            data: {
                token,
                ...userInfo
            }
        };
    }
};
