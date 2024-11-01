const ImmediatePriority = 1 // 立即执行的优先级，级别最高 [点击事件，输入框，]
const UserBlockingPriority = 2 // 用户阻塞的优先级 [滚动，拖拽这些]
const NormalPriority = 3 // 正常的优先级 [render 列表 动画 网络请求]
const LowPriority = 4 // 低优先级 [分析统计]
const IdlePriority = 5 // 最低的优先级，可以被闲置的那种 [console.log]

function getCurrentTime() {
  return performance.now()
}

class SimpleScheduler {
  constructor() {
    /**
     * {
     *    callback
     *    priorityLevel
     *    expirationTime
     * }
     */
    this.taskQueue = []
    this.isPerformingWork = false // 是否正在工作，防止重复调度
    const channel = new MessageChannel()
    this.port = channel.port2 // 发消息
    channel.port1.onmessage = this.performWorkUntilDeadline.bind(this)
  }
  /**
   *
   * @param {*} priorityLevel 优先级
   * @param {*} callback 回调函数
   */
  scheduleCallback(priorityLevel, callback) {
    const curTime = getCurrentTime()
    let timeout
    // 根据优先级设置超时时间
    // 超时时间越小，优先级越高
    switch (priorityLevel) {
      case ImmediatePriority:
        timeout = -1
        break
      case UserBlockingPriority:
        timeout = 250
        break
      case LowPriority:
        timeout = 10000
        break
      case IdlePriority:
        timeout = 1073741823 // Number.MAX_SAFE_INTEGER: 32位操作系统V8引擎所对应的最大时间
        break
      case NormalPriority:
      default:
        timeout = 5000
        break
    }
    const task = {
      callback,
      priorityLevel,
      expirationTime: curTime + timeout
    }
    this.push(this.taskQueue, task)
    this.schedulePerformWorkUntilDeadline()
  }
  schedulePerformWorkUntilDeadline() {
    if (!this.isPerformingWork) {
      this.isPerformingWork = true
      this.port.postMessage(null) // 触发
    }
  }

  performWorkUntilDeadline() {
    this.isPerformingWork = true // 加锁
    this.workLoop()
    this.isPerformingWork = false // 解锁
  }

  workLoop() {
    // 执行任务
    let currentTask = this.peek(this.taskQueue) // 取出第一个任务
    while (currentTask) {
      let { callback } = currentTask
      callback && callback()
      this.pop(this.taskQueue) // 执行完任务后，从队列中移除
      currentTask = this.peek(this.taskQueue) // 取出下一个任务
    }
  }

  push(queue, task) {
    queue.push(task)
    queue.sort((a, b) => a.expirationTime - b.expirationTime) // 按照超时时间升序排列
  }

  peek(queue) {
    return queue[0] || null
  }

  pop(queue) {
    return queue.shift()
  }
}

const s = new SimpleScheduler()

// 可以被调用多次
// sort
s.scheduleCallback(UserBlockingPriority, () => {
  console.log(2)
})

s.scheduleCallback(ImmediatePriority, () => {
  console.log(1)
})
s.scheduleCallback(NormalPriority, () => {
  console.log(3)
})
