const Koa = require("koa")
const Router = require("koa-router")
const app = new Koa()
const router = new Router()

// 提供静态文件
const server = require("koa-static")
const path = require("path")
app.use(server(path.join(__dirname, ".")))

const { PassThrough } = require("stream")

router.get("/sse", async ctx => {
  // 设置正确的 Content-Type
  ctx.set("Content-Type", "text/event-stream")
  ctx.set("Connection", "keep-alive")
  ctx.status = 200

  let content = Array.from(
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem voluptates non officiis reiciendis temporibus voluptas voluptatibus nemo, omnis illo, nesciunt cumque delectus alias aspernatur consequuntur sapiente minus expedita accusamus dolorem!"
  )
  const stream = new PassThrough()

  // 向客户端发送数据
  const sendEvent = data => {
    stream.write(`data: ${JSON.stringify(data)}\n\n`)
  }

  // 模拟定时推送消息
  const intervalId = setInterval(() => {
    if (content.length <= 0) {
      clearInterval(intervalId)
      ctx.res.end()
      return
    }
    sendEvent({
      message: (() => {
        let str = ""
        for (
          let i = 0;
          i < Math.min(content.length, Math.ceil(Math.random() * 5));
          i++
        ) {
          str += content.shift()
        }
        return str
      })()
    })
  }, 50)

  // 监听连接关闭事件，清除定时器
  ctx.req.on("close", () => {
    clearInterval(intervalId)
    ctx.res.end()
  })

  ctx.body = stream
})

app.use(router.routes()).use(router.allowedMethods())

const port = 3000
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
