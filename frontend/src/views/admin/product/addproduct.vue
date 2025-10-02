<script setup lang="ts">
    import Editor from '@tinymce/tinymce-vue'
    import { useForm, useField } from 'vee-validate'
    import { object, string, date, number } from 'yup'
    import { randomString, opt_show_multiple_img } from '@/composables'
    import { product } from '@/constant'
    import { useToast } from 'vue-toastification'
    const store = useStore()
    const toast = useToast()
    const router = useRouter()
    const isDark = computed(() => store.state.isDark)
    const editorSettings = computed(() => ({
        height: 800,
        plugins: 'image link media code preview fullscreen table lists quickbars',
        toolbar: [
            'undo redo | bold italic underline strikethrough | forecolor backcolor | fontfamily fontsize blocks',
            'alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist',
            'table | image media link | code fullscreen preview'
        ],
        menubar: true,
        toolbar_mode: 'floating',
        skin: 'oxide-dark',
        content_css: 'document',
        setup: (editor) => {
            editor.on('NodeChange', (e) => {
            if (e && e.element.nodeName === 'IMG') {
                e.element.setAttribute('draggable', true)
            }
            })
        },
        file_picker_callback: function (callback, value, meta) {
            let x = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
            let y = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
            let type = 'file'
            if (meta.filetype === 'image') {
                type = 'image'
            } else if (meta.filetype === 'media') {
                type = 'video'
            } else if (meta.filetype === 'file') {
                type = 'document'
            }
            const cmsURL = `http://localhost:8000/laravel-filemanager?editor=${meta.fieldname}&type=${type}`
            tinymce.activeEditor.windowManager.openUrl({
            title: 'Chọn file',
            url: cmsURL,
            width: x * 0.8,
            height: y * 0.8,
            onMessage: (api, message) => {
                let url = message.content
                if (url.startsWith('/')) {
                url = 'http://localhost:8000' + url
                }
                if (meta.filetype === 'file') {
                callback(url, { text: 'Tài liệu tải về' })
                } else {
                callback(url)
                }
            }
            })
        }
    }))

    const { show_multiple_img, remove_image, clear_images, images, preview_images, error_img } = opt_show_multiple_img();
    const fetchListCategory = async () => {
        const result = await store.dispatch('admin/product/' + product.get_list_category)
    }
    const fetchAddProduct = async (data) => {
        const result = await store.dispatch('admin/product/' + product.add_product, data)
    }
    const schema = object({
        code: string().required('Mã sản phẩm không được bỏ trống').trim().min(10, 'Mã sản phẩm tối thiểu 10 ký tự'),
        name: string().required('Tên sản phẩm không được bỏ trống').trim().min(5, 'Tên sản phẩm tối thiểu 5 ký tự'),
        count_stock: number().typeError('Số lượng phải là một số') .required('Số lượng không được trống trường này').min(0, 'Số lượng không được âm'),
        category_id: string().required('Danh mục sản phẩm không được bỏ trống').trim(),
        provide_id: string().required('Mã sản phẩm không được bỏ trống').trim(),
        import_price_s: number().typeError('Giá sản phẩm phải là một số').required('Giá nhập không được để trống').min(0, 'Giá sản phẩm không được âm'),
        import_price_m: number().typeError('Giá sản phẩm phải là một số').required('Giá nhập không được để trống').min(0, 'Giá sản phẩm không được âm'),
        import_price_l: number().typeError('Giá sản phẩm phải là một số').required('Giá nhập không được để trống').min(0, 'Giá sản phẩm không được âm'),
        original_price_s: number().typeError('Giá sản phẩm phải là một số').required('Giá bán không được để trống').min(0, 'Giá sản phẩm không được âm'),
        original_price_m: number().typeError('Giá sản phẩm phải là một số').required('Giá bán không được để trống').min(0, 'Giá sản phẩm không được âm'),
        original_price_l: number().typeError('Giá sản phẩm phải là một số').required('Giá bán không được để trống').min(0, 'Giá sản phẩm không được âm'),
        place: string().required('Nơi bán không được để trống').trim(),
        gift: string().required('Nơi bán không được để trống').trim(),
        sort_description: string().notRequired(),
        long_description: string().notRequired(),
    })

    const { handleSubmit } = useForm({ 
        validationSchema: schema,
        initialValues: {
            code: randomString(11),
            gift: 'no',
            name: 'Quả la hán',
            count_stock: 100,
            category_id: 1,
            provide_id: 2,
            import_price_s: 30000,
            import_price_m: 40000,
            import_price_l: 50000,
            original_price_s: 50000,        
            original_price_m: 60000,
            original_price_l: 70000,
            place: 'Hà Nội',
            sort_description: 'Quả la hán có tác dụng thanh nhiệt, giải độc, làm mát cơ thể, tốt cho phổi, giảm ho, long đờm, hỗ trợ điều trị bệnh tiểu đường',
            long_description: '<p>Quả la hán có tác dụng thanh nhiệt, giải độc, làm mát cơ thể, tốt cho phổi, giảm ho, long đờm, hỗ trợ điều trị bệnh tiểu đường</p>',

        }
    })

    const { value: code, errorMessage: codeError } = useField('code')
    const { value: name, errorMessage: nameError } = useField('name')
    const { value: count_stock, errorMessage: count_stockError } = useField('count_stock')
    const { value: category_id, errorMessage: category_idError } = useField('category_id')
    const { value: provide_id, errorMessage: provide_idError } = useField('provide_id')
    const { value: import_price_s, errorMessage: import_price_sError } = useField('import_price_s')
    const { value: import_price_m, errorMessage: import_price_mError } = useField('import_price_m')
    const { value: import_price_l, errorMessage: import_price_lError } = useField('import_price_l')
    const { value: original_price_s, errorMessage: original_price_sError } = useField('original_price_s')
    const { value: original_price_m, errorMessage: original_price_mError } = useField('original_price_m')
    const { value: original_price_l, errorMessage: original_price_lError } = useField('original_price_l')
    const { value: place, errorMessage: placeError } = useField('place')
    const { value: gift, errorMessage: giftError } = useField('gift')
    const { value: sort_description, errorMessage: sort_descriptionError } = useField('sort_description')
    const { value: long_description, errorMessage: long_descriptionError } = useField('long_description')
    const onManualSubmit = handleSubmit(
        (values) => {
            const formData = new FormData();
            for (const key in values) {
                if(values[key]){
                    formData.append(key, values[key])
                }
            }
            if (images.value.length !== 0) {
                images.value.forEach((file, index) => {
                    formData.append('imgs[]', file);
                });
            }
            var import_price = {
                'S': import_price_s.value,
                'M': import_price_m.value,
                'L': import_price_l.value,
            }
            var original_price = {
                'S': original_price_s.value,
                'M': original_price_m.value,
                'L': original_price_l.value,
            }
            formData.append('import_price', JSON.stringify(import_price))
            formData.append('original_price', JSON.stringify(original_price))
            fetchAddProduct(formData)
            toast.success('Thêm sản phẩm mới thành công')
            // for (let [key, value] of formData.entries()) {
            //     console.log(key, value)
            // }
            setTimeout(() => {
                //router.push({ name: 'admin_sadboizz.product' })
            }, 1000)
        },
        (errors) => {
            console.log(errors)
        }
    )
    const categories = computed(() => store.state.admin.product.list_category )
    onMounted(() => {
        fetchListCategory()
    })
