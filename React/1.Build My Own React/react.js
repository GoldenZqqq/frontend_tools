// jsx -> babel/swc -> React.createElement -> vdom
const React = {
  createElement(type, props, ...children) {
    return {
      type,
      props: {
        ...props,
        children: children.map(child => {
          if (typeof child === "object") {
            return child
          } else {
            return React.createTextElement(child)
          }
        })
      }
    }
  },
  createTextElement(text) {
    return {
      type: "TEXT_ELEMENT",
      props: {
        nodeValue: text,
        children: []
      }
    }
  }
}

const vdom = React.createElement(
  "div",
  { id: 1 },
  React.createElement("span", null, "hzqnb")
)

// ================ 完成虚拟DOM转fiber结构和时间切片 ================
let nextUnitOfWork = null // 下一个工作单元
let wipRoot = null // 当前正在工作的fiber树
let currentRoot = null // 旧的fiber树
let deletions = null // 存储需要删除的fiber节点 deletions[D] {A,B,C,D} {A,B,C}

function render(element, container) {
  // 初始化fiber结构
  wipRoot = {
    dom: container,
    props: {
      children: [element]
    },
    alternate: currentRoot // 旧的fiber树
  }
  deletions = []
  nextUnitOfWork = wipRoot
}

function createDom(fiber) {
  const dom =
    fiber.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type)
  updateDom(dom, {}, fiber.props) // 挂载新属性
  return dom
}

function updateDom(dom, prevProps, nextProps) {
  // 旧的属性要删除
  Object.keys(prevProps)
    .filter(key => key !== "children")
    .filter(key => !(key in nextProps))
    .forEach(key => (dom[key] = ""))
  // 新的属性要添加
  Object.keys(nextProps)
    .filter(key => key !== "children")
    .forEach(key => {
      if (prevProps[key] !== nextProps[key]) {
        dom[key] = nextProps[key]
      }
    })
}

function workLoop(deadline) {
  let shouldYield = false
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldYield = deadline.timeRemaining() < 1
  }
  // !nextUnitOfWork表示所有的任务都已经执行完成了 并且wipRoot表示还有待提交的工作根
  if (!nextUnitOfWork && wipRoot) {
    commitRoot()
  }
  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)

/**
 * 完成虚拟DOM转fiber结构和时间切片，接收一个工作单元，返回下一个工作单元
 * @param {object} fiber
 */
function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }
  const elements = fiber.props.children
  // 遍历子节点
  reconcileChildren(fiber, elements)

  if (fiber.child) {
    return fiber.child
  }
  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) {
      // 返回兄弟节点
      return nextFiber.sibling
    }
    // 如果没有兄弟节点，返回父级 向上查找
    nextFiber = nextFiber.parent
  }
  return null
}

function createFiber(element, parent) {
  return {
    type: element.type,
    props: element.props,
    parent,
    dom: null,
    child: null,
    sibling: null,
    alternate: null,
    effectTag: null
  }
}

function reconcileChildren(fiber, elements) {
  // 1.形成fiber树
  // 2.diff算法
  let index = 0
  let prevSibling = null
  let oldFiber = fiber.alternate && fiber.alternate.child // 旧的fiber树
  while (index < elements.length || oldFiber !== null) {
    const element = elements[index]
    // 1.复用
    let newFiber = null
    const sameType = oldFiber && element && element.type === oldFiber.type
    if (sameType) {
      console.log("复用", element)
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        parent: fiber,
        dom: oldFiber.dom,
        alternate: oldFiber,
        effectTag: "UPDATE" // 更新
      }
    }
    // 2.新增
    if (element && !sameType) {
      console.log("新增", element)
      newFiber = createFiber(element, fiber)
      newFiber.effectTag = "PLACEMENT" // 新增
    }
    // 3.删除
    if (oldFiber && !sameType) {
      console.log("删除", oldFiber)
      oldFiber.effectTag = "DELETION" // 删除
      deletions.push(oldFiber)
    }
    if (oldFiber) oldFiber = oldFiber.sibling

    if (index === 0) {
      fiber.child = newFiber
    } else if (element) {
      prevSibling.sibling = newFiber
    }
    prevSibling = newFiber
    index++
  }
}

// 提交根节点
function commitRoot() {
  // 遍历所有的删除操作
  deletions.forEach(commitWork)
  // 提交当前根节点的子节点
  commitWork(wipRoot.child)
  currentRoot = wipRoot // 存储旧的fiber树
  wipRoot = null // 因为把所有的变化都操作完成了回归原始
}

// 递归函数，用于提交工作，将fiber节点对应的DOM节点插入到父节点中
function commitWork(fiber) {
  if (!fiber) {
    return
  }
  const domParent = fiber.parent.dom
  if (fiber.effectTag === "PLACEMENT" && fiber.dom !== null) {
    domParent.appendChild(fiber.dom)
  } else if (fiber.effectTag === "UPDATE" && fiber.dom !== null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props)
  } else if (fiber.effectTag === "DELETION" && fiber.dom !== null) {
    domParent.removeChild(fiber.dom)
  }

  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

// 测试用例
render(
  React.createElement(
    "div",
    { id: "a" },
    React.createElement("span", null, "hzqnb")
  ),
  document.getElementById("root")
)
setTimeout(() => {
  render(
    React.createElement(
      "div",
      { id: "a" },
      React.createElement("p", null, "新元素")
    ),
    document.getElementById("root")
  )
}, 2000)
