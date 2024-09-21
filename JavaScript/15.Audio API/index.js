const audioEle = document.querySelector("audio")
const cvs = document.querySelector("canvas")
const ctx = cvs.getContext("2d")

// 初始化canvas的尺寸
function initCvs() {
  const size = 500
  cvs.width = size * devicePixelRatio
  cvs.height = size * devicePixelRatio
  cvs.style.width = cvs.style.height = size + "px"
}
initCvs()

function draw(datas, maxValue) {
  ctx.clearRect(0, 0, cvs.width, cvs.height) // 清除之前的绘制

  // 绘制音频波形
  const sliceWidth = (cvs.width * 1.0) / datas.length
  let x = 0
  for (let i = 0; i < datas.length; i++) {
    const v = ((datas[i] / maxValue) * cvs.height) / 2 // 归一化到canvas的高度
    if (i === 0) {
      ctx.beginPath()
      ctx.moveTo(x, cvs.height / 2)
    }
    ctx.lineTo(x, cvs.height / 2 - v)
    ctx.lineTo(x + sliceWidth, cvs.height / 2 - v)
    ctx.lineTo(x + sliceWidth, cvs.height / 2)
    ctx.closePath()
    ctx.fillStyle = "#09c"
    ctx.fill()
    x += sliceWidth
  }
}
// draw(
//   new Array(100).fill(0).map(() => Math.random() * 255),
//   255
// )

let isInit = false
audioEle.onplay = function () {
  if(isInit){
    return 
  }
  const audioCtx = new AudioContext()
  // 创建一个音频分析器节点
  const analyser = audioCtx.createAnalyser()
}
