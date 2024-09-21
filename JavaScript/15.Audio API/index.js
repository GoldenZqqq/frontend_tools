const audioEle = document.querySelector("audio")
const cvs = document.querySelector("canvas")
const ctx = cvs.getContext("2d")

const img = new Image()
img.src = "../../CSS/assets/Crayon.jpeg"
let rotationAngle = 0 // 初始图片旋转角度
let isInit = false
let analyser, buffer
// 初始化canvas的尺寸
function initCvs() {
  const size = 500
  cvs.width = size * devicePixelRatio
  cvs.height = size * devicePixelRatio
  cvs.style.width = cvs.style.height = size + "px"
}
initCvs()

function draw(datas, maxValue) {
  const r = cvs.width / 4 + 20 * devicePixelRatio
  const center = cvs.width / 2
  ctx.clearRect(0, 0, cvs.width, cvs.height)

  const hslStep = 360 / (datas.length - 1)
  const maxLen = cvs.width / 2 - r
  const minLen = 2 * devicePixelRatio

  // 绘制图片
  if (img && img.complete) {
    const spacing = 10 // 定义间隙大小
    const imgRadius = r - spacing
    const imgWidth = imgRadius * 2
    const imgHeight = imgRadius * 2
    const imgX = center - imgRadius
    const imgY = center - imgRadius
    // 保存当前绘图状态
    ctx.save()
    // 创建一个圆形遮罩
    ctx.beginPath()
    ctx.arc(center, center, imgRadius, 0, 2 * Math.PI)
    ctx.clip()

    // 应用旋转
    ctx.translate(center, center)
    ctx.rotate(rotationAngle)
    ctx.translate(-center, -center)

    ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight)
    // 恢复绘图状态
    ctx.restore()
  }

  for (let i = 0; i < datas.length; i++) {
    ctx.beginPath()
    const len = Math.max((datas[i] / maxValue) * maxLen, minLen)
    const rotate = hslStep * i
    ctx.strokeStyle = `hsl(${rotate}deg, 65%, 65%)`
    ctx.lineWidth = minLen
    const rad = (rotate * Math.PI) / 180
    const beginX = center + Math.cos(rad) * r
    const beginY = center + Math.sin(rad) * r
    const endX = center + Math.cos(rad) * (r + len)
    const endY = center + Math.sin(rad) * (r + len)
    ctx.moveTo(beginX, beginY)
    ctx.lineTo(endX, endY)
    ctx.stroke()
  }
}

draw(new Array(256).fill(0), 255)

let rotationAngleInit = 0
let AnimationFrameId = null
function animate() {
  rotationAngle = rotationAngleInit + 0.001
  rotationAngleInit = rotationAngle
  // 请求下一帧
  AnimationFrameId = requestAnimationFrame(animate)
}

audioEle.onplay = () => {
  if (!isInit) {
    const audioCtx = new AudioContext()
    // 创建一个音频分析器节点
    analyser = audioCtx.createAnalyser()
    analyser.fftSize = 512
    buffer = new Uint8Array(analyser.frequencyBinCount)

    // 创建音频来源节点
    const source = audioCtx.createMediaElementSource(audioEle)
    source.connect(analyser)

    // 将音频源连接到音频上下文的目的地（即扬声器）
    analyser.connect(audioCtx.destination)
    isInit = true
  }

  // 启动动画，不论是否初始化，都应启动动画
  if (!AnimationFrameId) {
    animate()
  }
}

audioEle.onpause = () => {
  if (AnimationFrameId) {
    cancelAnimationFrame(AnimationFrameId)
    AnimationFrameId = null
  }
}

function update() {
  requestAnimationFrame(update)
  if (!isInit) return
  analyser.getByteFrequencyData(buffer)
  const offset = Math.floor((buffer.length * 2) / 3)
  const datas = new Array(offset * 2)
  for (let i = 0; i < offset; i++) {
    datas[i] = datas[datas.length - i - 1] = buffer[i]
  }
  draw(datas, 255)
}

update()
