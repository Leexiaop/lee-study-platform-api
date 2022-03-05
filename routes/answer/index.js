const router = require('koa-router')();
const answer = require('../../controller/answer');
const online = require('./online');

router.get('/', (ctx, next) => answer.get(ctx, next))
    .post('/', (ctx, next) => answer.post(ctx, next))
    .put('/', (ctx, next) => answer.put(ctx, next))
    .delete('/:id', (ctx, next) => answer.delete(ctx, next));

router.use('/online', online.routes(), online.allowedMethods);

module.exports = router;
