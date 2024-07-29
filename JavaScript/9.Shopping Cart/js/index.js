const aGoods = {
  pic: ".",
  title: "椰云拿铁",
  desc: `1人份【年度重磅，一口吞云】
    ✔️原创椰云topping，绵密轻盈到飞起！
    原创瑞幸椰云™工艺，使用椰浆代替常规奶盖
    打造丰盈、绵密，如云朵般细腻奶沫体验
    椰香清甜饱满，一口滑入口腔
    【饮用建议】请注意不要用吸管，不要搅拌哦~`,
  sellNumber: 200,
  favorRate: 95,
  price: 32
}

class UIGoods {
  get totalPrice() {
    return this.choose * this.data.price
  }

  get isChoose() {
    return this.choose > 0
  }

  constructor(g) {
    g = { ...g }
    Object.freeze(g)
    Object.defineProperty(this, "data", {
      get() {
        return g
      },
      set() {
        throw new Error("data 属性是只读的，不能重新赋值")
      },
      configurable: false
    })

    let internalChooseValue = 0
    Object.defineProperty(this, "choose", {
      configurable: false,
      get() {
        return internalChooseValue
      },
      set(val) {
        if (typeof val !== "number") {
          throw new Error("choose 属性的值必须是数字")
        }
        const temp = parseInt(val)
        if (temp !== val) {
          throw new Error("choose 属性的值必须是整数")
        }
        if (val < 0) {
          throw new Error("choose 属性的值比如大于等于0")
        }
        internalChooseValue = val
      }
    })
    this.a = 1
    Object.seal(this)
  }
}

const g = new UIGoods(aGoods)
g.choose = 2
console.log(g.totalPrice)
