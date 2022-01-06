const router = require('koa-router')()
const { login } = require('../controller')

router.post('/', (ctx, next) => login.login(ctx, next))

module.exports = router

