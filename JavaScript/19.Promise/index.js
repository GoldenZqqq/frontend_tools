const PENDING = "pending"
const FULFILLED = "fulfilled"
const REJECTED = "rejected"

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
    if (this.#state !== PENDING) {
      this.#handlers.forEach(cb => cb())
      this.#handlers = []
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#handlers.push(() => {
        try {
          const cb = this.#state === FULFILLED ? onFulfilled : onRejected
          const res = typeof cb === "function" ? cb(this.#value) : this.#value
          resolve(res)
        } catch (error) {
          reject(error)
        }
      })
      this.#runTask()
    })
  }
}

const p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
    // reject(2)
  }, 1000)
})

p.then(null, err => {
  console.log("[ err ] >", err)
}).then(res => {
  console.log("[ 第二个then ] >", res)
})
