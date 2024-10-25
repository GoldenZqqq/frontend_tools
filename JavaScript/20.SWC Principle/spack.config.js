const { config } = require("@swc/core/spack")
const path = require("path")
// 必须是cjs 暂时没有支持esm
module.exports = config({
  entry: {
    web: path.join(__dirname, "./test.js") // 入口
  },
  output: {
    path: path.join(__dirname, "./dist"), // 输出目录
    name: "test.js"
  }
})
