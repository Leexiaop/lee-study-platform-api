const router = require('koa-router')()
const login = require('./login.routes')
const upload = require('./upload.routes')
const studyModule = require('./study_module.routes')

router.get('/', function (ctx, next) {
    ctx.body = '这是一个初始化的请求'
})

router.use('/login', login.routes(), login.allowedMethods)
router.use('/upload', upload.routes(), upload.allowedMethods)
router.use('/studyModule', studyModule.routes(), studyModule.allowedMethods)

module.exports = router