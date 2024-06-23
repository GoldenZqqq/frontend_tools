const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

canvas.width = 1920 * devicePixelRatio
canvas.height = 1080 * devicePixelRatio

ctx.translate(canvas.width / 2, canvas.height)
ctx.scale(1, -1)

drawBranch([0, 0], 300, 30, 90)

function drawBranch(v0, len, thick, angle) {
  if (thick < 10 && Math.random() < 0.3) return
  if (thick < 2) {
    ctx.beginPath()
    ctx.arc(...v0, 10, 0, 2 * Math.PI)
    ctx.fillStyle = "#fff"
    ctx.fill()
    return
  }
  ctx.beginPath()
  ctx.moveTo(...v0)
  const v1 = [
    v0[0] + Math.cos((angle * Math.PI) / 180) * len,
    v0[1] + Math.sin((angle * Math.PI) / 180) * len
  ]
  ctx.lineTo(...v1)
  ctx.strokeStyle = "#333"
  ctx.lineWidth = thick
  ctx.lineCap = "round"
  ctx.stroke()

  // 左分支
  drawBranch(v1, len * 0.8, thick * 0.8, angle + Math.random() * 30)

  // 右分支
  drawBranch(v1, len * 0.8, thick * 0.8, angle - Math.random() * 30)
}
