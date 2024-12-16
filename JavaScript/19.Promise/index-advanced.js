const PENDING = "pending"
const FULFILLED = "fulfilled"
const REJECTED = "rejected"

// 考虑queueMicrotask的兼容性问题以及各个环境运行的问题
function runMicrotasks(fn) {
  // 优先考虑queueMicrotask，当前运行环境是否支持
  if (typeof queueMicrotask === "function") {
    queueMicrotask(fn)
  }
  // node环境
  else if (
    typeof process === "object" &&
    typeof process.nextTick === "function"
  ) {
    process.nextTick(fn)
  }
  // 浏览器环境
  else if (typeof MutationObserver === "function") {
    const text = document.createTextNode("")
    const observer = new MutationObserver(fn)
    observer.observe(text, {
      characterData: true
    })
    text.data = "1"
  }
  // 最后考虑setTimeout
  else {
    setTimeout(fn)
  }
}

// 判断是否符合Promise A+规范
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

  catch(onRejected) {
    return this.then(null, onRejected)
  }

  finally(onFinally) {
    return this.then(
      res => {
        onFinally()
        return res
      },
      err => {
        onFinally()
        throw err
      }
    )
  }

  static resolve(value) {
    if (value instanceof Promise) return value
    return new Promise((resolve, reject) => {
      if (isPromiseLike(value)) {
        value.then(resolve, reject)
      } else {
        resolve(value)
      }
    })
  }

  static reject(reason) {
    return new Promise((_, reject) => reject(reason))
  }

  static try(cb, ...args) {
    return new Promise(resolve => {
      resolve(cb(...args))
    })
  }
}

/* ========================== 测试案例 ========================== */
// MyPromise.resolve(new Promise((resolve, reject) => reject(2))).then(
//   res => {
//     console.log(res)
//   },
//   err => {
//     console.log("error", err)
//   }
// )

// MyPromise.reject(1).then(undefined, err => {
//   console.log("error", err)
// })

function fn(a, b, c) {
  return a + b + c
}

MyPromise.try(fn, 1, 2, 3).then(
  res => {
    console.log(res)
  },
  err => {
    console.log("11111111111111error", err)
  }
)
