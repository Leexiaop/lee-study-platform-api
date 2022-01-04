const router = require('koa-router')()

const story = require('./story')
const order = require('./order')
const me = require('./order')
const message = require('./order')
const search = require('./order')
const login = require('./login')

router.get('/', function (ctx, next) {
    ctx.body = '这是一个初始化的请求'
})

router.use('/story', story.routes(), story.allowedMethods)
router.use('/order', order.routes(), order.allowedMethods)
router.use('/me', me.routes(), me.allowedMethods)
router.use('/message', message.routes(), message.allowedMethods)
router.use('/search', search.routes(), search.allowedMethods)
router.use('/login', login.routes(), login.allowedMethods)

module.exports = router;
