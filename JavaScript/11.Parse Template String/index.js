const obj = {
  name: "西瓜皮儿",
  age: 18,
  books: ["js红宝书", "js蝴蝶书", { sche: "js蓝宝书" }],
  parent: {
    father: "西瓜",
    mather: "农民伯伯",
    son: ["西瓜儿子", "农民儿子"]
  }
}

const str =
  "我叫${name},我喜欢看${books[1]},我爸是${parent.father},还喜欢${books[2].sche}, 我儿子是${parent.son[0]}"

function template(obj, str) {
  return str.replace(/\$\{([^}]+)\}/g, (_, key) =>
    key
      .split(/[\.\[\]]+/)
      .filter(k => k !== "")
      .reduce((o, k) => o[k], obj)
  )
}
console.log(template(obj, str)) // 我叫西瓜皮儿,我喜欢看js蝴蝶书,我爸是西瓜
