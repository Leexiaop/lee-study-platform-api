const router = require('koa-router')();
const online = require('../../controller/question/online');

router.put('/', (ctx, next) => online.put(ctx, next));

module.exports = router;
