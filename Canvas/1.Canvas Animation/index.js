const cvs = document.querySelector("canvas")
const ctx = cvs.getContext("2d")

function init() {
  cvs.width = window.innerWidth * devicePixelRatio
  cvs.height = window.innerHeight * devicePixelRatio
}

init()

/**
 * 获取 { min, max } 范围内的随机整数
 * @return {Number}
 */
function getRandom(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min)
}

class Point {
  constructor() {
    this.r = 6
    this.x = getRandom(0, cvs.width - this.r / 2)
    this.y = getRandom(0, cvs.height - this.r / 2)
    this.xSpeed = getRandom(-50, 50)
    this.ySpeed = getRandom(-50, 50)
    this.lastDrawTime = null
  }

  draw() {
    // 更新坐标
    if (this.lastDrawTime) {
      // 计算新的坐标
      const duration = (Date.now() - this.lastDrawTime) / 1000
      // 距离
      const xDis = this.xSpeed * duration,
        yDis = this.ySpeed * duration
      // 新的坐标
      let x = this.x + xDis,
        y = this.y + yDis
      // 考虑边界
      if (x > cvs.width - this.r / 2) {
        x = cvs.width - this.r / 2
        this.xSpeed = -this.xSpeed
      } else if (x < 0) {
        x = 0
        this.xSpeed = -this.xSpeed
      }
      if (y > cvs.height - this.r / 2) {
        y = cvs.height - this.r / 2
        this.ySpeed = -this.ySpeed
      } else if (y < 0) {
        y = 0
        this.ySpeed = -this.ySpeed
      }
      this.x = x
      this.y = y
    }
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
    ctx.fillStyle = "rgb(200, 200, 200)"
    ctx.fill()
    this.lastDrawTime = Date.now()
  }
}

class Graph {
  constructor(pointNumber = 30, maxDis = 500) {
    this.points = new Array(pointNumber).fill(0).map(() => new Point())
    this.maxDis = maxDis
  }

  draw() {
    requestAnimationFrame(() => {
      this.draw()
    })
    ctx.clearRect(0, 0, cvs.width, cvs.height)
    for (let i = 0; i < this.points.length; i++) {
      const p1 = this.points[i]
      p1.draw()
      for (let j = i + 1; j < this.points.length; j++) {
        const p2 = this.points[j]
        const d = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
        if (d > this.maxDis) continue
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.closePath()
        ctx.strokeStyle = `rgba(200, 200, 200, ${1 - d / this.maxDis})`
        ctx.stroke()
      }
    }
  }
}

const g = new Graph()
g.draw()

// ctx.beginPath()
// ctx.moveTo(100, 50)
// ctx.lineTo(200, 100)
// ctx.closePath()
// // ctx.fillStyle = "#fff"
// // ctx.fill()
// ctx.strokeStyle = "#fff"
// ctx.stroke()

// const p1 = new Point()
// const p2 = new Point()
// p1.draw()
// p2.draw()
