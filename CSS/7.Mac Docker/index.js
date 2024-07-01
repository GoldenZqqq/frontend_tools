let items = document.getElementsByClassName("item")
for (let i = 0; i < items.length; i++) {
  items[i].onmouseover = function () {
    if (i == 0) {
      items[i].style = "--scale:1.9"
      items[i + 1].style = "--scale:1.6"
      items[i + 2].style = "--scale:1.3"
      for (let j = 0; j < items.length; j++) {
        if (j != i && j != i + 1 && j != i + 2) {
          items[j].style = "--scale:1"
        }
      }
    } else if (i == 1) {
      items[i - 1].style = "--scale:1.6"
      items[i].style = "--scale:1.9"
      items[i + 1].style = "--scale:1.6"
      items[i + 2].style = "--scale:1.3"
      for (let j = 0; j < items.length; j++) {
        if (j != i - 1 && j != i && j != i + 1 && j != i + 2) {
          items[j].style = "--scale:1"
        }
      }
    } else if (i == items.length - 1) {
      items[i - 2].style = "--scale:1.3"
      items[i - 1].style = "--scale:1.6"
      items[i].style = "--scale:1.9"
      for (let j = 0; j < items.length; j++) {
        if (j != i && j != i - 1 && j != i - 2) {
          items[j].style = "--scale:1"
        }
      }
    } else if (i == items.length - 2) {
      items[i - 2].style = "--scale:1.3"
      items[i - 1].style = "--scale:1.6"
      items[i].style = "--scale:1.9"
      items[i + 1].style = "--scale:1.6"
      for (let j = 0; j < items.length; j++) {
        if (j != i - 2 && j != i - 1 && j != i && j != i + 1) {
          items[j].style = "--scale:1"
        }
      }
    } else {
      items[i - 2].style = "--scale:1.3"
      items[i - 1].style = "--scale:1.6"
      items[i].style = "--scale:1.9"
      items[i + 1].style = "--scale:1.6"
      items[i + 2].style = "--scale:1.3"
      for (let j = 0; j < items.length; j++) {
        if (j != i - 2 && j != i - 1 && j != i && j != i + 1 && j != i + 2) {
          items[j].style = "--scale:1"
        }
      }
    }
  }
}

let container = document.getElementById("container")
container.onmouseleave = function () {
  for (let h = 0; h < items.length; h++) {
    items[h].style = "--scale:1"
  }
}
