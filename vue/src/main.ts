import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import ElementPlus from 'element-plus'
import "@/assets/styles/element-plus-custom.scss"
import "@/assets/styles/global.scss"
import "uno.css"

const app = createApp(App)

app.use(ElementPlus, {
  size: 'large',
})

app.use(router)
app.mount("#app")
