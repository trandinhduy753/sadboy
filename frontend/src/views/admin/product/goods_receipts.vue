<script setup>
    import product_infor from '@/views/admin/product/product_infor.vue';
    import { randomString, toMySQLTimestampLocal, formatMoney, optionFindProvide } from '@/composables'
    import { product, cash_book } from '@/constant'
    import { useStore } from 'vuex'
    import { useToast } from 'vue-toastification'
    import { useForm, useField } from 'vee-validate'
    import { object, string, date, number } from 'yup'
    const toast = useToast()
    const store = useStore();
    const router = useRouter();
    const isDark = computed( () => store.state.isDark)
    const employee = computed(() => store.state.admin.account.employee )
    const {
        fetchListProvide,
        fetchFindProvide,
        load_add_provides
    } = optionFindProvide()

    const fetchInfoProvideStock = async () => {
        const result = await store.dispatch('admin/product/' + product.get_info_stock)
        if(result.ok === 'error' ){
            toast.error(result.message)
        }
    }
    const fetchAddGoodsReceipt =  async (data) => {
        const result = await store.dispatch('admin/product/' + product.add_goods_receipt, data)
        if(result.ok === 'error' ){
            toast.error(result.message)
        }
    }
    const fetchListGoodsReceipt = async (start=0, end=20) => {
        const result = await store.dispatch('admin/cash_book/' + cash_book.get_list_goods_receipt, { start, end } )
        if(result.ok === 'error' ){
            toast.error(result.message)
        }
    }
    const handle_show_input = () => {
        if(!isShowFindProduct.value){ 
            toast.info('vui lòng chọn kho nhận hàng và nhà cung cấp')
        }
    }
    const handleBookOrder = async (data) => {
        var data = {...data, ...inforGoodsReceipt.value}

        fetchListGoodsReceipt(0,20)
        fetchAddGoodsReceipt(data)
        toast.success('Thêm một phiếu đặt hàng thành công')

        setTimeout(() => {
           router.push({name: 'admin_sadboizz.cashbook.order_provider.list_import'})
        }, 1000)
    }
    
    const schema = object({
        code: string().required('Mã đơn hàng không được để trống').trim().min(5, 'Mã phiếu nhập hàng tối thiểu 5 ký tự'),
        employee_id: string().required('Tên nhân viên không được để trống').trim(),
        date_receive: date().required('Ngày nhận hàng dự kiến không được để trống'),
        note: string().trim().notRequired()
       
    })
    const { handleSubmit } = useForm({ 
        validationSchema: schema,
        initialValues: {
            code: randomString(10),
            employee_id: employee.value?.id
        }
    
    })
    const { value: code, errorMessage: codeError } = useField('code')
    const { value: employee_id, errorMessage: employee_idError } = useField('employee_id')
    const { value: date_receive, errorMessage: date_receiveError } = useField('date_receive')
    const { value: note, errorMessage: noteError } = useField('note')
    const onManualSubmit = handleSubmit(
        (values) => {
            if(list_product_order.value == 0){
                toast.error('Vui lòng chọn sản phẩm để đặt hàng')
            } 
            else {
                values['date_receive'] = toMySQLTimestampLocal(values['date_receive'])
                handleBookOrder(values)
            }
           
        },
        (errors) => {
            toast.error('Thêm phiếu đặt hàng thất bại')
        }
    )
  
    const list_stock = computed(() => store.getters['admin/product/get_list_stock'] )
    const list_provide = computed(() => store.state.admin.provide.provides);
    const list_product_order = computed(() => store.getters['admin/product/get_list_product_order'] )
   
    const stock_id = ref(-1);
    const provide_id = ref(-1);
    const isShowFindProduct = computed(() => {
        if(stock_id.value != -1 && provide_id.value != -1){

            return true;
        }
        return false;
    })
    const inforGoodsReceipt = computed(() => {
        const subtotal = list_product_order.value.reduce(
            (sum, product) => sum + Number(product.subtotal || 0),
            0
        );

        const count = list_product_order.value.reduce(
            (sum, product) => sum + Number(product.totalCount || 0),
            0
        );

        const data = {
            products: list_product_order.value,
            subtotal,
            count,
            discount: 0,
            other_cost: 0,
            total: subtotal,
            provide_id: provide_id.value,
            stock_id: stock_id.value
        };

        data.total = subtotal - Number(data.discount) + Number(data.other_cost);
        return data;
    })
    onMounted(async () => {
        await Promise.all([
            fetchInfoProvideStock(),
            fetchListProvide()
        ])
    })
</script>

