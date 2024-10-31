const ImmediatePriority = 1 // 立即执行的优先级，级别最高 [点击事件，输入框，]
const UserBlockingPriority = 2 // 用户阻塞的优先级 [滚动，拖拽这些]
const NormalPriority = 3 // 正常的优先级 [render 列表 动画 网络请求]
const LowPriority = 4 // 低优先级 [分析统计]
const IdlePriority = 5 // 最低的优先级，可以被闲置的那种 [console.log]

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
    channel.port1.onmessage = this.performWorkUntilDeadline
  }
  /**
   *
   * @param {*} priorityLevel 优先级
   * @param {*} callback 回调函数
   */
  scheduleCallback(priorityLevel, callback) {
    // 优先级高的先执行
    // callback
    this.schedulePerformWorkUntilDeadline()
  }
  schedulePerformWorkUntilDeadline() {
    this.port.postMessage(null) // 触发
  }

  performWorkUntilDeadline() {
    console.log(this, " dddddd")
  }

  workLoop() {

  }
}

const s = new SimpleScheduler()

// 可以被调用多次
// sort
s.scheduleCallback(ImmediatePriority, () => {
  console.log(2)
})

s.scheduleCallback(UserBlockingPriority, () => {
  console.log(1)
})
