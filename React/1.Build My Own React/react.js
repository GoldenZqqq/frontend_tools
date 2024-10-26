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

function reconcileChildren(fiber, elements) {
  // 1.形成fiber树
  // 2.diff算法
}

render(vdom, document.getElementById("root"))
