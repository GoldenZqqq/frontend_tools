const PENDING = "pending"
const FULFILLED = "fulfilled"
const REJECTED = "rejected"

// 考虑queueMicrotask的兼容性问题以及各个环境运行的问题
function runMicrotasks(fn) {
  if (typeof queueMicrotask === "function") {
    queueMicrotask(fn)
  } else if (
    typeof process === "object" &&
    typeof process.nextTick === "function"
  ) {
    // node环境
    process.nextTick(fn)
  } else if (typeof MutationObserver === "function") {
    // 浏览器环境
    const text = document.createTextNode("")
    const observer = new MutationObserver(fn)
    observer.observe(text, {
      characterData: true
    })
    text.data = "1"
  } else {
    setTimeout(fn)
  }
}

function isPromiseLike(obj) {
  return typeof obj?.then === "function"
}

class MyPromise {
  #state = "pending"
  #value
  #handlers = []
  constructor(executor) {
    const resolve = val => {
      this.#setState(FULFILLED, val)
    }
    const reject = reason => {
      this.#setState(REJECTED, reason)
    }

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  #setState(state, value) {
    if (this.#state !== PENDING) return
    this.#value = value
    this.#state = state
    // 在这里执行
    this.#runTask()
  }

  #runTask() {
    // 将回调放入异步微任务队列
    runMicrotasks(() => {
      if (this.#state !== PENDING) {
        this.#handlers.forEach(cb => cb())
        this.#handlers = []
      }
    })
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#handlers.push(() => {
        try {
          const cb = this.#state === FULFILLED ? onFulfilled : onRejected
          const res = typeof cb === "function" ? cb(this.#value) : this.#value
          // 判断是否符合Promise A+规范的返回值
          if (isPromiseLike(res)) {
            res.then(resolve, reject)
          } else {
            resolve(res)
          }
        } catch (error) {
          reject(error)
        }
      })
      this.#runTask()
    })
  }
}

const p = new MyPromise((resolve, reject) => {
  reject(1)
})

;(async () => {
  try {
    const res = await p
    console.log("[ res ] >", res)
  } catch (error) {
    console.log('[ error ] >', error)
  }
})()
