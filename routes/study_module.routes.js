const router = require('koa-router')()
const { study_module } = require('../controller')

router.get('/', (ctx, next) => study_module.getData(ctx, next))

module.exports = router;