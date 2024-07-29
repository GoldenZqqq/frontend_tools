const user = {
  name: "袁进",
  birth: "2002-5-7"
}

observe(user)

// 显示姓氏
function showFirstName() {
  document.querySelector("#firstName").textContent = "姓：" + user.name[0]
}

// 显示名字
function showLastName() {
  document.querySelector("#lastName").textContent = "名：" + user.name.slice(1)
}

// 显示年龄
function showAge() {
  const birthDay = new Date(user.birth)
  const today = new Date()
  today.setHours(0), today.setMinutes(0), today.setMilliseconds(0)
  thisYearBirthday = new Date(
    birthDay.getFullYear(),
    birthDay.getMonth(),
    birthDay.getDate()
  )
  document.querySelector("#age").textContent =
    "年龄：" +
    Math.floor((today - thisYearBirthday) / 1000 / 60 / 60 / 24 / 365)
}

autorun(showFirstName)
autorun(showLastName)
autorun(showAge)

user.name = '邓贵人'
user.birth = '1980-1-1'