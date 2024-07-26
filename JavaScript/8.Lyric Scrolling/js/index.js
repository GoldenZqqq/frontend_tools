/**
 * 解析歌词字符串
 * 得到一个歌词对象的数组
 * 每个歌词对象：
 * { time: 开始时间, words: 歌词内容 }
 */
function parseLrc() {
  const lines = lyric.split("\n")
  const result = [] // 歌词对象数组
  for (let i = 0; i < lines.length; i++) {
    const str = lines[i]
    const parts = str.split("]")
    const timeStr = parts[0].replace("[", "")
    const obj = {
      time: parseTime(timeStr),
      words: parts[1]
    }
    result.push(obj)
  }
  return result
}

/**
 * 将一个时间字符串解析为数字
 * @param {*} timeStr 时间字符串
 * @returns
 */
function parseTime(timeStr) {
  const parts = timeStr.split(":")
  return +parts[0] * 60 + +parts[1]
}

const lrcData = parseLrc()

// 获取需要的dom
const doms = {
  audio: document.querySelector("audio"),
  ul: document.querySelector(".container ul"),
  container: document.querySelector(".container")
}

/**
 * 计算出，在当前播放器播放到第几秒的情况下
 * lrcData数组中，应该高亮显示的歌词下标
 * 如果没有任何一句歌词需要显示，则得到-1
 */
function findIndex() {
  // 播放器当前时间
  const curTime = doms.audio.currentTime
  for (let i = 0; i < lrcData.length; i++) {
    if (curTime < lrcData[i].time) {
      return i - 1
    }
  }
  // 找遍了都没找到（说明播放到最后一句）
  return lrcData.length - 1
}

// 界面
/**
 * 创建歌词列表元素
 */
function createLrcElements() {
  const frag = document.createDocumentFragment() // 文档片段
  for (let i = 0; i < lrcData.length; i++) {
    const li = document.createElement("li")
    li.textContent = lrcData[i].words
    frag.appendChild(li)
  }
  doms.ul.appendChild(frag)
}
createLrcElements()

const containerHeight = doms.container.clientHeight
// 每个 li 的高度
const liHeight = doms.ul.children[0].clientHeight
// 最大偏移量
const maxOffset = doms.ul.clientHeight - containerHeight
/**
 * 设置 ul 元素的偏移量
 */
function setOffset() {
  const index = findIndex()
  let offset = liHeight * index + liHeight / 2 - containerHeight / 2
  if (offset < 0) {
    offset = 0
  }
  if (offset > maxOffset) {
    offset = maxOffset
  }
  doms.ul.style.transform = `translateY(-${offset}px)`
  // 去掉之前的 active 样式
  let li = doms.ul.querySelector(".active")
  if (li) {
    li.classList.remove("active")
  }

  li = doms.ul.children[index]
  if (li) {
    li.classList.add("active")
  }
}

doms.audio.addEventListener("timeupdate", setOffset)
