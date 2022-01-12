const router = require('koa-router')()
const { question } = require('../controller')

router.get('/', (ctx, next) => question.get(ctx, next))
    .post('/', (ctx, next) => question.post(ctx, next))
    .put('/', (ctx, next) => question.put(ctx, next))

module.exports = router;