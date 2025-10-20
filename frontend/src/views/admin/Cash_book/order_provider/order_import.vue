<script setup>
    import { cash_book } from '@/constant'
    import { formatMoney, formatDateTime } from '@/composables'
    import { useToast } from 'vue-toastification'
    const store = useStore();
    const toast = useToast()
    const fetchListGoodsReceipt = async (start=0, end=20) => {
        const result = await store.dispatch('admin/cash_book/' + cash_book.get_list_goods_receipt, { start, end } )
        if(result.ok === 'error' ){
            toast.error(result.message)
        }
    }
    const fetchFindGoodsReceipt = async (event) => {
        find_goods_receipt.value = event.target.value.trim()
        if(find_goods_receipt.value===''){
            fetchListGoodsReceipt(0, 20)
        }
        else {
            const result = await store.dispatch('admin/cash_book/' + cash_book.find_goods_receipt, {page: 1, code: find_goods_receipt.value, count: 10})
            if(result.ok === 'error' ){
                toast.error(result.message)
            }
        }   
        
    }
    const loadAddGoodsReceipt = async (page, code, count) => {
        const result = await store.dispatch('admin/cash_book/' + cash_book.find_goods_receipt, {page, code, count})
    }
    const handleScrollLoadData = (event) => {
    const el = event.target;
        if (Math.abs(el.scrollTop + el.clientHeight - el.scrollHeight) < 1) {
            //CALL ĐỂ THÊM DỮ LIỆU
            if(find_goods_receipt.value === '') {
                const start=list_goods_receipt.value.length;
                fetchListGoodsReceipt(start, start+5)
            }
            else {
                page.value++;
                loadAddGoodsReceipt(page.value, find_goods_receipt.value, 5)
            }
            
        }
    };
    const list_goods_receipt = computed(() => store.getters['admin/cash_book/get_list_goods_receipt']);
    const sortby=computed(() => store.state.admin.cash_book.sortby);const status_goods_receipt = computed(() => store.state.admin.cash_book.status_goods_receipt );
    const change_sort = (sortby, sort_status) => store.commit('admin/cash_book/CHANGE_SORT_BY', {sortby, sort_status});
    const condition_sort = [
        {
            title: "Mã phiếu",
            name: "code",
            others: []
        },
        {
            title: "Ngày tạo",
            name: "date",
            others: []
        },
        {
            title: "Nhà cung cấp",
            name: "provide",
            others: []
        },
        {
            title: "Kho hàng",
            name: "stock",
            others: []
        },
        {
            title: "Tổng tiền",
            name: "money",
            others: []
        },
        {
            title: "Trạng thái",
            name: "status",
            others: [
                {
                    title: 'Đã giao hàng',
                    name: 'SUCCESS'
                },
                {
                    title: 'Chờ xác nhận',
                    name: 'PENDING'
                },
                {
                    title: 'Đã bị hủy',
                    name: 'CANCEL'
                },
                {
                    title: 'SHIPPING',
                    name: 'Đang vận chuyển'
                },
                {
                    title: 'Đã thanh toán',
                    name: 'BANKING'
                }
            ]
        },
        
    ]
    const page = ref(1);
    const find_goods_receipt = ref("")
    onMounted(() => {
        if(list_goods_receipt.value.length === 0 ){
            fetchListGoodsReceipt(0, 20)
        }
        
    })
    onUnmounted(() => {
        store.commit('admin/cash_book/CHANGE_POSITION_FIND', {start: 0, end: 0 })
    })
</script>

