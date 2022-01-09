const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const koaBody = require('koa-body')
const path = require('path')
const koaStatic = require('koa-static')
const jwtKoa = require('koa-jwt')
const secret = require('./config/secret.json')
const checkToken = require('./middleware/check-token')
const router = require('./routes/index')

// error handler
onerror(app)

//  处理跨域
app.use(cors())

// middlewares
app.use(checkToken)
// app.use(jwtKoa(secret).unless({
// 	path: [/^\/login/]
// }))
app.use(json())
app.use(logger())
app.use(koaStatic(path.join(__dirname, 'public')))
app.use(koaBody(
  	{
		multipart: true,
		formidable: {
			uploadDir: path.join(__dirname, 'public/uploads'),
			keepExtensions: true
		}
	}
))
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(router.routes(), router.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
