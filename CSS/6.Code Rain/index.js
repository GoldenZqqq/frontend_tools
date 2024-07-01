// 获取canvas元素
const cvs = document.getElementById("bg")
// 获取窗口尺寸
const width = window.innerWidth * devicePixelRatio,
  height = window.innerHeight * devicePixelRatio
// 设置canvas尺寸为窗口尺寸
cvs.width = width
cvs.height = height

// 获取绘制上下文
const ctx = cvs.getContext("2d")

// 字体大小
const fontSize = 20 * devicePixelRatio
// 列宽
const columnWidth = fontSize
// 列的数量
const columnCount = Math.floor(width / columnWidth)
// 每一列下一个文字是第几个文字
const nextChar = new Array(columnCount).fill(0)

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
  ctx.fillRect(0, 0, width, height)
  for (let i = 0; i < columnCount; i++) {
    // 文字、颜色、字体、字体大小、位置
    const char = getRandomChar()
    ctx.fillStyle = getRandomColor()
    ctx.font = `${fontSize}px "Roboto Mono"`
    const x = columnWidth * i
    const index = nextChar[i]
    const y = (index + 1) * fontSize
    ctx.fillText(char, x, y)
    if (y > height && Math.random() > 0.99) {
      nextChar[i] = 0
    } else {
      nextChar[i]++
    }
  }
}

// 随机颜色
function getRandomColor() {
  const letters = "0123456789ABCDEF"
  let color = "#"
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

// 随机文字
function getRandomChar() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  return characters[Math.floor(Math.random() * characters.length)]
}

draw()

setInterval(draw, 40)
