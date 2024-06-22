const card = document.querySelector(".card")
const yRange = [-15, 15] // y轴旋转范围

function getRotateDeg(range, value, length) {
  return (value / length) * (range[1] - range[0]) + range[0]
}

console.log("card", card)
card.onmousemove = e => {
  const { offsetX, offsetY } = e
  const { offsetWidth, offsetHeight } = card
  const ry = -getRotateDeg(yRange, offsetX, offsetWidth)
  const rx = getRotateDeg(yRange, offsetY, offsetHeight)
  card.style.setProperty("--rx", `${rx}deg`)
  card.style.setProperty("--ry", `${ry}deg`)
}

card.onmouseleave = () => {
  card.style.setProperty("--rx", "0deg")
  card.style.setProperty("--ry", "0deg")
}
