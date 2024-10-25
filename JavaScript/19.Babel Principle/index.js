// https://astexplorer.net
import babel from "@babel/core"
import fs from "node:fs"
const code = fs.readFileSync("./test.js", "utf-8")
// () => function
// types 包含了各种ast的方法
const transformFunction = ({ types: t }) => {
  return {
    name: "transformFunction",
    visitor: {
      // 匹配
      ArrowFunctionExpression(path) {
        // 箭头函数转成普通function
        const node = path.node
        // 转换成普通的function
        // async params body
        const arrowFunction = t.functionExpression(
          null, // 匿名函数
          node.params,
          t.blockStatement([t.returnStatement(node.body)]),
          node.async
        )

        path.replaceWith(arrowFunction)
      }
    }
  }
}

const result = babel.transform(code, {
  plugins: [transformFunction]
})
console.log('[ result.code ] >', result.code)
