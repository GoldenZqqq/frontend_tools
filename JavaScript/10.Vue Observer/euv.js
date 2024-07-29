/**
 * 观察某个对象的所有属性
 * @param {Object} obj
 */
function observe(obj) {
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      let internalValue = obj[key]
      let funcs = new Set() // 避免出现重复函数
      Object.defineProperty(obj, key, {
        get() {
          // 依赖收集，记录：是哪个函数在用我
          funcs.add(window.__func)
          return internalValue
        },
        set(val) {
          internalValue = val
          // 派发更新，运行：执行用我的函数
          for (let fn of funcs) {
            if (!fn) continue
            fn()
          }
        }
      })
    }
  }
}

function autorun(fn) {
  window.__func = fn
  fn()
  window.__func = null
}
