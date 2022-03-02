const jwt = require('jsonwebtoken');
const util = require('util');
const secret = require('../config/secret.json');

const verify = util.promisify(jwt.verify);

const whiteList = ['/login'];
const reg = /^\/uploads/g;

module.exports = async (ctx, next) => {
    const token = ctx.header.token;
    if (whiteList.find(item => item === ctx.url) || reg.test(ctx.url)) {
        await next();
        return;
    }
    // const token = ctx.header.token
    // console.log(token)
    try {
        if (token) {
            const payload = await verify(token.split(' ')[0], secret.secret);
            if (payload) {
                await next();
            } else {
                ctx.body = {
                    code: 10001,
                    msg: '请重新登录',
                    data: {}
                };
            }
        } else {
            ctx.body = {
                code: 10001,
                msg: '请重新登录',
                data: {}
            };
        }
    } catch (err) {
        ctx.body = {
            code: 10001,
            msg: '请重新登录',
            data: {}
        };
    }
    // return async function (ctx, next) {
    //     try {
    //         const token = ctx.header.token
    //         if (token) {
    //             let payload
    //             try {
    //                 payload = await verify(token.split(" ")[0], 'leelxp')
    //                 ctx.user = {
    //                     username: payload.username,
    //                     id: payload.id
    //                 }
    //             } catch (err) {
    //                 console.log(err)
    //             }
    //         }
    //         await next()
    //     } catch (error) {
    //         if (error.status === 401) {
    //             ctx.status = 401
    //             ctx.body = {
    //                 code: 401,
    //                 msg: '认证失败'
    //             }
    //         } else {
    //             error.status = 404
    //             ctx.body = {
    //                 code: 404,
    //                 msg: 404
    //             }
    //         }
    //     }
    // }
};