<template>

    <div class="bg-white flex items-center dark:bg-gray-800 transition-all duration-500 dark:text-white  pl-1 border-l-5 mb-4 border-[var(--maincolor)] dark:border-[var(--dark_maincolor)] font-bold ">
        <router-link :to="{name: 'admin_sadboizz.product'}">
            <font-awesome-icon :icon="['fas', 'arrow-left']"  class="mt-1 cursor-pointer text-2xl p-3 hover:text-[var(--maincolor)]  hover:scale-[1.2] transition-all duration-200  dark:text-gray-300 dark:hover:text-[var(--dark_maincolor)]" />
        </router-link>
        <p class="ml-1">Tạo một phiếu nhập hàng</p>
    </div>
    <div class="grid grid-cols-12 gap-5">
        <div class="col-span-6 bg-white dark:bg-gray-800 transition-all duration-500 p-4 rounded-md">
            <p class="font-bold text-gray-800 dark:text-gray-300 border-b-1 border-[var(--color_border)] pb-3">Nhà cung cấp</p>
            <Menu as="div" class="relative block text-left">
                <MenuButton class="w-full">
                    <div class="bg-white dark:bg-gray-700 dark:px-2 transition-all duration-500 text-base font-bold text-gray-800 dark:text-gray-300 py-1 mt-3 rounded-sm text-left flex items-center justify-between cursor-pointer">
                        <span>{{ list_provide[provide_id]?.name || 'Chọn nhà cung cấp' }}</span>
                        <font-awesome-icon :icon="['fas', 'angle-down']" />
                    </div>
                </MenuButton>

                <MenuItems class="absolute left-0 mt-2 w-full p-1 origin-top-right bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-md shadow-lg z-50">
                    <div class="py-1">
                        <MenuItem @click.prevent class="mb-1 cursor-pointer">
                            <input type="text" @input="fetchFindProvide($event)" class="w-full outline-none border-1 border-[var(--color_border)] dark:border-gray-600 rounded-sm pl-2 py-1.5 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                        </MenuItem>
                        
                        <MenuItem v-for="(provide, index) in list_provide" :key="index" class="mb-1 cursor-pointer">
                            <p @click="provide_id = index" class="block px-2 py-1 hover:bg-[var(--background-color-gray)] dark:hover:bg-gray-600 rounded-[0.2rem]">
                                {{ provide.name }}
                            </p>
                        </MenuItem>
                    </div>
                </MenuItems>
            </Menu>
            
        </div>
        <div class="col-span-6 bg-white dark:bg-gray-800 transition-all duration-500 p-4 rounded-md">
            <p class="font-bold text-gray-800 dark:text-gray-300 border-b-1 border-[var(--color_border)] pb-3">Kho nhận</p>
            <Menu as="div" class="relative block text-left">
                <MenuButton class="w-full">
                    <div class="bg-white dark:bg-gray-700 dark:px-2 transition-all duration-500 text-base font-bold text-gray-800 dark:text-gray-300 py-1 mt-3 rounded-sm text-left flex items-center justify-between cursor-pointer">
                        <span>{{ list_stock[stock_id]?.name || 'Chọn kho sẽ nhận hàng' }}</span>
                        <font-awesome-icon :icon="['fas', 'angle-down']" />
                    </div>
                </MenuButton>

                <MenuItems class="absolute left-0 mt-2 w-full p-1 origin-top-right bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-md shadow-lg z-50">
                    <div class="py-1">
                        <MenuItem v-for="(stock, index) in list_stock" :key="index" class="mb-1 cursor-pointer">
                            <p @click="stock_id = stock?.id" class="block px-2 py-1 hover:bg-[var(--background-color-gray)] dark:hover:bg-gray-600 rounded-[0.2rem]">
                                {{ stock.name }}
                            </p>
                        </MenuItem>
                    </div>
                </MenuItems>
            </Menu>
            
        </div>

        <div class="col-span-12 p-5 bg-white dark:bg-gray-800 -mb-10 transition-all duration-500">
            <p class="font-bold border-b-1 border-[var(--color_border)] dark:border-gray-700 pb-3 text-gray-900 dark:text-gray-100">Sản phẩm</p>
        </div>
        <div class="col-span-12 z-1">
            <product_infor  :provide_id="provide_id" class="relative">
                <font-awesome-icon 
                    :icon="['fas', 'magnifying-glass']" 
                    class="absolute top-3 left-8 text-gray-500 dark:text-gray-400" 
                />
                <input 
                    type="text" 
                    placeholder="Tìm kiếm sản phẩm" 
                    class="w-full pl-10 border border-[var(--color_border)] rounded-sm p-2 
                        bg-white text-gray-800 
                        dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
                >
            </product_infor>
        </div>
        <div @click="handle_show_input()" class="col-span-12  h-15 -mt-22" :class="isShowFindProduct ? 'z-0' : 'z-20'"></div>
        <div class="col-span-6 p-5 bg-white dark:bg-gray-800 transition-all duration-500 rounded-md">
            <div class="flex flex-col">
                <label class="text-gray-800 dark:text-gray-300">Mã nhân viên sử lý đặt hàng</label>
                <input type="text" v-model="employee_id" class="mt-1 outline-none border-1 border-[var(--color_border)] dark:border-gray-600 rounded-sm pl-2 py-1.5 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                <span class="input-config-error">{{ employee_idError }}</span>
            </div>
            <div :class="isDark ? 'dark' : 'light' " class="flex flex-col mt-2">
                <label class="mb-1 text-gray-700 dark:text-gray-300">Ngày muốn nhận hàng dự kiến</label>
                <VueDatePicker
                    class="dark:bg-gray-800 bg-white mt-1 rounded-sm dark:text-white"
                    v-model="date_receive"
                    :enable-time-picker="false"
                    input-class="border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                    menu-class="rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                    format="dd-MM-yyyy HH:mm:ss"
                />
                <span class="input-config-error">{{ date_receiveError }}</span>
            </div>
            <div class="flex flex-col mt-2">
                <label class="mb-1 text-gray-800 dark:text-gray-300">Mã đơn hàng</label>
                <input v-model="code" type="text" class="mt-1 outline-none border-1 border-[var(--color_border)] dark:border-gray-600 rounded-sm pl-2 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                <span class="input-config-error">{{ codeError }}</span>
            </div>
            <div class="flex flex-col mt-2">
                <label class="mb-1 text-gray-800 dark:text-gray-300">Ghi chú</label>
                <textarea v-model="note" class="mt-1 h-20 outline-none border-1 border-[var(--color_border)] dark:border-gray-600 rounded-sm pl-2 py-1.5 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-300"></textarea>
            </div>
        </div>
        <div class="col-span-6 bg-white flex flex-col justify-between dark:bg-gray-800 transition-all duration-500 p-5 rounded-md">
            <div>
                <p class="font-bold text-gray-800 dark:text-gray-300 border-b-1 border-[var(--color_border)] dark:border-gray-600 pb-3">Chi phí mua hàng</p>
                <div class="flex justify-between items-center mt-3">
                    <p class="text-gray-800 dark:text-gray-300">Tổng số lượng đặt:</p>
                    <p class="text-gray-800 dark:text-gray-300">{{ inforGoodsReceipt?.count ? inforGoodsReceipt.count : '0' }}</p>
                </div>
                <div class="flex justify-between items-center mt-3">
                    <p class="text-gray-800 dark:text-gray-300">Tạm tính:</p>
                    <p class="text-gray-800 dark:text-gray-300">{{ inforGoodsReceipt?.subtotal ? formatMoney(inforGoodsReceipt?.subtotal) : '0 đ' }}</p>
                </div>
                <div class="flex justify-between items-center mt-3 text-blue-500 dark:text-blue-400">
                    <p>Chiết khấu:</p>
                    <p>{{ inforGoodsReceipt?.discount ? inforGoodsReceipt.discount : '0 đ' }}</p>
                </div>
                <div class="flex justify-between items-center mt-3">
                    <p class="text-gray-800 dark:text-gray-300">Chi phí nhập khác:</p>
                    <p class="text-blue-500 dark:text-blue-400">{{ inforGoodsReceipt?.other_cost ? formatMoney(inforGoodsReceipt?.other_cost) : '0 đ' }}</p>
                </div>
            </div>
            
            <div>
                <div class="flex justify-between items-center mt-3 border-t-1 border-[var(--color_border)] dark:border-gray-600 pt-3">
                    <p class="text-gray-800 dark:text-gray-300">Tổng tiền hàng:</p>
                    <p class= "italic underline underline-offset-4 text-red-500">{{ inforGoodsReceipt?.total ? formatMoney(inforGoodsReceipt?.total) : '0 đ' }}</p>
                </div>
                <div @click="onManualSubmit()" class="btn mt-5 bg-[var(--maincolor)] dark:bg-[var(--dark_maincolor)] text-white dark:text-gray-200 hover:bg-green-600 dark:hover:bg-yellow-600 py-2 px-4 rounded-md cursor-pointer">Đặt hàng</div>
            </div>
            
        </div>
    </div>
  
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 0.3s ease;
}

.animate-show {
    animation: fade-out 0.3s ease;
}
@keyframes fade-out {
    from 
    {
        opacity: 0;
        transform: scale(0);
    }
    to 
    {
        opacity: 1;
        transform: scale(1);
    }
}

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
