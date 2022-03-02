const router = require('koa-router')();
const {modules} = require('../controller');

router.get('/', (ctx, next) => modules.get(ctx, next))
    .post('/', (ctx, next) => modules.post(ctx, next))
    .delete('/:id', (ctx, next) => modules.delete(ctx, next))
    .put('/', (ctx, next) => modules.put(ctx, next));

module.exports = router;
