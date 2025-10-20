<script setup>
    import { formatMoney, opt_show_img, toMySQLTimestampLocal, scrollToTop } from '@/composables'
    import { voucher, user} from '@/constant';
    import { useForm, useField } from 'vee-validate'
    import { object, string, date, number } from 'yup'
    const { show_img, img, preview_img, error_img, clear_img } = opt_show_img()
    import { useToast } from 'vue-toastification'
    const toast = useToast();
    const route = useRoute()
    const store = useStore()
    const id = computed(() => route.query.index);
    const voucher_status = computed(() => store.state.admin.voucher.voucher_status);
    const detail_vouchers = computed(() => store.getters['admin/voucher/get_list_detail_voucher']);
    const detail_voucher= computed(() => detail_vouchers.value[id.value] );
    const list_user =  computed(() => store.state.admin.user.users)
    function delete_user_use_monoply(user) {
        if (!delete_user_monoply.value.some(item => item.code === user.code)) {
            delete_user_monoply.value.push(user.id)
        }
       
    }
    const fetchEditVoucher = async (id, data) => {
        const result = await store.dispatch('admin/voucher/' + voucher.edit_voucher, {id: id, data: data})
        if(result.status === 422) {
			errorValidation.value = result.message;
		}
		else if(result.status === 403) {
			toast.error(result.message)
			errorValidation.value = {}
		}
		else {
			errorValidation.value= {}
			toast.success('Chỉnh sửa thông tin mã giảm giá thành công')
		}
    }
    const fetchDetailVoucher  = async (id) => {
        const result = await store.dispatch('admin/voucher/' + voucher.get_detail_voucher, id)
        if(result.ok === 'error' ){
            toast.error(result.message)
        }
    }
    const fetchTypeUser = async () => {
		const result = await store.dispatch('admin/voucher/' + voucher.get_type_user)
	}
	const fetchTypeProduct = async () => {
		const result = await store.dispatch('admin/voucher/' + voucher.get_type_product)
	}
    
    const toggleEdit = () => {
        edit_voucher.value = !edit_voucher.value
    }
    const schema = object({
        code: string().trim().notRequired()
        .test('code-if-not-empty', 'Mã giảm giá tối thiểu 5 ký tự', (value) => {
            //có rỗng thì -> true
            //''là false nhưng !false=true;
            return !value || value.length >= 5
        }),
        name: string().trim().notRequired()
        .test('name-if-not-empty', 'Tên người dùng tối thiểu 5 ký tự', (value) => {
            return !value || value.length >= 5
        }),
        type: string().notRequired(),
        percent: string().trim().notRequired()
        .test('percent-if-not-empty', 'Vui lòng nhập một số', (value) => {
            if (!value) return true;
            return /^\d+$/.test(value);
        }),
        max_money: string().trim().notRequired()
        .test('max-money-if-not-empty', 'Vui lòng nhập một số', (value) => {
            if (!value) return true;
            return /^\d+$/.test(value);
        }),
        money_discount: string().trim().notRequired()
        .test('money-discount-if-not-empty', 'Vui lòng nhập một số', (value) => {
            if (!value) return true;
            return /^\d+$/.test(value);
        }),
        total_user: string().trim().notRequired()
        .test('total-user-if-not-empty', 'Vui lòng nhập một số', (value) => {
            if (!value) return true;
            return /^\d+$/.test(value);
        }),
        per_use: string().trim().notRequired()
        .test('per-use-if-not-empty', 'Vui lòng nhập một số', (value) => {
            if (!value) return true;
            return /^\d+$/.test(value);
        }),
        order_price_smallest: string().trim().notRequired()
        .test('order_price_small-test-if-not-empty', 'Vui lòng nhập một số', (value) => {
            if (!value) return true;
            return /^\d+$/.test(value);
        }),
        user_apply: string().notRequired(),
        category_id: string().notRequired(),
        date_effect: date().notRequired(),
        date_end: date().notRequired(),
        status: string().notRequired(),
        
    })
    const { handleSubmit } = useForm({ 
        validationSchema: schema,
    })
    const { value: code, errorMessage: codeError } = useField('code')
    const { value: name, errorMessage: nameError } = useField('name')
    const { value: type, errorMessage: typeError } = useField('type')
    const { value: percent, errorMessage: percentError } = useField('percent')
    const { value: max_money, errorMessage: max_moneyError } = useField('max_money')
    const { value: money_discount, errorMessage: money_discountError } = useField('money_discount')
    const { value: total_user, errorMessage: total_userError } = useField('total_user')
    const { value: per_use, errorMessage: per_useError } = useField('per_use')
    const { value: order_price_smallest, errorMessage: order_price_smallestError } = useField('order_price_smallest')
    const { value: user_apply, errorMessage: user_applyError } = useField('user_apply')
    const { value: category_id, errorMessage: category_idError } = useField('category_id')
    const { value: date_effect, errorMessage: date_effectError } = useField('date_effect')
    const { value: date_end, errorMessage: date_endError } = useField('date_end')
    const { value: status, errorMessage: statusError } = useField('status')
    
    const onSubmitEditVoucher = handleSubmit(
        (values) => {
            
            const formData = new FormData();
            for (const key in values) {
                if(values[key]){
                    if(key == 'date_effect' || key == 'date_end' ){
                        formData.append(key, toMySQLTimestampLocal(values[key]))
                    }   
                    else {
                        formData.append(key, values[key])
                    }
                }
            }
            
            
            if(add_user_code.value  !== '') formData.append('add_user_monoply', add_user_code.value)
            if (delete_user_monoply.value.length !== 0) {
                delete_user_monoply.value.forEach((code) => {
                    formData.append('delete_user_monoply[]', code)
                })
            }
            if(img.value) formData.append('img', img.value)
            
            formData.forEach((value, key) => {
                //console.log(`${key}: ${value}`)
            })
            if (([...formData.entries()].length === 0)) {
                scrollToTop()
                toggleEdit()
                toast.success('Không có thông tin nào được chỉnh sửa')
            } 
            else {
                fetchEditVoucher(id.value, formData);
                scrollToTop()
                toggleEdit()
                
            }
           
        },
        (errors) => {
            toast.error('Chỉnh sửa thông tin mã giảm giá thất bại')
        }
    )
    
    const edit_voucher = ref(false)
    const add_user_code = ref("")
    const delete_user_code = ref("");
    const isDark = computed( () => store.state.isDark);
    const types_user =  computed(() => store.state.admin.voucher.types_user);
	const types_product = computed(() => store.state.admin.voucher.types_product);
    const delete_user_monoply = ref([])
    const errorValidation = ref({});
    onMounted(() => {
        fetchTypeUser()
        fetchTypeProduct()
        if (!detail_voucher.value || Object.keys(detail_voucher.value).length === 0) {
            fetchDetailVoucher(id.value)
            console.log('CALL API')
        } else {
            console.log('Lấy trong getter') // 👉 Object có dữ liệu
        }  
    })

