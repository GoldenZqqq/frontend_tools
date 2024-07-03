function arrange(name) {
  const tasks = []
  tasks.push(() => {
    console.log(`${name} is notified`)
  })
  function wait(time) {
    tasks.push(
      () =>
        new Promise(resolve => {
          setTimeout(resolve, time * 1000)
        })
    )
    return this
  }
  function doSomething(action) {
    tasks.push(() => {
      console.log(`Start to ${action}`)
    })
    return this
  }
  function waitFirst(time) {
    tasks.unshift(
      () =>
        new Promise(resolve => {
          setTimeout(resolve, time * 1000)
        })
    )
    return this
  }
  function execute() {
    ;(async () => {
      for (const task of tasks) {
        await task()
      }
    })()
    return this
  }
  return {
    wait,
    do: doSomething,
    waitFirst,
    execute
  }
}

arrange("William").wait(5).do("commit").waitFirst(3).execute()
// 等待3秒
// > William is notified
// 等待5秒
// > Start to commit
