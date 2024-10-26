const PENDING = "pending"
const FULFILLED = "fulfilled"
const REJECTED = "rejected"

class MyPromise {
  #state = "pending"
  #value
  constructor(executor) {
    const resolve = val => {
      this.#setState(FULFILLED, al)
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
  }
}

const p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    throw new Error("Error")
  })
})
console.log(p.state)
