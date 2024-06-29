const container = document.querySelector(".container")
const rect = container.getBoundingClientRect()
const theta = Math.atan2(rect.height, rect.width)

container.onmouseenter = e => {
  const w = e.offsetX - rect.width / 2
  const h = rect.height / 2 - e.offsetY
  const angle = Math.atan2(h, w)
  if (angle < theta && angle >= -theta) {
    container.classList.add("right")
  } else if (angle < -theta && angle >= -Math.PI + theta) {
    container.classList.add("bottom")
  } else if (angle < Math.PI - theta && angle >= theta) {
    container.classList.add("top")
  } else {
    container.classList.add("left")
  }
}

container.onmouseleave = () => {
  container.classList = "container"
}