</script>

<template>
    <div class="bg-[#E0F2F7] dark:bg-gray-800 transition-all duration-500 -m-2 p-2 h-full">
        <div class="bg-white flex items-center dark:bg-gray-700 transition-all duration-500 dark:text-white  pl-1 border-l-5 mb-4 border-[var(--maincolor)] dark:border-[var(--dark_maincolor)] font-bold ">
            <router-link :to="{name: 'admin_sadboizz.product'}">
                <font-awesome-icon :icon="['fas', 'arrow-left']"  class="mt-1 cursor-pointer text-2xl p-3 hover:text-[var(--maincolor)]  hover:scale-[1.2] transition-all duration-200  dark:text-gray-300 dark:hover:text-[var(--dark_maincolor)]" />
            </router-link>
            <p class="ml-1">Thêm một sản phẩm mới</p>
        </div>
        <div class="flex items-center mt-7 pb-3 border-b-1 transition-all duration-500 border-[var(--color_border)]">
            <Dialog>
                <DialogTrigger>
                    <div class="flex items-center bg-green-400 dark:bg-green-600 px-3 py-1.5 rounded-sm mr-3 cursor-pointer transition-all duration-200 hover:bg-green-500 dark:hover:bg-green-700 hover:scale-105">
                        <font-awesome-icon :icon="['fas', 'folder-plus']" />
                        <p class="ml-1">Thêm danh mục</p>
                    </div>
                </DialogTrigger>
                <DialogContent class="dark:bg-gray-800">
                    <DialogHeader>
                        <DialogTitle>
                            <p class="text-[1.3rem] pb-3 border-b-1 border-[var(--color_border)] text-black dark:text-white">Thêm danh mục sản phẩm mới</p>
                        </DialogTitle>
                        <DialogDescription>
                            <div class="flex flex-col mt-4">
                                <label for="Newprovider" class="text-black dark:text-white font-bold">Nhập danh mục sản phẩm mới</label>
                                <input type="text" class="border-1 border-[var(--color_border)] rounded-[0.2rem] outline-0 px-2 py-2 mt-1.5 bg-gray-200 dark:bg-gray-700 text-black dark:text-white">
                                <span class="mt-1">Vui lòng nhập tên danh mục sản phẩm mới</span>
                            </div>
                            <div class="mt-3 text-black dark:text-white">
                                <p class="font-bold">Danh mục sản phẩm hiện có</p>
                                <ul class="list-disc ml-3 mt-1">
                                    <li>Nhà cung cấp A</li>
                                    <li>Nhà cung cấp B</li>
                                </ul>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose as-child>
                            <button class="bg-green-200 dark:bg-green-700 px-8 border-1 border-green-900 dark:border-green-500 py-2 rounded-sm cursor-pointer font-bold text-green-900 dark:text-white">Lưu lại</button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Dialog>
                <DialogTrigger>
                    <div class="flex items-center bg-green-400 dark:bg-green-600 px-3 py-1.5 rounded-sm mr-3 cursor-pointer transition-all duration-200 hover:bg-green-500 dark:hover:bg-green-700 hover:scale-105">
                        <font-awesome-icon :icon="['fas', 'folder-plus']" />
                        <p class="ml-1">Thêm tình trạng</p>
                    </div>
                </DialogTrigger>
                <DialogContent class="dark:bg-gray-800">
                    <DialogHeader>
                        <DialogTitle>
                            <p class="text-[1.3rem] pb-3 border-b-1 border-[var(--color_border)] text-black dark:text-white">Thêm tình trạng sản phẩm</p>
                        </DialogTitle>
                        <DialogDescription>
                            <div class="flex flex-col mt-4">
                                <label for="Newprovider" class="text-black dark:text-white font-bold">Nhập tên tình trạng sản phẩm mới</label>
                                <div class="flex items-center">
                                    <input type="text" class="border-1 border-[var(--color_border)] rounded-[0.2rem] outline-0 px-2 py-2 mt-1.5 bg-gray-200 dark:bg-gray-700 text-black dark:text-white flex-1">
                                    <div class="w-15 bg-white dark:bg-gray-700 border shadow-md rounded-sm ml-2 mt-[0.3rem] h-10">
                                        <input type="color" class="w-full h-full cursor-pointer">
                                    </div>
                                </div>
                                <span class="mt-1">Vui lòng nhập tên tình trạng mới</span>
                            </div>
                            <div class="mt-3 text-black dark:text-white">
                                <p class="font-bold">Danh sách tình trạng hiện có</p>
                                <div class="grid grid-cols-4 mt-1 gap-2">
                                    <p v-for="i in 5" :key="i" class="block px-5 py-1 bg-green-400 dark:bg-green-600 rounded-[0.2rem] text-white">Còn hàng</p>
                                </div>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose as-child>
                            <button class="bg-green-200 dark:bg-green-700 px-8 border-1 border-green-900 dark:border-green-500 py-2 rounded-sm cursor-pointer font-bold text-green-900 dark:text-white">Lưu lại</button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>

        <form class="mt-4" action="">
            <div class="grid grid-cols-12 gap-5">
                <div class="flex flex-col col-span-3">
                    <label for="idproduct" class="cursor-pointer font-bold text-black dark:text-white">Mã sản phẩm</label>
                    <input v-model="code" type="text" id="idproduct" class="bg-white transition-all duration-500 dark:bg-gray-800 border-1 border-[var(--color_border)] dark:border-gray-600 outline-none rounded-sm pl-2 py-1 mt-1 text-black dark:text-white">
                    <span class="input-config-error">{{ codeError }}</span>
                </div>

                <div class="flex flex-col col-span-3">
                    <label for="nameproduct" class="cursor-pointer font-bold text-black dark:text-white">Tên sản phẩm</label>
                    <input v-model="name" type="text" id="nameproduct" class="bg-white transition-all duration-500 dark:bg-gray-800 border-1 border-[var(--color_border)] dark:border-gray-600 outline-none rounded-sm pl-2 py-1 mt-1 text-black dark:text-white">
                    <span class="input-config-error">{{ nameError }}</span>
                </div>

                <div class="flex flex-col col-span-3">
                    <label for="numberproduct" class="cursor-pointer font-bold text-black dark:text-white">Số lượng hiện có</label>
                    <input v-model="count_stock" type="number" id="numberproduct" class="bg-white transition-all duration-500 dark:bg-gray-800 border-1 border-[var(--color_border)] dark:border-gray-600 outline-none rounded-sm pl-2 py-1 mt-1 text-black dark:text-white">
                    <span class="input-config-error">{{ count_stockError }}</span>
                </div>

                
                <div class="flex flex-col col-span-3">
                    <label for="" class="font-bold text-black dark:text-white">Danh mục</label>
                    <Menu as="div" class="relative block text-left">
                        <MenuButton class="w-full">
                            <div class="bg-white dark:bg-gray-800 transition-all duration-500 border-1 border-[var(--color_border)] dark:border-gray-600 py-1 mt-1 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer text-black dark:text-white">
                                <span>--{{ categories.find(category => category.id === category_id)?.name || 'Chọn danh mục' }}--</span>
                                <font-awesome-icon :icon="['fas', 'angle-down']" />
                            </div>
                        </MenuButton>
                        <MenuItems class="absolute left-0 mt-2 w-full p-1 origin-top-right bg-white dark:bg-gray-800 dark:text-white border dark:border-gray-600 rounded-md shadow-lg z-50">
                            <div class="py-1">
                                <MenuItem v-for="(category_sad, index) in categories" :key="index" class="mb-1 cursor-pointer">
                                    <p @click="category_id = category_sad.id" class="block px-2 py-1 rounded-[0.2rem] hover:bg-gray-100 dark:hover:bg-gray-700 capitalize"> {{ category_sad.code }} - {{ category_sad.name }}</p>
                                </MenuItem>
                                
                            </div>
                        </MenuItems>
                    </Menu>
                    <span class="input-config-error">{{ category_idError }}</span>
                </div>

                <div class="flex flex-col col-span-3">
                    <label for="provideproduct" class="cursor-pointer font-bold text-black dark:text-white">Nhập mã nhà cung cấp</label>
                    <input v-model="provide_id" type="provide" id="provideproduct" class="bg-white transition-all duration-500 dark:bg-gray-800 border-1 border-[var(--color_border)] dark:border-gray-600 outline-none rounded-sm pl-2 py-1 mt-1 text-black dark:text-white">
                    <span class="input-config-error">{{ provide_idError }}</span>
                </div>
                <div class="flex flex-col col-span-3">
                    <label for="priceproduct" class="cursor-pointer font-bold text-gray-800 dark:text-gray-300">Giá nhập</label>
                   
                    <span class="input-config-error"></span>
                    <Menu as="div" class="relative block text-left">
                        <MenuButton class="w-full">
                            <div class="bg-white transition-all duration-500 dark:bg-gray-800 border-1 border-[var(--color_border)] dark:border-gray-600 py-1 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer text-black dark:text-white">
                                <span>Giá</span>
                                <font-awesome-icon :icon="['fas', 'angle-down']" />
                            </div>
                        </MenuButton>

                        <MenuItems class="absolute left-0 mt-2 w-full p-1 origin-top-right bg-white dark:text-white dark:bg-gray-800 border dark:border-gray-600 rounded-md shadow-lg z-50">
                            <div class="py-1">
                                <MenuItem @click.prevent class="mb-3 cursor-pointer">
                                    <div>
                                        <div class="bg-white transition-all duration-500 dark:bg-gray-800 border-1 border-[var(--color_border)] dark:border-gray-600 py-1 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer text-black dark:text-white">
                                            <span>S (nhỏ)</span>
                                            <font-awesome-icon :icon="['fas', 'angle-down']" />
                                        </div>
                                        <div>
                                            <input v-model="import_price_s" type="text" placeholder="30000" name="" id="priceproduct" class="bg-white transition-all duration-500 text-gray-800 border border-gray-300 outline-none rounded-sm pl-2 py-1 mt-1 dark:bg-gray-800 dark:text-white dark:border-gray-600">
                                            <span class="input-config-error">{{ import_price_sError }}</span>
                                        </div>
                                    </div>
                                    
                                </MenuItem>
                                <MenuItem @click.prevent class="mb-3 cursor-pointer">
                                    <div>
                                        <div class="bg-white transition-all duration-500 dark:bg-gray-800 border-1 border-[var(--color_border)] dark:border-gray-600 py-1 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer text-black dark:text-white">
                                            <span>M (vừa)</span>
                                            <font-awesome-icon :icon="['fas', 'angle-down']" />
                                        </div>
                                        <div>
                                            <input v-model="import_price_m" type="text" placeholder="30000" name="" id="priceproduct" class="bg-white transition-all duration-500 text-gray-800 border border-gray-300 outline-none rounded-sm pl-2 py-1 mt-1 dark:bg-gray-800 dark:text-white dark:border-gray-600">
                                            <span class="input-config-error">{{ import_price_sError }}</span>
                                        </div>
                                    </div>
                                </MenuItem>
                                <MenuItem @click.prevent class="mb-3 cursor-pointer">
                                    <div>
                                        <div class="bg-white transition-all duration-500 dark:bg-gray-800 border-1 border-[var(--color_border)] dark:border-gray-600 py-1 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer text-black dark:text-white">
                                            <span>L (lớn)</span>
                                            <font-awesome-icon :icon="['fas', 'angle-down']" />
                                        </div>
                                        <div>
                                            <input v-model="import_price_l" type="text" placeholder="30000" name="" id="priceproduct" class="bg-white transition-all duration-500 text-gray-800 border border-gray-300 outline-none rounded-sm pl-2 py-1 mt-1 dark:bg-gray-800 dark:text-white dark:border-gray-600">
                                            <span class="input-config-error">{{ import_price_lError }}</span>
                                        </div>
                                    </div>
                                </MenuItem>
                               
                            </div>
                        </MenuItems>
                    </Menu>
                    <span class="input-config-error">{{ import_price_sError || import_price_mError || import_price_lError }}</span>
                </div>
                <div class="flex flex-col col-span-3">
                    <label for="priceproduct" class="cursor-pointer font-bold text-gray-800 dark:text-gray-300">Giá bán</label>
                    <!-- <input type="text" name="" id="priceproduct" class="bg-white transition-all duration-500 text-gray-800 border border-gray-300 outline-none rounded-sm pl-2 py-1 mt-1 dark:bg-gray-800 dark:text-white dark:border-gray-600"> -->
                    <span class="input-config-error"></span>
                    <Menu as="div" class="relative block text-left">
                        <MenuButton class="w-full">
                            <div class="bg-white transition-all duration-500 dark:bg-gray-800 border-1 border-[var(--color_border)] dark:border-gray-600 py-1 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer text-black dark:text-white">
                                <span>Giá</span>
                                <font-awesome-icon :icon="['fas', 'angle-down']" />
                            </div>
                        </MenuButton>

                        <MenuItems class="absolute left-0 mt-2 w-full p-1 origin-top-right bg-white dark:text-white dark:bg-gray-800 border dark:border-gray-600 rounded-md shadow-lg z-50">
                            <div class="py-1">
                                <MenuItem @click.prevent class="mb-3 cursor-pointer">
                                    <div>
                                        <div class="bg-white transition-all duration-500 dark:bg-gray-800 border-1 border-[var(--color_border)] dark:border-gray-600 py-1 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer text-black dark:text-white">
                                            <span>S (nhỏ)</span>
                                            <font-awesome-icon :icon="['fas', 'angle-down']" />
                                        </div>
                                        <div>
                                            <input v-model="original_price_s" type="text" placeholder="30000" name="" id="priceproduct" class="bg-white transition-all duration-500 text-gray-800 border border-gray-300 outline-none rounded-sm pl-2 py-1 mt-1 dark:bg-gray-800 dark:text-white dark:border-gray-600">
                                            <span class="input-config-error">{{ original_price_sError }}</span>
                                        </div>
                                    </div>
                                    
                                </MenuItem>
                                <MenuItem @click.prevent class="mb-3 cursor-pointer">
                                    <div>
                                        <div class="bg-white transition-all duration-500 dark:bg-gray-800 border-1 border-[var(--color_border)] dark:border-gray-600 py-1 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer text-black dark:text-white">
                                            <span>M (vừa)</span>
                                            <font-awesome-icon :icon="['fas', 'angle-down']" />
                                        </div>
                                        <div>
                                            <input v-model="original_price_m" type="text" placeholder="30000" name="" id="priceproduct" class="bg-white transition-all duration-500 text-gray-800 border border-gray-300 outline-none rounded-sm pl-2 py-1 mt-1 dark:bg-gray-800 dark:text-white dark:border-gray-600">
                                            <span class="input-config-error">{{ original_price_sError }}</span>
                                        </div>
                                    </div>
                                </MenuItem>
                                <MenuItem @click.prevent class="mb-3 cursor-pointer">
                                    <div>
                                        <div class="bg-white transition-all duration-500 dark:bg-gray-800 border-1 border-[var(--color_border)] dark:border-gray-600 py-1 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer text-black dark:text-white">
                                            <span>L (lớn)</span>
                                            <font-awesome-icon :icon="['fas', 'angle-down']" />
                                        </div>
                                        <div>
                                            <input v-model="original_price_l" type="text" placeholder="30000" name="" id="priceproduct" class="bg-white transition-all duration-500 text-gray-800 border border-gray-300 outline-none rounded-sm pl-2 py-1 mt-1 dark:bg-gray-800 dark:text-white dark:border-gray-600">
                                            <span class="input-config-error">{{ original_price_lError }}</span>
                                        </div>
                                    </div>
                                </MenuItem>
                               
                            </div>
                        </MenuItems>
                    </Menu>
                    <span class="input-config-error">{{ original_price_sError || original_price_mError || original_price_lError }}</span>
                </div>
                
                <div class="flex flex-col col-span-3">
                    <label for="importproduct" class="cursor-pointer font-bold text-gray-800 dark:text-gray-300">Nới bán</label>
                    <input v-model="place" type="text" name="" id="importproduct" class="bg-white transition-all duration-500 text-gray-800 border border-gray-300 outline-none rounded-sm pl-2 py-1 mt-1 dark:bg-gray-800 dark:text-white dark:border-gray-600">
                    <span class="input-config-error">{{ placeError }}</span>
                </div>
                <div class="flex flex-col col-span-3">
                    <label for="" class="font-bold text-gray-800 dark:text-gray-300">Quà tặng đi kèm</label>
                    <Menu as="div" class="relative block text-left">
                        <MenuButton class="w-full">
                            <div class="bg-white transition-all duration-500 text-gray-800 border border-gray-300 py-1 mt-1 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer dark:bg-gray-800 dark:text-white dark:border-gray-600">
                                <span>--{{ gift }}--</span>
                                <font-awesome-icon :icon="['fas', 'angle-down']" />
                            </div>
                        </MenuButton>
                        <MenuItems class="absolute left-0 mt-2 w-full p-1 origin-top-right bg-white text-gray-800 border border-gray-300 rounded-md shadow-lg z-50 dark:bg-gray-700 dark:text-white dark:border-gray-600">
                            <div class="py-1">
                                <MenuItem @click="gift = 'yes'" class="mb-1 cursor-pointer">
                                    <p class="block px-2 py-1 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600 capitalize">Có</p>
                                </MenuItem>
                                <MenuItem @click="gift = 'no'" class="mb-1 cursor-pointer">
                                    <p class="block px-2 py-1 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600 capitalize">Không</p>
                                </MenuItem>
                            </div>
                        </MenuItems>
                    </Menu>
                    <span class="input-config-error"></span>
                </div>
                <div class="col-span-12">
                    <p class="font-bold mb-3 text-gray-800 dark:text-gray-300">Ảnh sản phẩm</p>
                    <label for="uploadimg_product" 
                        class="cursor-pointer text-white font-bold py-2 px-10 rounded-sm bg-blue-900 dark:bg-blue-700 dark:text-white">
                        <font-awesome-icon :icon="['fas', 'cloud-arrow-up']" />
                        <span class="ml-2 mb-2">Chọn ảnh</span>
                    </label>
                    <input type="file" @change="show_multiple_img($event)" id="uploadimg_product" multiple class="hidden">
                    <div class="flex items-center flex-wrap my-1">
                        <div v-for="(preview_image, index) in preview_images" :key="index" class="mr-5 ">
                            <font-awesome-icon @click="remove_image(index)" class="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full cursor-pointer border border-black dark:border-gray-500 relative left-21 top-4" :icon="['fas', 'xmark']" />
                            <img :src="preview_image" 
                                class="w-25 h-20 border border-black dark:border-gray-600 rounded-sm" alt="">
                        </div>
                    </div>
                    <span class="input-config-error">{{ error_img }}</span>
                </div>
                <div class="flex flex-col col-span-12">
                    <label for="shortdesc" class="cursor-pointer font-bold text-black dark:text-white">Mô tả ngắn gọn</label>
                    <textarea v-model="sort_description" type="text" id="shortdesc" class="bg-white h-30 transition-all duration-500 dark:bg-gray-800 border-1 border-[var(--color_border)] dark:border-gray-600 outline-none rounded-sm p-2 mt-2 text-black dark:text-white"> </textarea>
                    <span class="input-config-error"></span>
                </div>
                <div class="col-span-12 ">
                    <label for="" class="font-bold text-gray-800 dark:text-gray-300">Mô tả sản phẩm</label>
                    <main id="sample" class="mt-2">
                        <Editor
                      
                            v-model="long_description" :init="editorSettings" api-key="peas03g0bwumpx7ivb4cuhrck2dfd1lpkmjsxqyljojpxyez"
                            
                        />
                    </main>
                </div>
                <div class="col-span-12 flex items-center transition-all duration-500">
                    <div @click="onManualSubmit()" class="px-15 cursor-pointer py-1.5 rounded-sm mr-5 bg-green-300 text-green-900 font-bold border border-green-900 hover:bg-green-200 hover:text-black hover:scale-105 transition-all duration-300 dark:bg-green-700 dark:text-white dark:border-green-600 dark:hover:bg-green-600">
                        Lưu lại
                    </div>
                    
                </div>

            </div>
        </form>
        
        
    </div>
</template>

<style scoped>
:deep(.dp__input) {
    height: 2rem; /* h-10 */
    background-color: transparent; /* bg-gray-200 */
    padding:  1rem 2rem 1rem 2rem; /* py-2 px-4 */
    border-radius: 0.375rem; /* rounded-md */
    font-size: 0.875rem;
    border: 1px solid var(--color_border);
}
/* :deep(.dp__input_icon) {
  
}
:deep(.dp--clear-btn){
    margin-top: 0.5px;
} */
.dark :deep(.dp__input) {
  color: white;
}
.light :deep(.dp__input) {
  color: black;
}
</style>