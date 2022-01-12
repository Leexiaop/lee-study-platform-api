const router = require('koa-router')()
const { answer } = require('../controller')

router.get('/', (ctx, next) => answer.get(ctx, next))
    .post('/', (ctx, next) => answer.post(ctx, next))
    .put('/', (ctx, next) => answer.put(ctx, next))

module.exports = router;