</script>

<template>
    <div class="px-5 py-4 h-full bg-white dark:bg-gray-900 transition-all duration-500 dark:shadow-gray-800 dark:border-gray-700 shadow-md shadow-gray-500 font-(family-name:--font-noto) m-4 border-1 border-[var(--color_border)] rounded-sm">
        <div class="bg-white dark:bg-gray-800 dark:text-white flex items-center transition-all duration-500 dark:border-[var(--dark_maincolor)] text-lg pl-1 border-l-5 mb-4 border-[var(--maincolor)]  font-bold mt-2">
            <router-link :to="{name: 'admin_sadboizz.voucher'}">
                <font-awesome-icon :icon="['fas', 'arrow-left']"  class="mt-1 cursor-pointer text-2xl p-3 hover:text-[var(--maincolor)]  hover:scale-[1.2] transition-all duration-200  dark:text-gray-300 dark:hover:text-[var(--dark_maincolor)]" />
            </router-link>
            <p>Thông tin chi tiết của mã giảm giá</p>
        </div>
        <form action="">
            <div class="grid grid-cols-12 gap-5 mt-4">
                <div class="col-span-12">
                    <p v-for="(value, key, index) in errorValidation" :key="key" class="text-red-500">
                        {{ value[0] }}
                    </p>
                </div>
                <div class="col-span-12 border-b-1 pb-3 border-[var(--color_border)] dark:border-gray-600">
                    <div class="flex items-center justify-between">
                        <div>
                            <label for="idvoucher" class="font-bold text-lg text-gray-900 dark:text-gray-200">ID Voucher</label>
                            <div v-if="edit_voucher" class="mt-1">
                                <input v-model="code" type="text" :placeholder="detail_voucher?.code" class="w-full border-1 outline-0 border-[var(--color_border)] dark:border-gray-600 rounded-sm px-2 py-1 bg-white dark:bg-gray-800 transition-all duration-500 text-gray-900 dark:text-gray-200">
                                <span class="input-config-error">{{ codeError }}</span>
                            </div>   
                            <p v-else class="text-gray-800 dark:text-gray-300">{{ detail_voucher?.code }}</p>
                            
                        </div>
                        <div v-if="edit_voucher" @click="toggleEdit()" class="flex cursor-pointer items-center px-3 gap-2 bg-yellow-200 dark:bg-yellow-600 py-1 rounded-sm border-1 border-yellow-900 dark:border-yellow-700 hover:scale-[1.1] transition-all duration-500 hover:bg-yellow-300 dark:hover:bg-yellow-500">
                            <font-awesome-icon :icon="['fas', 'pen-to-square']" class="text-yellow-900 dark:text-yellow-100 text-xl" />
                            <p class="font-bold text-yellow-900 dark:text-yellow-100">Huỷ chỉnh sửa</p>
                        </div>
                        <div  v-else @click="toggleEdit()" class="cursor-pointer flex items-center px-3 gap-2 bg-yellow-200 dark:bg-yellow-600 py-1 rounded-sm border-1 border-yellow-900 dark:border-yellow-700 hover:scale-[1.1] transition-all duration-500 hover:bg-yellow-300 dark:hover:bg-yellow-500">
                            <font-awesome-icon :icon="['fas', 'pen-to-square']" class="text-yellow-900 dark:text-yellow-100 text-xl" />
                            <p class="font-bold text-yellow-900 dark:text-yellow-100">Chỉnh sửa</p>
                        </div>
                        
                    </div>
                        
                </div>

                <div class="col-span-4">
                    <label for="nameprogram" class="font-bold text-gray-900 dark:text-gray-200">Tên chương trình</label>
                    <div v-if="edit_voucher" class="mt-1 ">
                        <input v-model="name" type="text" :placeholder="detail_voucher?.name" class="w-full border-1 border-[var(--color_border)] dark:border-gray-600 rounded-sm px-2 py-1 bg-white dark:bg-gray-800 transition-all duration-500 text-gray-900 dark:text-gray-200">
                        <span class="input-config-error">{{ nameError }}</span>
                    </div>
                    <p v-else class="italic text-sm mt-1 text-gray-800 dark:text-gray-300">{{ detail_voucher?.name }}</p>
                    
                </div>

                <div class="col-span-4">
                    <label for="" class="font-bold text-gray-900 dark:text-gray-200">Loại mã giảm giá</label>
                    <div v-if="edit_voucher">
                        <Menu as="div" class="relative block text-left">
                            <MenuButton class="w-full">
                                <div class="bg-white dark:bg-gray-800 transition-all duration-500 border-1 border-[var(--color_border)] dark:border-gray-600 py-1 mt-1 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer">
                                    <span class="text-gray-900 dark:text-gray-200">--{{ type || detail_voucher?.type }}--</span>
                                    <font-awesome-icon :icon="['fas', 'angle-down']" class="dark:text-white" />
                                </div>
                            </MenuButton>

                            <MenuItems class="absolute left-0 mt-2 w-full p-1 origin-top-right bg-white dark:bg-gray-800 transition-all duration-500 border rounded-md shadow-lg z-50 dark:border-gray-600">
                                <div class="py-1">
                                    <MenuItem class="mb-2 cursor-pointer">
                                        <p @click="type = 'percent' " class="lock px-2 py-1 rounded-[0.2rem] hover:bg-[var(--background-color-gray)] dark:hover:bg-gray-700 capitalize">percent</p>
                                    </MenuItem>
                                    <MenuItem class="mb-2 cursor-pointer">
                                        <p @click="type = 'money' " class="lock px-2 py-1 rounded-[0.2rem] hover:bg-[var(--background-color-gray)] dark:hover:bg-gray-700 capitalize">money</p>
                                    </MenuItem>
                                </div>
                            </MenuItems>
                        </Menu>
                        <span class="input-config-error">{{ typeError }}</span>
                    </div>
                    <p v-else class="italic text-sm mt-1 text-gray-800 dark:text-gray-300">{{ detail_voucher?.type }}</p>
                </div>
                <div class="col-span-4">
                    <label for="percentdecrease" class="font-bold text-gray-900 dark:text-gray-200">Số % giảm</label>
                    <div v-if="edit_voucher" class="mt-1">
                        <input v-model="percent" id="percentdecrease" :placeholder="detail_voucher?.percent" type="text" class="w-full border-1 border-[var(--color_border)] dark:border-gray-600 rounded-sm px-2 py-1 bg-white dark:bg-gray-800 transition-all duration-500 text-gray-900 dark:text-gray-200">
                        <span class="input-config-error">{{ percentError }}</span>
                    </div>
                    <p v-else class="italic text-sm mt-1 text-gray-800 dark:text-gray-300">{{ detail_voucher?.percent }}%</p>
                </div>
                <div class="col-span-4">
                    <label for="percentdecrease" class="font-bold text-gray-900 dark:text-gray-200">Số tiền giảm tối đa</label>
                    <div v-if="edit_voucher" class="mt-1">
                        <input v-model="max_money" id="percentdecrease" :placeholder="detail_voucher?.max_money" type="text" class="w-full border-1 border-[var(--color_border)] dark:border-gray-600 rounded-sm px-2 py-1 bg-white dark:bg-gray-800 transition-all duration-500 text-gray-900 dark:text-gray-200">
                        <span class="input-config-error">{{ max_moneyError }}</span>
                    </div>
                    <p v-else class="italic text-sm mt-1 text-gray-800 dark:text-gray-300">{{ formatMoney(detail_voucher?.max_money) }}</p>
                    
                </div>
                <div class="col-span-4">
                    <label class="font-bold text-gray-900 dark:text-gray-200">Số tiền giảm, loại mã money</label>
                    <div v-if="edit_voucher" class="mt-1">
                        <input v-model="money_discount" :placeholder="detail_voucher?.money_discount" type="text" class="w-full border-1 border-[var(--color_border)] dark:border-gray-600 rounded-sm px-2 py-1 bg-white dark:bg-gray-800 transition-all duration-500 text-gray-900 dark:text-gray-200">
                        <span class="input-config-error">{{ money_discountError }}</span>
                    </div>
                    <p v-else class="italic text-sm mt-1 text-gray-800 dark:text-gray-300">{{ formatMoney(detail_voucher?.money_discount) }}</p>
                    
                </div>
                <div class="col-span-4">
                    <label for="totaluse" class="font-bold text-gray-900 dark:text-gray-200">Số lượng sử dụng tối đa</label>
                    <div v-if="edit_voucher" class="mt-1">
                        <input v-model="total_user" id="totaluse" :placeholder="detail_voucher?.total_user"  type="text" class="w-full border-1 border-[var(--color_border)] dark:border-gray-600 rounded-sm px-2 py-1 bg-white dark:bg-gray-800 transition-all duration-500 text-gray-900 dark:text-gray-200">
                        <span class="input-config-error">{{ total_userError }}</span>
                    </div>
                    <p v-else class="italic text-sm mt-1 text-gray-800 dark:text-gray-300">{{ detail_voucher?.total_user }} lần</p>
                    
                </div>

                <div class="col-span-4">
                    <label for="peruse" class="font-bold text-gray-900 dark:text-gray-200">Số lượng sử dụng của mỗi người</label>
                    <div v-if="edit_voucher" class="mt-1 ">
                        <input v-model="per_use" id="peruse" :placeholder="detail_voucher?.per_use" type="text"  class="w-full border-1 border-[var(--color_border)] dark:border-gray-600 rounded-sm px-2 py-1 bg-white dark:bg-gray-800 transition-all duration-500 text-gray-900 dark:text-gray-200">
                        <span class="input-config-error">{{ per_useError }}</span>
                    </div>
                    <p v-else class="italic text-sm mt-1 text-gray-800 dark:text-gray-300">{{ detail_voucher?.per_use }} lần</p>
                    
                </div>

                <div class="col-span-4">
                    <label for="pricesmallest" class="font-bold text-gray-900 dark:text-gray-200">Giá trị đơn hàng tối thiểu để áp dụng</label>
                    <div v-if="edit_voucher" class="mt-1">
                        <input v-model="order_price_smallest" id="pricesmallest" :placeholder="detail_voucher?.order_price_smallest" type="text" class="w-full border-1 border-[var(--color_border)] dark:border-gray-600 rounded-sm px-2 py-1 bg-white dark:bg-gray-800 transition-all duration-500 text-gray-900 dark:text-gray-200">
                        <span class="input-config-error">{{ order_price_smallestError }}</span>
                    </div>
                    <p v-else class="italic text-sm mt-1 text-gray-800 dark:text-gray-300">{{ formatMoney(detail_voucher?.order_price_smallest) }}</p>
                    
                </div>

                <div class="col-span-4">
                    <label for="nameprogram" class="font-bold text-gray-900 dark:text-gray-200">Đối tượng sử dụng</label>
                    <div v-if="edit_voucher">
                        <Menu as="div" class="relative block text-left">
                            <MenuButton class="w-full">
                                <div class="bg-white dark:bg-gray-800 transition-all duration-500 border-1 border-[var(--color_border)] dark:border-gray-600 py-1 mt-1 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer">
                                    <span class="text-gray-900 dark:text-gray-200">--{{ user_apply ||  detail_voucher?.user_apply }}--</span>
                                    <font-awesome-icon :icon="['fas', 'angle-down']" />
                                </div>
                            </MenuButton>

                            <MenuItems class="absolute left-0 mt-2 w-full p-1 origin-top-right bg-white dark:bg-gray-800 transition-all duration-500 border rounded-md shadow-lg z-50 dark:border-gray-600">
                                <div class="py-1">
                                    <MenuItem v-for="(user, index) in types_user" :key="index" class="mb-2 cursor-pointer">
                                        <p @click="user_apply = user.code" class="block px-2 py-1 rounded-[0.2rem] hover:bg-[var(--background-color-gray)] dark:hover:bg-gray-700 capitalize">{{ user.code }}</p>
                                    </MenuItem>
                                
                                </div>
                            </MenuItems>
                        </Menu>
                        <span class="input-config-error"></span>
                    </div>
                    <p v-else class="italic text-sm mt-1 text-gray-800 dark:text-gray-300">Khách hàng {{ detail_voucher?.user_apply }}</p>
                    
                </div>
                <div class="col-span-4">
                    <label for="nameprogram" class="font-bold text-gray-900 dark:text-gray-200">Sản phẩm áp dụng</label>
                    <div v-if="edit_voucher">
                        <Menu as="div" class="relative block text-left">
                            <MenuButton class="w-full">
                                <div class="bg-white dark:bg-gray-800 transition-all duration-500 border-1 border-[var(--color_border)] dark:border-gray-600 py-1 mt-1 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer">
                                    <span class="text-gray-900 dark:text-gray-200">--{{ types_product.find(type => type.id === category_id)?.code || detail_voucher?.product_apply }}--</span>
                                    <font-awesome-icon :icon="['fas', 'angle-down']" />
                                </div>
                            </MenuButton>
                            <MenuItems class="absolute left-0 mt-2 w-full p-1 origin-top-right bg-white dark:bg-gray-800 transition-all duration-500 border rounded-md shadow-lg z-50 dark:border-gray-600">
                                <div class="py-1">
                                    <MenuItem v-for="(product, index) in types_product" :key="index" class="mb-2 cursor-pointer">
                                        <p @click="category_id = product.id" class="lock px-2 py-1 rounded-[0.2rem] hover:bg-[var(--background-color-gray)] dark:hover:bg-gray-700 capitalize">
                                            {{ product.code }}
                                        </p>
                                    </MenuItem>
                                
                                </div>
                            </MenuItems>
                        </Menu>
                        <span class="input-config-error"></span>
                    </div>
                    <p v-else class="italic text-sm mt-1 text-gray-800 dark:text-gray-300">{{ detail_voucher?.product_apply }}</p>
                    
                </div>
                <div class="col-span-4">
                    <label for="nameprogram" class="font-bold text-gray-900 dark:text-gray-200">Ngày có hiệu lực</label>
                    <div v-if="edit_voucher" class="flex h-8 flex-col" :class="isDark ? 'dark' : 'light' ">
                        <VueDatePicker
                            class="dark:bg-gray-800 transition-all duration-500 bg-white mt-0.5 rounded-sm dark:text-white  dark:border-gray-600"
                            v-model="date_effect"
                            :enable-time-picker="false"
                            input-class="border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
                            menu-class="rounded-lg bg-white dark:bg-gray-800"
                            :placeholder="detail_voucher?.date_effect"
                            format="dd-MM-yyyy HH:mm:ss"
                        />
                        <span class="input-config-error"></span>
                    </div>
                    <p v-else class="italic text-sm mt-1 text-gray-800 dark:text-gray-300">{{ detail_voucher?.date_effect }}</p>
                    
                </div>

                <div class="col-span-4">
                    <label for="nameprogram" class="font-bold text-gray-900 dark:text-gray-200">Ngày hết hạn</label>
                    <div v-if="edit_voucher" class="flex h-8 flex-col" :class="isDark ? 'dark' : 'light' ">
                        <VueDatePicker
                            class="dark:bg-gray-800 bg-white mt-0.5 rounded-sm dark:text-white  dark:border-gray-600"
                            v-model="date_end"
                            :enable-time-picker="false"
                            input-class="border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
                            menu-class="rounded-lg bg-white dark:bg-gray-800"
                            :placeholder="detail_voucher?.date_end"
                            format="dd-MM-yyyy HH:mm:ss"
                        />
                        <span class="input-config-error"></span>
                    </div>
                    <p v-else class="italic text-sm mt-1 text-gray-800 dark:text-gray-300">{{ detail_voucher?.date_end }}</p>
                    
                </div>
                <div class="col-span-4">
                    <label for="nameprogram" class="font-bold text-gray-900 dark:text-gray-200">Trạng thái mã</label>
                    <div v-if="edit_voucher" >
                        <Menu as="div" class="relative block text-left">
                            <MenuButton class="w-full">
                                <div class="bg-white dark:bg-gray-800 border-1 border-[var(--color_border)] dark:border-gray-600 py-1 mt-1 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer">
                                    <span class="text-gray-900 dark:text-gray-200">--{{ status || voucher_status[detail_voucher?.status]?.title }}--</span>
                                    <font-awesome-icon :icon="['fas', 'angle-down']" />
                                </div>
                            </MenuButton>

                            <MenuItems class="absolute left-0 mt-2 w-full p-1 origin-top-right bg-white dark:bg-gray-800 border rounded-md shadow-lg z-50 dark:border-gray-600">
                                <div class="py-1">
                                    <MenuItem v-for="(voucher, key, index) in voucher_status" :key="index" class="mb-1 cursor-pointer">
                                        <p @click="status = key" :class="voucher.bg" class="block px-2 py-1 rounded-[0.2rem] text-gray-800 dark:text-gray-100">
                                            {{ voucher.title }}
                                        </p>
                                    </MenuItem>
                                    
                                </div>
                            </MenuItems>
                        </Menu>
                        <span class="input-config-error"></span>
                    </div>
                    <p v-else :class="voucher_status[detail_voucher?.status]?.bg" class="py-1 rounded-[0.2rem] mt-1 text-sm w-[75%] uppercase font-bold text-center text-gray-800 dark:text-gray-100">{{ voucher_status[detail_voucher?.status]?.title }}</p>
                    
                </div>
                <div class="col-span-4">
                    <label for="nameprogram" class="font-bold text-gray-900 dark:text-gray-200">Dành riêng cho khách hàng</label>
                    <Menu as="div" class="relative block text-left">
                        <MenuButton class="w-full">
                            <div class="bg-white dark:bg-gray-800 border-1 border-[var(--color_border)] dark:border-gray-600 py-1 mt-1 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer">
                                <span class="text-gray-900 dark:text-gray-200">--Danh sách khách hàng--</span>
                                <font-awesome-icon :icon="['fas', 'angle-down']" />
                            </div>
                        </MenuButton>

                        <MenuItems class="absolute left-0 mt-2 w-full p-1 origin-top-right bg-white dark:bg-gray-800 border rounded-md shadow-lg z-50 dark:border-gray-600">
                            <div class="py-1">
                                <MenuItem v-for="(user, index) in detail_voucher?.list_user_monoply" :key="index" class="mb-2 cursor-pointer">
                                    <p  class="lock px-2 py-1 rounded-[0.2rem] hover:bg-[var(--background-color-gray)] dark:hover:bg-gray-700 capitalize text-gray-800 dark:text-gray-100">
                                        {{ user.code }} - {{ user.name }}
                                    </p>
                                </MenuItem>
                                <p v-show="detail_voucher?.add_user_monoply==0" class="p-2">Không có khách hàng nào</p>
                                
                            </div>
                        </MenuItems>
                    </Menu>
                </div>
                <div v-show="edit_voucher" class="col-span-8">
                    <div class="text-gray-900 dark:text-gray-200">Lựa chọn</div>
                    <div class="flex items-center gap-2 text-sm mt-1">
                        <!-- Thêm khách hàng -->
                        <Dialog>
                            <DialogTrigger>
                                <div class="flex items-center border-1 border-green-700 dark:border-green-600 bg-green-400 dark:bg-green-600 px-3 py-1.5 rounded-sm mr-3 cursor-pointer transition-all duration-200 hover:bg-green-500 dark:hover:bg-green-700 hover:scale-105">
                                    <font-awesome-icon :icon="['fas', 'folder-plus']" />
                                    <p class="ml-1 text-gray-800 dark:text-gray-100">Thêm khách hàng</p>
                                </div>
                            </DialogTrigger>
                            <DialogContent class="bg-white dark:bg-gray-800 dark:text-gray-100">
                                <DialogHeader>
                                    <DialogTitle>
                                        <p class="text-[1.3rem] pb-3 border-b-1 border-[var(--color_border)] dark:border-gray-600">Thêm một khách hàng sử dụng độc quyền</p>
                                    </DialogTitle>
                                    <DialogDescription>
                                        <div class="flex flex-col mt-4">
                                            <label for="" class="text-black dark:text-gray-200 font-bold text-base mb-2">Nhập mã khách hàng</label>
                                            <input v-model="add_user_code" type="text" placeholder="U001" class="border-1 border-[var(--color_border)] dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 outline-0 py-1 px-2 rounded-sm">
                                            <p>{{ add_user_code }}</p>
                                            
                                        </div>                       
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <DialogClose as-child>
                                        
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        <!-- Xóa khách hàng -->
                        <Dialog>
                            <DialogTrigger>
                                <div class="flex items-center border-1 border-green-700 dark:border-green-600 bg-green-400 dark:bg-green-600 px-3 py-1.5 rounded-sm mr-3 cursor-pointer transition-all duration-200 hover:bg-green-500 dark:hover:bg-green-700 hover:scale-105">
                                    <font-awesome-icon :icon="['fas', 'folder-plus']" />
                                    <p class="ml-1 text-gray-800 dark:text-gray-100">Xoá khách hàng</p>
                                </div>
                            </DialogTrigger>
                            <DialogContent class="bg-white dark:bg-gray-800 dark:text-gray-100">
                                <DialogHeader>
                                    <DialogTitle>
                                        <p class="text-[1.1rem] pb-3 border-b-1 border-[var(--color_border)] dark:border-gray-600">Xoá một khách hàng</p>
                                    </DialogTitle>
                                    <DialogDescription>
                                        <div class="mt-1 text-black dark:text-gray-200">
                                            <p class="font-bold mb-2">Danh sách khách hàng hiện có</p>
                                            <div class="max-h-50 custom-scrollbar overflow-y-auto">
                                                <div v-for="(user, index) in detail_voucher?.list_user_monoply" :key="index" class="flex items-center justify-between mb-3">
                                                    <div>
                                                        <p>{{ user.code }}</p>
                                                        <p>{{ user.name }}</p>
                                                    </div>
                                                    <font-awesome-icon @click="delete_user_use_monoply(user)" :icon="['fas', 'xmark']" class="text-red-500 dark:text-red-400 text-xl cursor-pointer p-2" />
                                                </div>
                                               
                                                <div class="flex gap-5 mt-2">
                                                    <p v-for="(user, index) in delete_user_monoply" :key="index">{{ detail_voucher?.list_user_monoply.find(monopoly => monopoly?.id === user)?.name }}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <DialogClose as-child>
                                      
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <div class="col-span-12">
                    <p class="font-bold mb-3 text-gray-900 dark:text-gray-200">Ảnh mã giảm giá</p>
                    <label v-show="edit_voucher" for="uploadimg_voucher" class="cursor-pointer text-white font-(family-name:--font-winky) py-2 px-10 mb-2 inline-block rounded-sm bg-blue-900 dark:bg-blue-700">
                        <font-awesome-icon :icon="['fas', 'cloud-arrow-up']" />
                        <span class="ml-2 ">Chọn ảnh</span>
                    </label>
                    <input type="file" @change="show_img($event)" id="uploadimg_voucher" class="hidden">
                    <div class="flex items-center flex-wrap mt-1">
                        <div class="mr-5">
                            <font-awesome-icon 
                                v-show="edit_voucher"
                                @click="clear_img"
                                class="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full cursor-pointer border-1 border-black dark:border-gray-600 relative left-21 top-4" 
                                :icon="['fas', 'xmark']" 
                            />
                            <img 
                                :src="preview_img ? preview_img : detail_voucher?.img"
                                class="w-25 h-20 border-1 border-black dark:border-gray-600 rounded-sm" 
                                alt="">
                        </div>
                    </div>
                </div>
                <div  class="col-span-12 mt-5 transition-all duration-500 flex items-center bg-white dark:bg-gray-900">
                    <div v-if="edit_voucher" @click="onSubmitEditVoucher()" class="px-15 cursor-pointer py-1.5 rounded-sm mr-5 bg-green-300 dark:bg-green-700 hover:bg-green-200 dark:hover:bg-green-600 hover:text-black dark:hover:text-white hover:scale-[1.1] duration-300 transition-all text-green-900 dark:text-green-200 font-bold border border-green-900 dark:border-green-500">
                        Lưu lại
                    </div>
                </div>
                <div class="col-span-12 border-t-1 border-[var(--color_border)] dark:border-gray-600 pt-6">
                    <p class="font-bold text-xl text-gray-900 dark:text-gray-200">Danh sách khách hàng đã sử dụng</p>
                    <div class="max-h-60 custom-scrollbar overflow-y-auto">
                        <div  class="mt-2  text-gray-800 dark:text-gray-300">
                            <div class="flex mt-1">
                                <p>ID khách hàng:</p>
                                <p class="ml-2">123</p>
                            </div>
                            <div class="flex mt-1">
                                <p>Tên khách hàng:</p>
                                <p class="ml-2 capitalize">123</p>
                            </div>
                          
                        </div>
                        <div  class="mt-2  text-gray-800 dark:text-gray-300">
                            <div class="flex mt-1">
                                <p>ID khách hàng:</p>
                                <p class="ml-2">123</p>
                            </div>
                            <div class="flex mt-1">
                                <p>Tên khách hàng:</p>
                                <p class="ml-2 capitalize">123</p>
                            </div>
                          
                        </div>
                        <div  class="mt-2  text-gray-800 dark:text-gray-300">
                            <div class="flex mt-1">
                                <p>ID khách hàng:</p>
                                <p class="ml-2">123</p>
                            </div>
                            <div class="flex mt-1">
                                <p>Tên khách hàng:</p>
                                <p class="ml-2 capitalize">123</p>
                            </div>
                          
                        </div>
                    </div>
                    
                    
                </div>

            </div>
        </form>
        
       
    </div>
</template>

<style scoped>
:deep(.dp__input) {
    height: 1.8rem; /* h-10 */
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

.custom-multiselect {
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid var(--color_border);
}

.custom-multiselect .multiselect__input {
  padding: 1px 12px;
}

.custom-multiselect .multiselect__option {
  font-size: 14px;
  padding: 10px;
}

.custom-multiselect:focus {
  outline: none;
}
</style>
