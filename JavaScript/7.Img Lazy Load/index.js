const observer = new IntersectionObserver(
  entries => {
    console.log("交叉了")
    console.log(entries)
    // 当产生交叉时，把img的data-src赋值给src，就让真实的图片显示了，然后再通过observer实例提供的unobserve方法，取消对该元素的观察
    for (const entrie of entries) {
      if (entrie.isIntersecting) {
        const img = entrie.target
        img.src = img.dataset.src
        observer.unobserve(img)
      }
    }
  },
  // root: 表示要观察的目标元素（我们这里是img），与哪个父元素产生交叉，不传或者传null，就表示根元素，即浏览器的视口。
  // rootMargin: 表示root元素的偏移量，怎么理解呢，正常是目标元素与root元素本身所在的位置交叉时触发回调函数，rootMargin可以改变与root元素交叉时的位置。
  // threshold：是一个0~1之间的值，表示一个触发的阈值，如果是0，只要目标元素一碰到root元素，就会触发，如果是1，表示目标元素完全进入root元素范围，才会触发。
  {
    root: null,
    rootMargin: "0px 0px 0px 0px",
    threshold: 0.1
  }
)

// 获取所有图片元素
const imgs = document.querySelectorAll("img")
// 遍历这些元素
imgs.forEach(img => {
  // 用observe方法观察这些元素
  observer.observe(img)
})
