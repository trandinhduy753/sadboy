<script setup>
    import Editor from '@tinymce/tinymce-vue'
    import { useForm, useField } from 'vee-validate'
    import { object, string, date, number, mixed } from 'yup'
    import { useToast } from 'vue-toastification' 
    import comments from '@/views/admin/product/comments.vue'
    import { formatMoney, opt_show_multiple_img, toMySQLTimestampLocal, scrollToTop } from '@/composables'
    import { product } from '@/constant';
    import { Carousel, Slide, Navigation } from 'vue3-carousel'
    import 'vue3-carousel/dist/carousel.css'
    const { show_multiple_img, 
        remove_image, 
        clear_images, 
        images,
        preview_images,
        error_img
    } = opt_show_multiple_img()
    
    const editorSettings = computed(() => ({
        height: 800,
        plugins: 'image imagetools link media code preview fullscreen table lists quickbars',
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
    const toast = useToast();
    const route = useRoute();
    const store = useStore();
    const id = computed(() => route.query.index)
    const currentSlide = ref(0)
    const carousel = ref(null)
    const imgRefs = ref([])
    const scrollImg = ref(null)
    const imgs=ref([
        '/images/img_product/product_img-5B.png',
        '/images/img_product/product_img-5A.jpg',
        '/images/img_product/product_img-5.png',
        '/images/img_product/product_img-5C.jpg',
        '/images/img_product/product_img-5D.jpg',
        '/images/img_product/product_img-5E.jpg'
    ])
    const detail_products = computed(() => store.getters['admin/product/get_list_detail_product'])
    const detail_product = computed(() => detail_products.value[id.value])
    function goNext() {
        carousel.value?.next()
    }
    function goPrev() {
        carousel.value?.prev()
    }
    function tongleEdit(){
        edit_product.value = !edit_product.value
    }
    const fetchEditProduct = async (id, data) => {
        const result = await store.dispatch('admin/product/' + product.edit_product, {id, data})
        if(result.status === 422) {
            errorValidation.value = result.message;
        }
        else if(result.status === 403) {
            toast.error(result.message)
            errorValidation.value = {}
        }
        else {
            errorValidation.value= {}
            toast.success('Chỉnh sửa thông tin sản phẩm thành công')
            
        }
    }
    const fetchListCategory = async () => {
        const result = await store.dispatch('admin/product/' + product.get_list_category)
    }
    const fetchDetailProduct = async (id, page) => {
        const result = await store.dispatch('admin/product/' + product.detail_product, {id, page})
        if(result.ok === 'error' ){
            toast.error(result.message)
        }
    }
    
    const handleScrollLoadData = (event) => {
        const el = event.target;
        var length_feedback = detail_product.value.comments.length;
        if (Math.abs(el.scrollTop + el.clientHeight - el.scrollHeight) < 1) {
            page.value++;
            fetchDetailProduct(id.value, page.value)
        }
    };
    const schema = object({
        name: string().trim().notRequired(),
        sort_description: string().trim().notRequired()
        .test('min-if-not-empty', 'Mô tả sản sản tối thiểu 10 ký tự', (value) => {
            return !value || value.length >= 10
        }),
        category: string().trim().notRequired(),
        code: string().trim().notRequired()
        .test('min-if-not-empty', 'Mã sản phẩm tối thiêu 10 ký tự', (value) => {
            return !value || value.length >= 10
        }),
        price: string().trim().notRequired()
        .test('valid-original_price_S-if-not-empty', 'Vui lòng nhập một số', (value) => {
            if (!value) return true;
            return /^\d+$/.test(value);
        }),
        created_at:date().notRequired(),
        gift: string().trim().notRequired(),
        place: string().trim().notRequired(),
        import_price_S:string().trim().notRequired()
        .test('valid-import_price_S-if-not-empty', 'Vui lòng nhập một số', (value) => {
            if (!value) return true;
            return /^\d+$/.test(value);
        }),
        import_price_M:string().trim().notRequired()
        .test('valid-import_price_M-if-not-empty', 'Vui lòng nhập một số', (value) => {
            if (!value) return true;
            return /^\d+$/.test(value);
        }),
        import_price_L:string().trim().notRequired()
        .test('valid-import_price_L-if-not-empty', 'Vui lòng nhập một số', (value) => {
            if (!value) return true;
            return /^\d+$/.test(value);
        }),
        original_price_S:string().trim().notRequired()
        .test('valid-original_price_S-if-not-empty', 'Vui lòng nhập một số', (value) => {
            if (!value) return true;
            return /^\d+$/.test(value);
        }),
        original_price_M:string().trim().notRequired()
        .test('valid-original_price_M-if-not-empty', 'Vui lòng nhập một số', (value) => {
            if (!value) return true;
            return /^\d+$/.test(value);
        }),
        original_price_L:string().trim().notRequired()
        .test('valid-original_price_L-if-not-empty', 'Vui lòng nhập một số', (value) => {
            if (!value) return true;
            return /^\d+$/.test(value);
        }),
        sale_price_S:string().trim().notRequired()
        .test('valid-sale_price_S-if-not-empty', 'Vui lòng nhập một số', (value) => {
            if (!value) return true;
            return /^\d+$/.test(value);
        }),
        sale_price_M:string().trim().notRequired()
        .test('valid-sale_price_M-if-not-empty', 'Vui lòng nhập một số', (value) => {
            if (!value) return true;
            return /^\d+$/.test(value);
        }),
        sale_price_L:string().trim().notRequired()
        .test('valid-sale_price_L-if-not-empty', 'Vui lòng nhập một số', (value) => {
            if (!value) return true;
            return /^\d+$/.test(value);
        }),
        date_start_sale: date().notRequired(),
        date_end_sale: date().notRequired(),
        count_stock: string().trim().notRequired()
        .test('valid-stock_price_L-if-not-empty', 'Vui lòng nhập một số', (value) => {
            if (!value) return true;
            return /^\d+$/.test(value);
        }),
        count_sale: string().trim().notRequired()
        .test('valid-count_sale_price_L-if-not-empty', 'Vui lòng nhập một số', (value) => {
            if (!value) return true;
            return /^\d+$/.test(value);
        }),
        provide_id: string().trim().notRequired(),
        status: string().trim().notRequired(),
        stock_id: string().trim().notRequired(),
        long_description: string().trim().notRequired(),
    })

    const { handleSubmit, resetForm } = useForm({ 
        validationSchema: schema,
    })
    const { value: name, errorMessage: nameError } = useField('name')
    const { value: sort_description, errorMessage: sort_descriptionError } = useField('sort_description')
    const { value: category, errorMessage: categoryError } = useField('category')
    const { value: code, errorMessage: codeError } = useField('code')
    const { value: price, errorMessage: priceError } = useField('price')
    const { value: created_at, errorMessage: created_atError } = useField('created_at')
    const { value: gift, errorMessage: giftError } = useField('gift')
    const { value: place, errorMessage: placeError } = useField('place')
    const { value: import_price_S, errorMessage: import_price_SError } = useField('import_price_S')
    const { value: import_price_M, errorMessage: import_price_MError } = useField('import_price_M')
    const { value: import_price_L, errorMessage: import_price_LError } = useField('import_price_L')
    const { value: original_price_S, errorMessage: original_price_SError } = useField('original_price_S')
    const { value: original_price_M, errorMessage: original_price_MError } = useField('original_price_M')
    const { value: original_price_L, errorMessage: original_price_LError } = useField('original_price_L')
    const { value: sale_price_S, errorMessage: sale_price_SError } = useField('sale_price_S')
    const { value: sale_price_M, errorMessage: sale_price_MError } = useField('sale_price_M')
    const { value: sale_price_L, errorMessage: sale_price_LError } = useField('sale_price_L')
    const { value: date_start_sale, errorMessage: date_start_saleError } = useField('date_start_sale')
    const { value: date_end_sale, errorMessage: date_end_saleError } = useField('date_end_sale')
    const { value: count_stock, errorMessage: count_stockError } = useField('count_stock')
    const { value: count_sale, errorMessage: count_saleError } = useField('count_sale')
    const { value: provide_id, errorMessage: provide_idError } = useField('provide_id')
    const { value: status, errorMessage: statusError } = useField('status')
    const { value: stock, errorMessage: stockError } = useField('stock')
    const { value: long_description, errorMessage: long_descriptionError } = useField('long_description')

    const handleEditEmployee = handleSubmit(
        (values) => {
            const formData = new FormData();
            for (const key in values) {
                if(values[key]){
                    if(key=='created_at' || key=='date_start_sale' || key=='date_end_sale'){
                        formData.append(key, toMySQLTimestampLocal(values[key]) )
                    }
                    else {
                        formData.append(key, values[key])
                    }
                }
            }
           if (images.value && images.value.length > 0) {
                for (let i = 0; i < images.value.length; i++) {
                    formData.append('imgs[]', images.value[i]); // dùng img[] để Laravel nhận array
                }
            }

            var import_price = {
                'S': import_price_S.value || detail_product.value?.import_price.S,
                'M': import_price_M.value || detail_product.value?.import_price.M,
                'L': import_price_L.value || detail_product.value?.import_price.L,
            }
            var original_price = {
                'S': original_price_S.value || detail_product.value?.original_price.S,
                'M': original_price_M.value || detail_product.value?.original_price.M,
                'L': original_price_L.value || detail_product.value?.original_price.L,
            }
            var sale_price = {
                'S': sale_price_S.value || detail_product.value?.sale_price.S,
                'M': sale_price_M.value || detail_product.value?.sale_price.M,
                'L': sale_price_L.value || detail_product.value?.sale_price.L,
            }
            if(import_price_S.value || import_price_M.value || import_price_L.value) {
                formData.append('import_price', JSON.stringify(import_price))
            }
            if(original_price_S.value || original_price_M.value || original_price_L.value) {
                formData.append('original_price', JSON.stringify(original_price))
            }
            if(sale_price_S.value || sale_price_M.value || sale_price_L.value) {
                formData.append('sale_price', JSON.stringify(sale_price) )
            } 
            if ([...formData.entries()].length === 0) {
                scrollToTop()
                tongleEdit()
                toast.success('Không có thông tin nào được chỉnh sửa')
            } else {
                fetchEditProduct(id.value, formData)
                scrollToTop()
                tongleEdit()
                
            }

        },
        (errors) => {
            toast.error('Chỉnh sửa thông tin sản phẩm thất bại')
        }
    )

    const categories = computed(() => store.state.admin.product.list_category )
    const status_product = computed(() => store.state.admin.product.status )
    const edit_product = ref(false)
    const isDark = computed( () => store.state.isDark);
    const page = ref(1);
    const errorValidation = ref({})
    watch(currentSlide, (newVal) => {
        const el = imgRefs.value[newVal]
        if (el && scrollImg.value) {
                el.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest'
            })
        }
    })
    onMounted(() => {
        fetchListCategory()
        if (!detail_product.value || Object.keys(detail_product.value).length === 0) {
            fetchDetailProduct(id.value, 1)
            console.log('CALL API')
        } else {
            console.log('Lấy trong getter') // 👉 Object có dữ liệu
        }  
    })
</script>

<template>
    <div class="bg-white dark:bg-gray-800 dark:text-white flex items-center transition-all duration-500 dark:border-[var(--dark_maincolor)] text-lg pl-1 border-l-5 mb-4 border-[var(--maincolor)]  font-bold mt-2">
        <router-link :to="{name: 'admin_sadboizz.product'}">
            <font-awesome-icon :icon="['fas', 'arrow-left']"  class="mt-1 cursor-pointer text-2xl p-3 hover:text-[var(--maincolor)]  hover:scale-[1.2] transition-all duration-200  dark:text-gray-300 dark:hover:text-[var(--dark_maincolor)]" />
        </router-link>
        <p>Thông tin chi tiết của sản phẩm</p>
    </div>
    <form action="" class="">
        <div class="grid grid-cols-12 px-10 gap-x-10 gap-y-5 bg-white dark:bg-gray-900 transition-all duration-500 font-(family-name:--font-noto) pb-10">
            <div class="grid grid-cols-12 col-span-12 gap-5  ">
                <div class="col-span-6 flex flex-col items-center justify-center">
                    <div>
                        <div class="flex items-center px-1 -mt-5">
                            <button
                                type="button"    
                                @click="goPrev"   
                                class="px-4 py-3 text-4xl hover:scale-[1.5] cursor-pointer transition-all duration-300 dark:text-white"
                            >
                                <font-awesome-icon :icon="['fas', 'angle-left']" class="text-[var(--color_text-gray)] dark:text-gray-300" />
                            </button>
                            <Carousel
                                ref="carousel"
                                :model-value="currentSlide"
                                @update:modelValue="currentSlide = $event"
                                :items-to-show="1"
                                :wrap-around="true"
                                :mouse-drag="true"
                                class="rounded-lg overflow-hidden"
                            >
                                <Slide v-for="(img, index) in detail_product?.imgs" :key="index" class="">
                                    <div class="flex-1 px-1 py-15 h-100">
                                        <img :src="img" alt="" class="w-full h-full rounded-sm">
                                    </div>
                                </Slide>
                            </Carousel>
                            <button
                                type="button"   
                                @click="goNext"
                                class="px-4 py-3 text-4xl hover:scale-[1.5] cursor-pointer transition-all duration-300 dark:text-white"
                            >
                                <font-awesome-icon :icon="['fas', 'angle-right']" class="text-[var(--color_text-gray)] dark:text-gray-300" />
                            </button>
                            
                        </div>
                        <div v-show="!edit_product" class="flex scrollbar-hide -mt-7 mb-7 overflow-x-scroll" ref="scrollImg" >
                            <img v-for="(img, index) in detail_product?.imgs" 
                                v-on:click="currentSlide=index" 
                                :key="index"
                                :ref="el => imgRefs[index] = el" 
                                :class="index==currentSlide ? 'border-2 border-[var(--color_border)]' : 'border-1 border-[var(--color_border)]'" 
                                class="w-25 h-25 mr-3 p-1 rounded-sm  cursor-pointer" 
                                :src="img" 
                            alt="">
                        </div>
                    </div>
                </div>
                <div class="col-span-6 ">
                    <div class="flex flex-col mt-10 font-(family-name:--font-noto)">
                        <div class="flex items-center justify-between">
                            <div v-if="edit_product" class="flex flex-col items-start gap-2">
                                <label for="nameproduct" class="font-bold dark:text-white">Tên sản phẩm: </label>
                                <input type="text" v-model="name" :placeholder="detail_product?.name" name="nameproduct" id="nameproduct" class="w-full outline-0 border-1 border-[var(--color_border)] dark:border-gray-600 transition-all duration-500  dark:bg-gray-800 dark:text-white rounded-sm p-1">
                                <span class="text-red-500 -mt-1 block text-sm"></span>
                            </div>
                            <p v-else class="font-bold text-xl dark:text-white">{{ detail_product?.name }}</p>
                            
                            <div v-if="edit_product" @click="tongleEdit()" class="cursor-pointer flex items-center px-3 gap-2 bg-yellow-200 dark:bg-yellow-700 py-1 rounded-sm border-1 border-yellow-900 dark:border-yellow-600 hover:scale-[1.1] transition-all duration-300 hover:bg-yellow-300 dark:hover:bg-yellow-500">
                                <font-awesome-icon :icon="['fas', 'pen-to-square']" class="text-yellow-900 dark:text-yellow-300 text-xl" />
                                <p class="font-bold text-yellow-900 dark:text-yellow-300">Huỷ chỉnh sửa</p>
                            </div>
                            <div v-else @click="tongleEdit()" class="cursor-pointer flex items-center px-3 gap-2 bg-yellow-200 dark:bg-yellow-700 py-1 rounded-sm border-1 border-yellow-900 dark:border-yellow-600 hover:scale-[1.1] transition-all duration-300 hover:bg-yellow-300 dark:hover:bg-yellow-500">
                                <font-awesome-icon :icon="['fas', 'pen-to-square']" class="text-yellow-900 dark:text-yellow-300 text-xl" />
                                <p class="font-bold text-yellow-900 dark:text-yellow-300">Chỉnh sửa</p>
                            </div>
                        </div>

                        <div>
                            <textarea v-if="edit_product" v-model="sort_description" :placeholder="detail_product?.sort_description" name="" id="" class="w-full outline-0 h-30 border-1 mt-4 border-[var(--color_border)] dark:border-gray-600 transition-all duration-500  dark:bg-gray-800 dark:text-white rounded-sm p-1"></textarea>
                            <p v-else class="mt-4 italic text-sm dark:text-gray-300">
                                {{ detail_product?.sort_description }}
                            </p>
                            
                            <span class="text-red-500 -mt-1 block text-sm">{{ sort_descriptionError }}</span>
                        </div>

                        <div class="flex items-center mt-4">
                            <p class="font-bold block w-35 dark:text-white">Danh mục: </p>
                            <div v-if="edit_product" class="ml-3 w-full flex flex-col col-span-3">
                                <Menu as="div" class="relative block text-left">
                                    <MenuButton class="w-full">
                                        <div class="bg-white dark:bg-gray-800 border-1 border-[var(--color_border)] dark:border-gray-600 transition-all duration-500  py-1 mt-1 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer dark:text-white">
                                            <span>--{{ category || detail_product?.category }}--</span>
                                            <font-awesome-icon :icon="['fas', 'angle-down']" />
                                        </div>
                                    </MenuButton>
                                    <MenuItems class="absolute left-0 mt-2 w-full p-1 origin-top-right bg-white dark:bg-gray-800 border dark:border-gray-600 transition-all duration-500  rounded-md shadow-lg z-50">
                                        <div class="py-1">
                                            <MenuItem v-for="(category_sad, index) in categories" :key="index" class="mb-1 cursor-pointer">
                                                <p @click="category = category_sad.code " class="block px-2 py-1 rounded-[0.2rem] hover:bg-[var(--background-color-gray)] dark:hover:bg-gray-600 capitalize dark:text-white">
                                                    {{ category_sad.name }}
                                                </p>
                                            </MenuItem>
                                            
                                        </div>
                                    </MenuItems>
                                </Menu>
                                <span class="text-red-500 mt-1 block text-sm"></span>
                            </div>
                            <p v-else class="-ml-12 italic dark:text-gray-300">{{ detail_product?.category }}</p>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-span-12 border-b-1 border-[var(--color_border)] ">
                <div v-show="edit_product" class="-mt-10 mb-10">
                    <p class="font-bold mb-3 dark:text-white">Ảnh sản phẩm</p>
                    <label for="uploadimg_product" class="cursor-pointer text-white font-(family-name:--font-winky) py-2 px-10 rounded-sm bg-blue-900 dark:bg-blue-700">
                        <font-awesome-icon :icon="['fas', 'cloud-arrow-up']" />
                        <span class="ml-2">Chọn ảnh</span>
                    </label>
                    <input type="file" @change="show_multiple_img($event)" multiple id="uploadimg_product" class="hidden">
                    <div class="flex items-center flex-wrap mt-1">
                        <div v-for="(preview_image, index) in preview_images" :key="index" class="mr-5">
                            <font-awesome-icon @click="remove_image(index)" class="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full cursor-pointer border-1 border-black dark:border-gray-500 relative left-21 top-4" :icon="['fas', 'xmark']" />
                            <img :src="preview_image" class="w-25 h-20 border-1 border-black dark:border-gray-500 rounded-sm" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-span-4 mt-2">
                <p class="text-xl font-bold dark:text-white">Thông tin sản phẩm</p>
                <div :class="edit_product ? 'flex-col' : 'justify-between'" class="flex mt-2 ">
                    <p class="dark:text-gray-300">Mã sản phẩm: </p>
                    <div v-if="edit_product">
                        <input type="text" v-model="code" :placeholder="detail_product?.code" class="w-full outline-0 border-1 mt-1 border-[var(--color_border)] dark:border-gray-600 transition-all duration-500  dark:bg-gray-800 dark:text-white rounded-sm p-1">
                        <span class="text-red-500 mt-1 block text-sm">{{ codeError }}</span>
                    </div>
                    <p v-else class="italic font-bold dark:text-gray-100">{{ detail_product?.code }}</p>
                   
                </div>
                <div class="flex flex-col items-start mt-2">
                    <p class="dark:text-gray-300">Giá nhập: </p>
                    <div class="w-full">
                        <div :class="edit_product ? 'flex-col' : 'justify-between'"  class="flex"> 
                            <p  class="dark:text-white mt-2">Size S: </p>
                            <div v-if="edit_product">
                                <input type="text" v-model="import_price_S" :placeholder="detail_product?.import_price?.['S']" class="w-full outline-0 border-1 mt-1 border-[var(--color_border)] dark:border-gray-600 transition-all duration-500 dark:bg-gray-800 dark:text-white rounded-sm p-1">
                                <span class="text-red-500 dark:text-red-400 mt-1 block text-sm">{{ import_price_SError }}</span>
                            </div>
                            <span v-else class="text-red-500 dark:text-red-400">{{ formatMoney(detail_product?.import_price?.['S']) }}</span>
                        </div>
                        <div :class="edit_product ? 'flex-col' : 'justify-between'"  class="flex ">
                            <p  class="dark:text-white mt-1">Size M: </p>
                            <div v-if="edit_product">
                                <input type="text" v-model="import_price_M" :placeholder="detail_product?.import_price?.['M']" class="w-full outline-0 border-1 mt-1 border-[var(--color_border)] dark:border-gray-600 transition-all duration-500 dark:bg-gray-800 dark:text-white rounded-sm p-1">
                                <span class="text-red-500 dark:text-red-400 mt-1 block text-sm">{{ import_price_MError }}</span>
                            </div>
                            <span v-else class="text-red-500 dark:text-red-400">{{ formatMoney(detail_product?.import_price?.['M']) }}</span> 
                        </div>
                        <div :class="edit_product ? 'flex-col' : 'justify-between'"  class="flex">
                            <p  class="dark:text-white mt-1">Size L: </p>
                            <div v-if="edit_product">
                                <input type="text" v-model="import_price_L" :placeholder="detail_product?.import_price?.['L']" class="w-full outline-0 border-1 mt-1 border-[var(--color_border)] dark:border-gray-600 transition-all duration-500 dark:bg-gray-800 dark:text-white rounded-sm p-1">
                                <span class="text-red-500 dark:text-red-400 mt-1 block text-sm">{{ import_price_LError }}</span>
                            </div>
                            <span v-else class="text-red-500 dark:text-red-400">{{ formatMoney(detail_product?.import_price?.['L']) }}</span> 
                        </div>
                    </div>
                </div>
                <div class="flex mt-2 flex-col">
                    <p class="dark:text-gray-300">Ngày thêm sản phẩm: </p>
                    <div v-if="edit_product" :class="isDark ? 'dark' : 'light' ">
                        <VueDatePicker
                            class="dark:bg-gray-800 transition-all duration-500 bg-white mt-1 rounded-sm dark:text-white"
                            v-model="created_at"
                            :enable-time-picker="false"
                            input-class="border dark:border-gray-600 transition-all duration-500 dark:bg-gray-800 dark:text-white rounded-md px-4 py-2 text-sm"
                            menu-class="rounded-lg dark:bg-gray-800 dark:text-white"
                            format="dd-MM-yyyy HH:mm:ss"
                            :placeholder="detail_product?.created_at"
                        />
                        <span class="text-red-500 mt-1 block text-sm"></span>
                    </div>
                    <p v-else class="italic dark:text-gray-100">{{ detail_product?.created_at }}</p>
                    
                </div>
                <div :class="edit_product ? 'flex-col' : 'justify-between'" class="flex mt-2 ">
                    <p class=" dark:text-gray-300">Quà tặng đi kèm: </p>
                    <div v-if="edit_product">
                        <Menu as="div" class="relative w-full block text-left">
                            <MenuButton class="w-full">
                                <div class="bg-white dark:bg-gray-800 border-1 border-[var(--color_border)] dark:border-gray-600 transition-all duration-500 py-1 mt-1 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer dark:text-white">
                                    <span>--{{ gift ||  detail_product?.gift }}--</span>
                                    <font-awesome-icon :icon="['fas', 'angle-down']" />
                                </div>
                            </MenuButton>
                            <MenuItems class="absolute left-0 mt-2 w-full p-1 origin-top-right bg-white dark:bg-gray-800 border dark:border-gray-600 transition-all duration-500 rounded-md shadow-lg z-50">
                                <div class="py-1">
                                    <MenuItem class="mb-1 cursor-pointer">
                                        <p @click="gift = 'yes'" class="block px-2 py-1 rounded-[0.2rem] hover:bg-gray-200 dark:hover:bg-gray-600 capitalize dark:text-white">Có</p>
                                    </MenuItem>
                                    <MenuItem class="mb-1 cursor-pointer">
                                        <p @click="gift = 'no'" class="block px-2 py-1 rounded-[0.2rem] hover:bg-gray-200 dark:hover:bg-gray-600 capitalize dark:text-white">Không</p>
                                    </MenuItem>
                                </div>
                            </MenuItems>
                        </Menu>
                        <span class="text-red-500 mt-1 block text-sm"></span>
                    </div>
                    <p v-else class="dark:text-gray-100">{{ detail_product?.gift == 'no' ? 'Không' : 'Có' }}</p>
                    
                </div>
                <div :class="edit_product ? 'flex-col' : 'justify-between'" class="flex mt-2">
                    <p class="dark:text-gray-300">Nơi bán: </p>
                    <div v-if="edit_product">
                        <input type="text" v-model="place" :placeholder="detail_product?.place" class="w-full outline-0 border-1 mt-1 border-[var(--color_border)] dark:border-gray-600 transition-all duration-500  dark:bg-gray-800 dark:text-white rounded-sm p-1">
                        <span class="text-red-500 mt-1 block text-sm"></span>
                    </div>
                    <p v-else class="dark:text-gray-100">{{ detail_product?.place }}</p>
                    
                </div>
                <div class="flex items-center justify-between mt-2">
                    <p class="dark:text-gray-300">Đánh giá: </p>
                    <p class="dark:text-gray-100">{{ detail_product?.star }}</p>
                </div>
                <div class="flex items-center justify-between mt-2">
                    <p class="dark:text-gray-300">Số lượt bình luận: </p>
                    <p class="dark:text-gray-100">{{ detail_product?.count_comment }}</p>
                </div>
            </div>
             <div class="col-span-4 mt-2 ">
                <p class="text-xl font-bold dark:text-white">Giá trị khuyến mại</p>
                <div class="flex flex-col items-start mt-2">
                    <p class="dark:text-gray-300">Giá gốc: </p>
                    <div class="w-full">
                        <div :class="edit_product ? 'flex-col' : 'justify-between'"  class="flex"> 
                            <p  class="dark:text-white mt-2">Size S: </p>
                            <div v-if="edit_product">
                                <input type="text" v-model="original_price_S" :placeholder="detail_product?.original_price?.['S']" class="w-full outline-0 border-1 mt-1 border-[var(--color_border)] dark:border-gray-600 transition-all duration-500 dark:bg-gray-800 dark:text-white rounded-sm p-1">
                                <span class="text-red-500 dark:text-red-400 mt-1 block text-sm">{{ original_price_SError }}</span>
                            </div>
                            <span v-else class="text-red-500 dark:text-red-400">{{ formatMoney(detail_product?.original_price?.['S']) }}</span>
                        </div>
                        <div :class="edit_product ? 'flex-col' : 'justify-between'"  class="flex ">
                            <p  class="dark:text-white mt-1">Size M: </p>
                            <div v-if="edit_product">
                                <input type="text" v-model="original_price_M" :placeholder="detail_product?.original_price?.['M']" class="w-full outline-0 border-1 mt-1 border-[var(--color_border)] dark:border-gray-600 transition-all duration-500 dark:bg-gray-800 dark:text-white rounded-sm p-1">
                                <span class="text-red-500 dark:text-red-400 mt-1 block text-sm">{{ original_price_MError }}</span>
                            </div>
                            <span v-else class="text-red-500 dark:text-red-400">{{ formatMoney(detail_product?.original_price?.['M']) }}</span> 
                        </div>
                        <div :class="edit_product ? 'flex-col' : 'justify-between'"  class="flex">
                            <p  class="dark:text-white mt-1">Size L: </p>
                            <div v-if="edit_product">
                                <input type="text" v-model="original_price_L" :placeholder="detail_product?.original_price?.['L']" class="w-full outline-0 border-1 mt-1 border-[var(--color_border)] dark:border-gray-600 transition-all duration-500 dark:bg-gray-800 dark:text-white rounded-sm p-1">
                                <span class="text-red-500 dark:text-red-400 mt-1 block text-sm">{{ original_price_LError }}</span>
                            </div>
                            <span v-else class="text-red-500 dark:text-red-400">{{ formatMoney(detail_product?.original_price?.['L']) }}</span> 
                        </div>
                    </div>
                </div>
                <div  class="flex flex-col items-start mt-2">
                    <p class="dark:text-gray-300">Giá khuyến mại: </p>
                    <div class="w-full">
                        <div :class="edit_product ? 'flex-col' : 'justify-between'" class="flex">
                            <p class="dark:text-white mt-2">Size S: </p>
                            <div v-if="edit_product">
                                <input type="text" v-model="sale_price_S" :placeholder="detail_product?.sale_price?.['S']" class="w-full outline-0 border-1 mt-1 border-[var(--color_border)] dark:border-gray-600 transition-all duration-500 dark:bg-gray-800 dark:text-white rounded-sm p-1">
                                <span class="text-red-500 dark:text-red-400 mt-1 block text-sm">{{ sale_price_SError }}</span>
                            </div>
                            <span v-else class="text-green-500 dark:text-green-400">{{ formatMoney(detail_product?.sale_price?.['S']) }}</span>
                        </div>
                        <div :class="edit_product ? 'flex-col' : 'justify-between'" class="flex">
                            <p class="dark:text-white mt-1">Size M: </p>
                            <div v-if="edit_product">
                                <input type="text" v-model="sale_price_M" :placeholder="detail_product?.sale_price?.['M']" class="w-full outline-0 border-1 mt-1 border-[var(--color_border)] dark:border-gray-600 transition-all duration-500 dark:bg-gray-800 dark:text-white rounded-sm p-1">
                                <span class="text-red-500 dark:text-red-400 mt-1 block text-sm">{{ sale_price_MError }}</span>
                            </div>
                            <span v-else class="text-green-500 dark:text-green-400">{{ formatMoney(detail_product?.sale_price?.['M']) }}</span>
                        </div>
                        <div :class="edit_product ? 'flex-col' : 'justify-between'" class="flex">
                            <p class="dark:text-white mt-1">Size L: </p>
                            <div v-if="edit_product">
                                <input type="text" v-model="sale_price_L" :placeholder="detail_product?.sale_price?.['L']" class="w-full outline-0 border-1 mt-1 border-[var(--color_border)] dark:border-gray-600 transition-all duration-500 dark:bg-gray-800 dark:text-white rounded-sm p-1">
                                <span class="text-red-500 dark:text-red-400 mt-1 block text-sm">{{ sale_price_LError }}</span>
                            </div>
                            <span v-else class="text-green-500 dark:text-green-400">{{ formatMoney(detail_product?.sale_price?.['L']) }}</span>
                        </div>
                    </div>
                </div>
                <div class="flex items-center justify-between mt-2">
                    <p class="dark:text-gray-300">Tỷ lệ giảm giá: </p>
                    <p class="dark:text-gray-100">{{ detail_product?.proportion_discount }}%</p>
                </div>
                <div  class="flex mt-2 flex-col">
                    <p class="dark:text-gray-300">Ngày bắt đầu khuyến mại: </p>
                    <div v-if="edit_product" :class="isDark ? 'dark' : 'light' ">
                        <VueDatePicker
                            class="dark:bg-gray-800 transition-all duration-500 bg-white mt-1 rounded-sm dark:text-white"
                            v-model="date_start_sale"
                            :enable-time-picker="false"
                            input-class="border dark:border-gray-600 transition-all duration-500 dark:bg-gray-800 dark:text-white rounded-md px-4 py-2 text-sm"
                            menu-class="rounded-lg dark:bg-gray-800 dark:text-white"
                            format="dd-MM-yyyy HH:mm:ss"
                            :placeholder="detail_product?.date_start_sale"
                        />
                        <span class="text-red-500 mt-1 block text-sm"></span>
                    </div>
                    <p v-else class="italic dark:text-gray-100">{{ detail_product?.date_start_sale }}</p>
                </div>
                <div  class="flex mt-2 flex-col">
                    <p class="dark:text-gray-300">Ngày hết hạn: </p>
                    <div v-if="edit_product" :class="isDark ? 'dark' : 'light' ">
                        <VueDatePicker
                            class="dark:bg-gray-800 transition-all duration-500 bg-white mt-1 rounded-sm dark:text-white"
                            v-model="date_end_sale"
                            :enable-time-picker="false"
                            input-class="border dark:border-gray-600 transition-all duration-500 dark:bg-gray-800 dark:text-white rounded-md px-4 py-2 text-sm"
                            menu-class="rounded-lg dark:bg-gray-800 dark:text-white"
                            format="dd-MM-yyyy HH:mm:ss"
                            :placeholder="detail_product?.date_end_sale"
                        />
                        <span class="text-red-500 mt-1 block text-sm">{{ date_end_saleError }}</span>
                    </div>
                    <p v-else class="italic dark:text-gray-100">{{ detail_product?.date_end_sale }}</p>   
                </div>
            </div>
             <div class="col-span-4 mt-2">
                <p class="text-xl font-bold dark:text-white">Thông tin tồn kho</p>
                <div :class="edit_product ? 'flex-col' : 'justify-between'" class="flex mt-2">
                    <p class="dark:text-gray-300">Số lượng còn lại trong kho: </p>
                    <div v-if="edit_product">
                        <input type="text" v-model="count_stock" :placeholder="detail_product?.count_stock" class="w-full border-1 mt-1 border-[var(--color_border)] dark:border-gray-600 transition-all duration-500 dark:bg-gray-800 dark:text-white rounded-sm p-1" />
                        <span class="text-red-500 mt-1 block text-sm">{{ count_stockError }}</span>
                    </div>
                    <p v-else class="dark:text-gray-100">{{ detail_product?.count_stock }}</p>
                    
                </div>
                <div :class="edit_product ? 'flex-col' : 'justify-between'" class="flex mt-2">
                    <p class="dark:text-gray-300">Số lượng đã bán: </p>
                    <div v-if="edit_product">
                        <input type="text" v-model="count_sale" :placeholder="detail_product?.count_sale" class="w-full border-1 mt-1 border-[var(--color_border)] dark:border-gray-600 transition-all duration-500 dark:bg-gray-800 dark:text-white rounded-sm p-1" />
                        <span class="text-red-500 mt-1 block text-sm">{{ count_saleError }}</span>
                    </div>
                    <p v-else class="dark:text-gray-100">{{ detail_product?.count_sale }}</p>
                    
                </div>
                <div class="flex mt-2">
                    <p class="dark:text-gray-300">Mã vạch: </p>
                    <p class="dark:text-gray-100">{{ detail_product?.QR }}</p>
                    <div class="w-full hidden">
                        <input type="text" class="w-full border-1 mt-1 border-[var(--color_border)] dark:border-gray-600 transition-all duration-500 dark:bg-gray-800 dark:text-white rounded-sm p-1" />
                        <span class="text-red-500 mt-1 block text-sm"></span>
                    </div>
                </div>
                <div :class="edit_product ? 'flex-col' : 'justify-between'"  class="flex mt-2">
                    <p class="dark:text-gray-300">Nhà cung cấp: </p>
                    <div v-if="edit_product">
                        <input type="text" v-model="provide_id" :placeholder="detail_product?.provide?.code" class="w-full border-1 mt-1 border-[var(--color_border)] dark:border-gray-600 transition-all duration-500 dark:bg-gray-800 dark:text-white rounded-sm p-1" />
                        <span class="text-red-500 mt-1 block text-sm">{{ provide_idError }}</span>
                    </div>
                    <p v-else class="dark:text-gray-100">{{ detail_product?.provide?.name }}</p>
                    
                </div>
                <div :class="edit_product ? 'flex-col' : 'justify-between'" class="flex mt-2">
                    <p class="dark:text-gray-300">Tình trạng: </p>
                    <div v-if="edit_product">
                        <Menu as="div" class="relative w-full block text-left">
                            <MenuButton class="w-full">
                                <div class="bg-white dark:bg-gray-800 border-1 border-[var(--color_border)] dark:border-gray-600 transition-all duration-500 py-1 mt-1 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer dark:text-white">
                                    <span>--{{ status || detail_product?.status }}--</span>
                                    <font-awesome-icon :icon="['fas', 'angle-down']" />
                                </div>
                            </MenuButton>
                            <MenuItems class="absolute left-0 mt-2 w-full p-1 origin-top-right bg-white dark:bg-gray-800 border dark:border-gray-600 transition-all duration-500 rounded-md shadow-lg z-50" >
                                <div class="py-1">
                                    <MenuItem v-for="(value, key, index) in status_product" :key="key" class="mb-1 cursor-pointer">
                                        <p @click="status = key" :class="value?.bg" class="block px-2 py-1 dark:text-gray-300 rounded-[0.2rem]">{{ value.title }}</p>
                                    </MenuItem>
                                   
                                </div>
                            </MenuItems>
                        </Menu>
                        <span class="text-red-500 mt-1 block text-sm"></span>
                    </div>
                    <p v-else :class="status_product[detail_product?.status]?.bg" class="dark:text-gray-100 px-4 rounded-sm py-1">{{ status_product[detail_product?.status]?.title }}</p>
                    
                </div>
                <div :class="edit_product ? 'flex-col' : 'justify-between'" class="flex mt-2">
                    <p class="dark:text-gray-300">Kho hàng: </p>
                    <div v-if="edit_product">
                        <input type="text" v-model="stock" :placeholder="detail_product?.stock?.code" class="w-full border-1 mt-1 border-[var(--color_border)] dark:border-gray-600 transition-all duration-500 dark:bg-gray-800 dark:text-white rounded-sm p-1" />
                        <span class="text-red-500 mt-1 block text-sm">{{ stockError }}</span>
                    </div>
                    <p v-else class="dark:text-gray-100">{{ detail_product?.stock?.name }}</p>
                    
                </div>
            </div>
            <div class="col-span-12 border-t-1 border-[var(--color_border)]"></div>
            <div class="col-span-4">
                <p class="text-xl font-bold dark:text-white">Thông tin quản trị</p>
                
                <div class="flex mt-2 flex-col">
                    <p class="dark:text-gray-300">Ngày được thêm vào:</p>
                    <p class="italic dark:text-gray-400">{{ detail_product?.created_at }}</p>
                    <div class="w-full hidden" >
                        <!-- <VueDatePicker
                            class="dark:bg-gray-800 transition-all duration-500 bg-white mt-1 rounded-sm dark:text-white"
                            v-model="date"
                            :enable-time-picker="false"
                            input-class="border dark:border-gray-600 transition-all duration-500 dark:bg-gray-800 dark:text-white rounded-md px-4 py-2 text-sm"
                            menu-class="rounded-lg dark:bg-gray-800 dark:text-white"
                        /> -->
                        <span class="text-red-500 mt-1 block text-sm"></span>
                    </div>
                </div>
                <div class="flex mt-2 flex-col">
                    <p class="dark:text-gray-300">Người chỉnh sửa gần nhất:</p>
                    <p class="italic dark:text-gray-400">{{ detail_product?.updated_by }}</p>
                    <div class="w-full hidden">
                        <input type="text" class="w-full border border-gray-300 dark:border-gray-700 mt-1 rounded-sm p-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
                        <span class="text-red-500 mt-1 block text-sm"></span>
                    </div>
                </div>
                <div class="flex flex-col mt-2">
                    <p class="dark:text-gray-300">Đơn vị tính:</p>
                    <p class="dark:text-gray-200">{{ detail_product?.unit }}</p>
                </div>
            </div>
            <div class="col-span-12 mt-5 text-sm">
                <p class="font-bold text-xl dark:text-white mb-3">Mô tả sản phẩm:</p>
                
                <div v-if="edit_product">
                    <Editor
                    
                    api-key="peas03g0bwumpx7ivb4cuhrck2dfd1lpkmjsxqyljojpxyez"
                    v-model="long_description"
                    :init="editorSettings"
                /> 
                </div>
                
                <div v-else v-html="detail_product?.long_description">
                    
                </div>
                
            </div>
            <div class="col-span-12 flex items-center">
                <div @click="handleEditEmployee()" class="px-15 cursor-pointer py-1.5 rounded-sm mr-5 bg-green-300 dark:bg-green-700 hover:bg-green-200 dark:hover:bg-green-600 hover:text-black dark:hover:text-white hover:scale-[1.1] duration-300 transition-all text-green-900 dark:text-green-100 font-bold border-1 border-green-900 dark:border-green-600">
                    Lưu lại
                </div>
                
            </div>
            <div @scroll="handleScrollLoadData" class="col-span-12 text-sm max-h-100 overflow-y-auto scrollbar-hide">
                <p class="dark:text-white dark:bg-gray-800 p-3 rounded-ssm">Bình luận về sản phẩm</p>
                <comments v-for="(comment, index) in detail_product?.comments" :comment="comment" :key="index" />
            </div>
        </div>
    </form>
    
  
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