<template>
 
    <div class="bg-white dark:bg-gray-800 dark:text-white dark:border-[var(--dark_maincolor)] transition-all duration-500 py-2 pl-3 border-l-5 mb-4 border-[var(--maincolor)] font-bold mt-2">Danh sách phiếu nhập hàng</div>
    <div class="grid grid-cols-12 bg-white dark:bg-gray-800 transition-all duration-500 py-2">
        <div class="col-span-12 border-b-2 px-2 border-[var(--color_border)]  dark:border-gray-700 pb-2 text-black dark:text-gray-300"> Tất cả </div>
        <div class="col-span-12 px-2 mt-3">
            <div class="flex items-center gap-2">
                <Menu as="div" class="relative block text-left mr-5 ">
                    <MenuButton class="w-55">
                        <div class="bg-white dark:bg-gray-800 transition-all duration-500 border-1 border-[var(--color_border)] dark:border-gray-600 p-1 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer text-black dark:text-white">
                            <span>{{ sortby || '-- Điền kiện xắp xếp --'}} </span>
                            <font-awesome-icon :icon="['fas', 'angle-down']" />
                        </div>
                    </MenuButton>
                    <MenuItems class="absolute left-0 mt-2 w-full p-1 origin-top-right bg-white dark:bg-gray-800 dark:text-white border dark:border-gray-600 rounded-md shadow-lg z-50">
                        <div class="py-1">
                            <MenuItem v-for="(condition, index) in condition_sort" :key="index" class="mb-1 cursor-pointer">
                                <div>
                                    <p v-if="condition.others.length == 0" @click="change_sort(condition.name, '')" class="block px-2 py-1 rounded-[0.2rem] hover:bg-gray-100 dark:hover:bg-gray-700 capitalize">{{ condition.title }}</p>
                                    <Menu v-else as="div" class="relative block text-left mr-5 ">
                                        <MenuButton class="w-50">
                                            <div class="bg-white dark:bg-gray-800 transition-all duration-500 border-1 border-[var(--color_border)] dark:border-gray-600 p-1 rounded-sm text-left flex items-center justify-between px-2 cursor-pointer text-black dark:text-white">
                                                <span>-- Trạng thái -- </span>
                                                <font-awesome-icon :icon="['fas', 'angle-down']" />
                                            </div>
                                        </MenuButton>
                                        <MenuItems class="absolute left-0 mt-2 w-full p-1 origin-top-right bg-white dark:bg-gray-800 dark:text-white border dark:border-gray-600 rounded-md shadow-lg z-50">
                                            <div class="py-1">
                                                <MenuItem v-for="(status, index) in condition.others" :key="index" class="mb-1 cursor-pointer">
                                                    <p @click="change_sort(condition.name, status.name)" class="block px-2 py-1 rounded-[0.2rem] hover:bg-gray-100 dark:hover:bg-gray-700 capitalize">{{ status.title }}</p>
                                                    
                                                </MenuItem>
                                                
                                                
                                            </div>
                                        </MenuItems>
                                    </Menu>
                                </div>
                                
                            </MenuItem>
                            
                            
                        </div>
                    </MenuItems>
                </Menu>
                <div class="w-full h-9 -mt-13">
                    <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="relative top-8.5 left-2 text-[var(--color_text-gray)] dark:text-gray-400" />
                    <input @input="fetchFindGoodsReceipt" type="text" placeholder="Nhập mã đơn hàng cần tìm" class="placeholder:text-sm outline-0 transition-all duration-500 text-sm w-full h-9 border-1 border-[var(--color_border)] dark:border-gray-700 py-1 mt-1 rounded-ssm pl-8 bg-white dark:bg-gray-800 text-black dark:text-gray-300" />
                </div>
            </div>
        </div>
        <div class="col-span-12 mt-3">
            <div class="grid grid-cols-17 px-2 py-3 gap-3 text-sm bg-[var(--background-color-gray)] dark:bg-gray-700 transition-all duration-500 text-black dark:text-gray-300">
                <div class="col-span-2">Mã phiếu</div>
                <div class="col-span-3">Thời gian nhập</div>
                <div class="col-span-3">Nhà cung cấp</div>
                <div class="col-span-5">Kho nhập</div>
                <div class="col-span-2">Trạng thái</div>
                <div class="col-span-2 text-right">Tổng tiền</div>
                
            </div>
            <div @scroll="handleScrollLoadData" class="h-250 overflow-y-auto custom-scrollbar">
                <div v-for="(goods ,index) in list_goods_receipt" :key="index" class="grid grid-cols-17 transition-all duration-500 cursor-pointer items-center px-2 py-3 gap-3 text-sm border-b-1 border-[var(--color_border)] dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-gray-300">
                    <router-link :to="{name: 'admin_sadboizz.cashbook.order_provider.detail_import', query: { showopt: 'shop_ad_t', index: goods?.id} }" custom v-slot="{ href, navigate, isActive }">
                        <div @click="navigate" class="col-span-2 text-blue-500 dark:text-blue-400 italic">{{ goods.code }}</div>
                    </router-link>
                    <div class="col-span-3">{{ formatDateTime(goods.created_at) }}</div>
                    <div class="col-span-3">{{ goods.provide_name }}</div>
                    <div class="col-span-4 text-blue-500 dark:text-blue-400">{{ goods.stock_name }}</div>
                    <div class="col-span-3">
                        <p :class="status_goods_receipt[goods.status]?.bg" class="transition-all duration-500  text-center  rounded-sm px-2 py-1">{{ status_goods_receipt[goods.status]?.title }}</p>
                    </div>
                    <div class="col-span-2 text-right">{{ formatMoney(goods.total) }}</div>
                    
                </div>
            </div>
            
        </div>

    </div>
    
</template>

<style scoped>

</style>