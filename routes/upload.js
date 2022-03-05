const router = require('koa-router')();
const {upload} = require('../controller');

router.post('/', (ctx, next) => upload.upload(ctx, next));

module.exports = router;
