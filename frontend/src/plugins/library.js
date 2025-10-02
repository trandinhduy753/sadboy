// main.js
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from '@/components/ui/dialog'

import Multiselect from '@vueform/multiselect'
import '@vueform/multiselect/themes/default.css'
import { Button } from '@/components/ui/button'
function add_library_component(app)
{
    app.component('Menu', Menu)
    app.component('MenuButton', MenuButton)
    app.component('MenuItems', MenuItems)
    app.component('MenuItem', MenuItem);
    app.component('Button', Button)
    app.component('VueDatePicker', VueDatePicker);

    app.component('Dialog', Dialog)
    app.component('DialogContent', DialogContent)
    app.component('DialogClose', DialogClose)
    app.component('DialogDescription', DialogDescription)
    app.component('DialogFooter', DialogFooter)
    app.component('DialogHeader', DialogHeader)
    app.component('DialogTitle', DialogTitle)
    app.component('DialogTrigger', DialogTrigger)

    app.component('Multiselect', Multiselect)
    
}

export default add_library_component;
