// 底层开发的技巧 将Promise/非Promise函数都转成Promise
const promise = Promise.resolve()

class TaskScheduler {
  constructor(maxNum = 2) {
    this.tasks = []
    this.maxNum = maxNum
    this.runningNum = 0
  }

  run() {
    if (this.runningNum >= this.maxNum || this.tasks.length <= 0) return
    this.runningNum++
    const task = this.tasks.shift()
    task().finally(() => {
      this.runningNum--
      this.run()
    })
  }

  addTask(task) {
    return new Promise((...args) => {
      this.tasks.push(() => promise.then(task).then(...args))
      this.run()
    })
  }
}

const scheduler = new TaskScheduler()

function promiseTimeout(time, label) {
  console.time(label)
  return () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, time)
    }).then(() => {
      console.timeEnd(label)
    })
}

// 业务场景：商品列表中，点击商品会进入详情页，为了实现详情页秒开，在用户点击前要预请求商品信息，假设有100个商品条目，如果同时发起100个请求，可能会将带宽打满，部分设备可能还会有请求的限制，这样会阻塞原本页面的请他正常请求，因此我们需要实现一个任务调度器，确保同时最多只有2个任务在执行。

// 完成 TaskScheduler 类，使得以下代码能够正常工作

// 一秒钟后输出 商品1
scheduler.addTask(promiseTimeout(1000, "商品1"))

// 两秒钟后输出 商品2
scheduler.addTask(promiseTimeout(2000, "商品2"))

// 四秒钟后输出 商品3
scheduler.addTask(promiseTimeout(3000, "商品3"))

// 六秒钟后输出 商品4
scheduler.addTask(promiseTimeout(4000, "商品4"))
