// ==UserScript==
// @name         coinReverse
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  coinReverse
// @author       GoldenZqqq
// @include        *://*.icbc.com.cn/*
// @include        *://*.ccb.com/*
// @include        *://*.bankcomm.com/*
// @include        *://*.hxb.com.cn/*
// @include        *://*.spdb.com.cn/*
// @include        *://*.psbc.com/*
// @include        *://*.abchina.com/*
// @include        *://*.boc.cn/*
// @include        *://*.szbk.com/*
// @include        *://*.hxb.com.cn/*
// @include        *://*.csbbank.com/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @license      MIT
// ==/UserScript==

;(function () {
  "use strict"

  // 页面加载完成后执行
  window.addEventListener("load", () => {
    // 创建表单容器
    const container = document.createElement("div")
    container.style.position = "fixed"
    container.style.top = "50%"
    container.style.right = "0"
    container.style.transform = "translateY(-50%)"
    container.style.width = "350px"
    container.style.maxHeight = "90%"
    container.style.overflowY = "auto"
    container.style.padding = "5px"
    container.style.background = "rgba(249, 249, 249, .8)"
    container.style.border = "1px solid #ddd"
    container.style.borderRadius = "10px"
    container.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)"
    container.style.zIndex = "9999"
    container.id = "formContainer"

    // 增加顶部内边距，避免按钮遮挡卡片
    container.style.paddingTop = "50px" // 给顶部留出空间

    // 创建提示框
    const notification = document.createElement("div")
    notification.style.position = "fixed"
    notification.style.top = "10%" // 靠近页面顶部显示
    notification.style.left = "50%"
    notification.style.transform = "translateX(-50%)"
    notification.style.minWidth = "300px"
    notification.style.padding = "10px"
    notification.style.background = "#4caf50"
    notification.style.color = "#fff"
    notification.style.borderRadius = "5px"
    notification.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
    notification.style.fontSize = "14px"
    notification.style.textAlign = "center"
    notification.style.opacity = "0"
    notification.style.transition = "opacity 0.3s ease"
    document.body.appendChild(notification)

    // 显示提示信息
    function showNotification(message, type = "success") {
      notification.innerText = message
      notification.style.background = type === "success" ? "#4caf50" : "#f44336"
      notification.style.opacity = "1"
      setTimeout(() => {
        notification.style.opacity = "0"
      }, 2000) // 提示2秒后消失
    }

    // 存储表单数据
    const data = []

    // 验证手机号
    function validateMobile(mobile) {
      return /^1[3-9]\d{9}$/.test(mobile)
    }

    // 验证身份证号
    function validateIDCard(idCard) {
      return /^\d{15}$|^\d{17}[0-9Xx]$/.test(idCard)
    }

    // 创建单个表单（卡片样式）
    function createForm(entry = { name: "", mobile: "", idCard: "" }, index) {
      const card = document.createElement("div")
      card.style.marginBottom = "10px"
      card.style.border = "1px solid #ddd"
      card.style.borderRadius = "8px"
      card.style.padding = "10px 40px 0px 10px"
      card.style.background = "rgba(249, 249, 249, .4)"
      card.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.1)"
      card.style.position = "relative"

      // 删除按钮放到右上角
      const deleteButton = document.createElement("button")
      deleteButton.innerText = "X"
      deleteButton.style.position = "absolute"
      deleteButton.style.top = "5px"
      deleteButton.style.right = "5px"
      deleteButton.style.padding = "5px 8px"
      deleteButton.style.background = "#dc3545"
      deleteButton.style.color = "#fff"
      deleteButton.style.border = "none"
      deleteButton.style.borderRadius = "50%"
      deleteButton.style.cursor = "pointer"
      deleteButton.style.fontSize = "14px"

      deleteButton.addEventListener("click", () => {
        data.splice(index, 1) // 删除对应数据
        card.remove() // 删除表单
        showNotification("表单已删除！")
        saveData() // 删除后更新保存数据
      })

      const fields = ["name", "idCard", "mobile"]
      const labels = ["姓名", "身份证号", "手机号"]

      fields.forEach((field, idx) => {
        const row = document.createElement("div")
        row.style.display = "flex"
        row.style.alignItems = "center"
        row.style.marginBottom = "8px"

        const label = document.createElement("label")
        label.innerText = `${labels[idx]}：`
        label.style.width = "80px"
        label.style.fontSize = "12px"

        const input = document.createElement("input")
        input.type = "text"
        input.value = entry[field]
        input.style.flex = "1"
        input.style.padding = "4px"
        input.style.border = "1px solid #ccc"
        input.style.borderRadius = "4px"
        input.style.marginRight = "10px"
        input.style.fontSize = "12px"
        input.style.maxWidth = "100%"

        input.addEventListener("blur", () => {
          let valid = true

          if (field === "mobile" && !validateMobile(input.value)) {
            showNotification("手机号格式不正确！", "error")
            input.value = ""
            valid = false
          }
          if (field === "idCard" && !validateIDCard(input.value)) {
            showNotification("身份证号格式不正确！", "error")
            input.value = ""
            valid = false
          }

          if (valid) {
            entry[field] = input.value
            showNotification("数据已保存！")
          } else {
            entry[field] = ""
          }

          saveData()
        })

        const copyButton = document.createElement("button")
        copyButton.innerText = "复制"
        copyButton.style.marginLeft = "8px"
        copyButton.style.padding = "4px 8px"
        copyButton.style.background = "#007bff"
        copyButton.style.color = "#fff"
        copyButton.style.border = "none"
        copyButton.style.borderRadius = "5px"
        copyButton.style.cursor = "pointer"
        copyButton.style.fontSize = "12px"

        copyButton.addEventListener("click", () => {
          const inputValue = input.value
          navigator.clipboard
            .writeText(inputValue)
            .then(() => {
              const name = entry.name || "姓名"
              let message = `${name} 已复制`
              if (field === "idCard") {
                message = `${name} 身份证已复制`
              } else if (field === "mobile") {
                message = `${name} 手机号已复制`
              }
              showNotification(message)
            })
            .catch(() => showNotification("复制失败！", "error"))
        })

        row.appendChild(label)
        row.appendChild(input)
        row.appendChild(copyButton)
        card.appendChild(row)

        input.addEventListener("input", () => {
          entry[field] = input.value
        })
      })

      // 添加自动填充按钮
      const autoFillButton = document.createElement("button")
      autoFillButton.innerText = "自动填充"
      autoFillButton.style.width = "100%"
      autoFillButton.style.padding = "8px"
      autoFillButton.style.marginBottom = "10px"
      autoFillButton.style.background = "#28a745"
      autoFillButton.style.color = "#fff"
      autoFillButton.style.border = "none"
      autoFillButton.style.borderRadius = "5px"
      autoFillButton.style.cursor = "pointer"
      autoFillButton.style.fontSize = "12px"

      autoFillButton.addEventListener("click", () => {
        // 通用选择器策略
        const selectors = {
          "abchina.com": {
            name: 'input[name="name"][ng-model="appointInfo.name"]',
            idCard: 'input[name="identNo"][ng-model="appointInfo.identNo"]',
            mobile: 'input[name="mobile"][ng-model="appointInfo.mobile"]'
          },
          "icbc.com.cn": {
            name: 'input[placeholder*="姓名"],input[name*="name"],input[id*="name"]',
            idCard:
              'input[placeholder*="证件"],input[name*="idCard"],input[id*="idCard"]',
            mobile:
              'input[type="tel"],input[placeholder*="手机"],input[name*="mobile"]'
          },
          "ccb.com": {
            name: 'input[placeholder*="姓名"],input[name*="userName"]',
            idCard: 'input[placeholder*="身份证"],input[name*="idCard"]',
            mobile: 'input[placeholder*="手机"],input[name*="mobile"]'
          },
          // 通用选择器
          default: {
            name: [
              'input[placeholder*="姓名"]',
              'input[name*="name"]',
              'input[id*="name"]',
              'input[name*="userName"]'
            ].join(","),
            idCard: [
              'input[placeholder*="证件"]',
              'input[placeholder*="身份证"]',
              'input[name*="idCard"]',
              'input[name*="idNo"]',
              'input[id*="idCard"]'
            ].join(","),
            mobile: [
              'input[type="tel"]',
              'input[placeholder*="手机"]',
              'input[name*="mobile"]',
              'input[name*="phone"]',
              'input[id*="mobile"]',
              'input[id*="phone"]'
            ].join(",")
          }
        }

        // 获取当前网站对应的选择器
        const hostname = window.location.hostname
        const currentSelectors =
          Object.entries(selectors).find(([domain]) =>
            hostname.includes(domain)
          )?.[1] || selectors.default

        // 查找输入框
        const nameInput = document.querySelector(currentSelectors.name)
        const idCardInput = document.querySelector(currentSelectors.idCard)
        const mobileInput = document.querySelector(currentSelectors.mobile)

        if (nameInput && idCardInput && mobileInput) {
          // 模拟用户输入
          const simulateInput = (element, value) => {
            // 先聚焦元素
            element.focus()
            // 设置值
            element.value = value

            try {
              // 尝试Angular方式更新
              if (window.angular) {
                const scope = angular.element(element).scope()
                const ngModel = angular.element(element).controller("ngModel")
                if (scope && ngModel) {
                  ngModel.$setViewValue(value)
                  ngModel.$render()
                  scope.$apply()
                }
              }

              // 触发标准DOM事件
              const events = ["input", "change", "blur"]
              events.forEach(eventType => {
                const event = new Event(eventType, {
                  bubbles: true,
                  cancelable: true
                })
                element.dispatchEvent(event)
              })

              // 尝试Vue方式更新
              if (element.__vue__) {
                element.__vue__.$emit("input", value)
              }

              // 尝试React方式更新
              const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                window.HTMLInputElement.prototype,
                "value"
              ).set
              nativeInputValueSetter.call(element, value)
            } catch (error) {
              console.error("模拟输入事件失败:", error)
            }
          }

          try {
            simulateInput(nameInput, entry.name)
            simulateInput(idCardInput, entry.idCard)
            simulateInput(mobileInput, entry.mobile)
            showNotification(`已自动填充 ${entry.name} 的信息`)
          } catch (error) {
            console.error("自动填充失败:", error)
            showNotification("自动填充失败，请检查页面是否正确", "error")
          }
        } else {
          const missingFields = []
          if (!nameInput) missingFields.push("姓名")
          if (!idCardInput) missingFields.push("身份证")
          if (!mobileInput) missingFields.push("手机号")

          showNotification(
            `未找到以下输入框：${missingFields.join("、")}`,
            "error"
          )
          console.log("当前选择器：", currentSelectors)
        }
      })

      card.appendChild(autoFillButton)
      card.appendChild(deleteButton)
      container.appendChild(card)
    }

    // 保存数据
    function saveData() {
      // localStorage.setItem('formData', JSON.stringify(data));
      GM_setValue("formData", JSON.stringify(data))
    }

    // 添加按钮组（放置按钮）
    function addButtons() {
      const buttonsContainer = document.createElement("div")
      buttonsContainer.id = "buttonsContainer"
      buttonsContainer.style.marginBottom = "10px"
      buttonsContainer.style.display = "flex"
      buttonsContainer.style.flexDirection = "row" // 保持在同一行显示按钮
      buttonsContainer.style.alignItems = "center"
      buttonsContainer.style.position = "absolute"
      buttonsContainer.style.top = "10px" // 确保按钮在顶部固定

      // 添加表单按钮
      const addButton = document.createElement("button")
      addButton.innerText = "添加"
      addButton.style.marginRight = "8px"
      addButton.style.padding = "6px 10px"
      addButton.style.background = "#28a745"
      addButton.style.color = "#fff"
      addButton.style.border = "none"
      addButton.style.borderRadius = "5px"
      addButton.style.cursor = "pointer"
      addButton.style.fontSize = "12px"

      addButton.addEventListener("click", () => {
        const newEntry = { name: "", mobile: "", idCard: "" }
        data.push(newEntry)
        createForm(newEntry, data.length - 1)
        saveData() // 自动保存
      })

      // 导出按钮
      const exportButton = document.createElement("button")
      exportButton.innerText = "导出"
      exportButton.style.marginRight = "8px"
      exportButton.style.padding = "6px 10px"
      exportButton.style.background = "#007bff"
      exportButton.style.color = "#fff"
      exportButton.style.border = "none"
      exportButton.style.borderRadius = "5px"
      exportButton.style.cursor = "pointer"
      exportButton.style.fontSize = "12px"

      exportButton.addEventListener("click", () => {
        const jsonData = JSON.stringify(data, null, 2)
        const blob = new Blob([jsonData], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "form_data.json"
        a.click()
      })

      // 导入按钮
      const importButton = document.createElement("button")
      importButton.innerText = "导入"
      importButton.style.marginRight = "8px"
      importButton.style.padding = "6px 10px"
      importButton.style.background = "#ffc107"
      importButton.style.color = "#000"
      importButton.style.border = "none"
      importButton.style.borderRadius = "5px"
      importButton.style.cursor = "pointer"
      importButton.style.fontSize = "12px"

      importButton.addEventListener("click", () => {
        if (confirm("导入会覆盖现有数据，确定导入吗？")) {
          const input = document.createElement("input")
          input.type = "file"
          input.accept = ".json"
          input.addEventListener("change", event => {
            const file = event.target.files[0]
            if (file) {
              const reader = new FileReader()
              reader.onload = e => {
                try {
                  const importedData = JSON.parse(e.target.result)
                  data.splice(0, data.length, ...importedData) // 更新数据
                  container.innerHTML = "" // 清空现有表单
                  addButtons() // 重新添加按钮组
                  importedData.forEach(entry => {
                    createForm(entry, data.length - 1)
                  })
                  saveData() // 导入后自动保存
                } catch (error) {
                  showNotification("导入的文件格式不正确���", "error")
                }
              }
              reader.readAsText(file)
            }
          })
          input.click()
        }
      })

      // 收起按钮
      const collapseButton = document.createElement("button")
      collapseButton.innerText = "收起"
      collapseButton.style.marginRight = "8px"
      collapseButton.style.padding = "6px 10px"
      collapseButton.style.background = "#6c757d"
      collapseButton.style.color = "#fff"
      collapseButton.style.border = "none"
      collapseButton.style.borderRadius = "5px"
      collapseButton.style.cursor = "pointer"
      collapseButton.style.fontSize = "12px"

      // 创建展开图标
      const expandIcon = document.createElement("div")
      expandIcon.innerHTML = `
        <svg viewBox="0 0 1024 1024" width="24" height="24">
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm192 472c0 4.4-3.6 8-8 8H544v152c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V544H328c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h152V328c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v152h152c4.4 0 8 3.6 8 8v48z" fill="currentColor"/>
        </svg>`
      expandIcon.style.position = "fixed"
      expandIcon.style.top = "50%"
      expandIcon.style.right = "10px"
      expandIcon.style.transform = "translateY(-50%)"
      expandIcon.style.background = "#28a745"
      expandIcon.style.padding = "8px"
      expandIcon.style.borderRadius = "50%"
      expandIcon.style.cursor = "move"
      expandIcon.style.boxShadow = "0 2px 12px rgba(0,0,0,0.15)"
      expandIcon.style.color = "#fff"
      expandIcon.style.display = "none"
      expandIcon.style.zIndex = "9999"
      expandIcon.title = "展开助手（按住拖动）"
      document.body.appendChild(expandIcon)

      // 从存储中获取上次保存的位置
      const savedPosition = GM_getValue("iconPosition", null)
      let xOffset = 0
      let yOffset = 0

      // 初始化拖拽位置
      function initDragPosition() {
        const rect = expandIcon.getBoundingClientRect()
        if (!savedPosition) {
          xOffset = window.innerWidth - rect.width - 10 // 默认右侧10px的位置
          yOffset = window.innerHeight / 2 - rect.height / 2 // 垂直中
        }
      }

      if (savedPosition) {
        try {
          const { top, left } = JSON.parse(savedPosition)
          expandIcon.style.top = top
          expandIcon.style.left = left
          expandIcon.style.right = "auto"
          expandIcon.style.transform = "none"
          // 从保存的位置计算初始偏移量
          const rect = expandIcon.getBoundingClientRect()
          xOffset = parseInt(left)
          yOffset = parseInt(top)
        } catch (error) {
          console.error("恢复位置失败:", error)
          initDragPosition()
        }
      }

      // 添加拖拽功能
      let isDragging = false
      let startX
      let startY
      let startTime
      let currentX
      let currentY
      let initialX
      let initialY

      function dragStart(e) {
        if (e.target === expandIcon || expandIcon.contains(e.target)) {
          e.preventDefault()
          startX = e.clientX
          startY = e.clientY
          startTime = new Date().getTime()

          if (!isDragging) {
            initDragPosition()
          }

          initialX = e.clientX - xOffset
          initialY = e.clientY - yOffset
          isDragging = true
        }
      }

      function drag(e) {
        if (isDragging) {
          e.preventDefault()
          currentX = e.clientX - initialX
          currentY = e.clientY - initialY

          xOffset = currentX
          yOffset = currentY

          // 确保图标不会拖出视窗
          const iconRect = expandIcon.getBoundingClientRect()
          const maxX = window.innerWidth - iconRect.width
          const maxY = window.innerHeight - iconRect.height

          xOffset = Math.min(Math.max(0, xOffset), maxX)
          yOffset = Math.min(Math.max(0, yOffset), maxY)

          setTranslate(xOffset, yOffset, expandIcon)
        }
      }

      function dragEnd(e) {
        if (isDragging) {
          const endX = e.clientX
          const endY = e.clientY
          const endTime = new Date().getTime()
          const moveDistance = Math.sqrt(
            Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
          )
          const moveTime = endTime - startTime

          // 如果移动距离小于5像素且时间小于200ms，认为是点击而不是拖拽
          if (moveDistance < 5 && moveTime < 200) {
            container.style.display = "block"
            expandIcon.style.display = "none"
          } else {
            // 保存当前位置
            const position = {
              top: expandIcon.style.top,
              left: expandIcon.style.left
            }
            GM_setValue("iconPosition", JSON.stringify(position))
          }

          initialX = currentX
          initialY = currentY
          isDragging = false
        }
      }

      function setTranslate(xPos, yPos, el) {
        el.style.transform = "none"
        el.style.right = "auto"
        el.style.top = yPos + "px"
        el.style.left = xPos + "px"
      }

      expandIcon.addEventListener("mousedown", dragStart)
      document.addEventListener("mousemove", drag)
      document.addEventListener("mouseup", dragEnd)

      collapseButton.addEventListener("click", () => {
        container.style.display = "none"
        expandIcon.style.display = "block"
        // 初始化拖拽位置
        if (!savedPosition) {
          initDragPosition()
        }
      })

      buttonsContainer.appendChild(addButton)
      buttonsContainer.appendChild(exportButton)
      buttonsContainer.appendChild(importButton)
      buttonsContainer.appendChild(collapseButton)
      container.appendChild(buttonsContainer)
    }

    // 从 Tampermonkey 存储空间获取数据
    let savedData = GM_getValue("formData", []) // 如果没有保存数据，返回空字符串
    if (!savedData) {
      console.log("没有找到保存的数据")
      return
    }
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        parsedData.forEach(entry => {
          data.push(entry) // 将保存的数据添加到数据数组
          createForm(entry, data.length - 1) // 创建表单
        })
        showNotification("已加载保存的数据！")
      } catch (error) {
        showNotification("加载保存的数据失败！", "error")
      }
    }

    addButtons() // 添加按钮组
    document.body.appendChild(container) // 将容器添加到页面
  })
})()
