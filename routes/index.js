const router = require('koa-router')();
const login = require('./login');
const upload = require('./upload');
const modules = require('./modules');
const question = require('./question');
const answer = require('./answer');

router.get('/', (ctx, next) => {
    console.log(ctx.query);
    ctx.body = '这是一个请求';
});

router.use('/login', login.routes(), login.allowedMethods);
router.use('/upload', upload.routes(), upload.allowedMethods);
router.use('/modules', modules.routes(), modules.allowedMethods);
router.use('/question', question.routes(), question.allowedMethods);
router.use('/answer', answer.routes(), answer.allowedMethods);

module.exports = router;
