const jsonwebtoken = require('jsonwebtoken');
const UserModel = require('../model/user');
const secret = require('../config/secret.json');

module.exports = {
    login: async (ctx) => {
        const param = ctx.request.body;
        try {
            const query = await UserModel.onUserQuery(param);
            if (!query) {
                ctx.body = {
                    code: 10002,
                    msg: '登录失败,查无此人！',
                    data: {}
                };
                return;
            }
            if (query.password !== param.password) {
                ctx.body = {
                    code: 10003,
                    msg: '登录失败,密码错误,请重试！',
                    data: {}
                };
                return;
            }
            const token = jsonwebtoken.sign(
                {
                    name: query.name,
                    id: query.id
                },
                secret.secret,
                {
                    expiresIn: '1h'
                }
            );
            delete query.password;
            ctx.body = {
                code: 0,
                msg: '登录成功',
                data: {
                    token,
                    ...query
                }
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
