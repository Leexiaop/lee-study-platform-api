const router = require('koa-router')()
const login = require('./login.routes')
const upload = require('./upload.routes')
const studyModule = require('./study_module.routes')
const question = require('./question/index.routes')
const answer = require('./answer/index.routes')

router.get('/', function (ctx, next) {
    ctx.body = '这是一个初始化的请求'
})

router.use('/login', login.routes(), login.allowedMethods)
router.use('/upload', upload.routes(), upload.allowedMethods)
router.use('/studyModule', studyModule.routes(), studyModule.allowedMethods)
router.use('/question', question.routes(), question.allowedMethods)
router.use('/answer', answer.routes(), answer.allowedMethods)

module.exports = router