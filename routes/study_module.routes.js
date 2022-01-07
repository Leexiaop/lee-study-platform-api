const router = require('koa-router')()
const { study_module } = require('../controller')

router.get('/', (ctx, next) => study_module.get(ctx, next))
    .post('/', (ctx, next) => study_module.post(ctx, next))
    .delete('/:id', (ctx, next) => study_module.delete(ctx, next))
    .put('/', (ctx, next) => study_module.put(ctx, next))

module.exports = router;