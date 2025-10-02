import './assets/style/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { add_icons_fontawesome, add_library_component, register_layout} from './plugins/index.js'
//import './plugins/orther.js'
import router from './router/index.ts';
import store from './store/index.js'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { QrcodeStream } from 'vue-qrcode-reader'

const app = createApp(App)
const options = {
  position: 'top-right',
  timeout: 3500,
  hideProgressBar: false,
  toastClassName: 'my-toast',
  bodyClassName: ['text-sm', 'text-gray-800',, 'dark:text-white'],
  draggable: true,
  draggablePercent: 0.6,
  transition: 'Vue-Toastification__bounce'
}



app.use(Toast, options)
add_icons_fontawesome(app)
add_library_component(app)
register_layout(app)
app.component('QrcodeStream', QrcodeStream)
app.use(store)
app.use(router)

app.mount('#app')
