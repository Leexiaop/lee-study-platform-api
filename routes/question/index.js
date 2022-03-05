const router = require('koa-router')();
const question = require('../../controller/question');
const online = require('./online');

router.get('/', (ctx, next) => question.get(ctx, next))
    .post('/', (ctx, next) => question.post(ctx, next))
    .put('/', (ctx, next) => question.put(ctx, next))
    .delete('/:id', (ctx, next) => question.delete(ctx, next));

router.use('/online', online.routes(), online.allowedMethods);

module.exports = router;
