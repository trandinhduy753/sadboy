<script setup lang="ts">
    import { cash_book } from '@/constant';
    import { toMySQLTimestampLocal, getCurrentDateTime, formatMoney, getFutureDate, toMySQLDate } from '@/composables'
    const store = useStore()
   
    const isDark = computed( () => store.state.isDark);
    //cash_book.get_list_vote
    const fetchListVotes = async (date="", page) => {
        const date1 = date != "" ? date : toMySQLDate(date_votes.value);
        const result = store.dispatch('admin/cash_book/' + cash_book.get_list_votes, {date: date1, page})
    }
    const fetchLoadAllVotes = async (date) => {
        page.value++;
        const result = store.dispatch('admin/cash_book/' + cash_book.find_bill_collect_spend, {page: page.value, date, code: '', count: 10})
    }
    const fetchLoadAllOrders = async (date, start, end) => {
        const result = store.dispatch('admin/cash_book/' + cash_book.load_add_order, {date, start, end})
    }
    const loadAddVoteByCode = async (page, date, code, count) => {
        // date, code, start, count
        const result = store.dispatch('admin/cash_book/' + cash_book.find_bill_collect_spend, {page, date, code, count})
    }
    const fetchFindBillCollectSpend = async (event) => {
        find_vote.value = event.target.value.trim()
        if(find_vote.value === ""){
            const date2 = date_votes.value !== "" ? toMySQLDate(date_votes.value) : getFutureDate(0);  
            fetchListVotes(date2, page.value)
        }
        else {
            page.value=1;
            const result = await store.dispatch('admin/cash_book/' + cash_book.find_bill_collect_spend, {page: page.value, date: date.value, code: find_vote.value, count: 5})
        }   
        
    }
    
    const handleScrollLoadVotes = (event, type) => {
        const el = event.target;
        if (Math.abs(el.scrollTop + el.clientHeight - el.scrollHeight) < 1) {
            var start = 0;
            if(type == 'vote'){
                if(find_vote.value === ''){
                    start = list_vote.value.length;
                    //const date = date_votes.value ? toMySQLDate(date_votes.value) :  getFutureDate(0);
                    fetchLoadAllVotes(date.value, start, start+5)
                }
                else {
                    page.value++;
                    loadAddVoteByCode(page.value, date.value, find_vote.value, 5)
                }
                
            }
            else if (type =='order') {
                start = list_order.value.length;
                //const date = date_votes.value ? toMySQLDate(date_votes.value) :  getFutureDate(0);
                fetchLoadAllOrders(date.value, start, start+5)
            }
            
        }
    };
    //cash_book.find_bill_collect_spend
    const date_votes = ref("")
    const date = computed(() => date_votes.value ? toMySQLDate(date_votes.value) :  getFutureDate(0) );
    const change_sort = (sortby="", sort_status="") => store.commit('admin/cash_book/CHANGE_SORT_BY', {sortby, sort_status});
    const list_order = computed(() => store.getters['admin/cash_book/get_list_order'] );
    const list_vote = computed(() => store.getters['admin/cash_book/get_list_votes'] );
    const bill_collect_spend  = computed(() => store.getters['admin/cash_book/get_bill_collect_spend'] );
    const sortby=computed(() => store.state.admin.cash_book.sortby);
    const condition_sort_order = ref([
        {
            title: "Mã đơn hàng",
            name: "code"
        },
        {
            title: "Loại phiếu",
            name: "type"
        },
        {
            title: "Ngày ghi nhận",
            name: "date"
        },
        {
            title: 'Giá trị',
            name: 'money'
        }
    ])
    const find_vote = ref("")
    const page = ref(1);
    onMounted(() => {
        if(list_vote.value.length === 0 || list_order.value.length === 0) {
            fetchListVotes(getFutureDate(0), page.value)
        }
        
    })
    onUnmounted(() => {
        store.commit('admin/cash_book/CHANGE_POSITION_FIND', {start: 0, end: 0 })
    })
</script>

<template>

    <div class="flex justify-between items-center border-b-1 border-gray-300 dark:border-gray-700 pb-4 mt-2">
        <p class="text-lg font-semibold dark:text-white">Sổ Quỹ</p>
        <div class="flex gap-2">
            <div class="flex items-center cursor-pointer gap-2 border-1 bg-orange-400 hover:bg-orange-200 dark:bg-orange-600 dark:hover:bg-orange-500 border-orange-300 dark:border-orange-500 rounded-[0.2rem] px-2 py-1">
                <font-awesome-icon :icon="['fas', 'upload']" />
                <p class="dark:text-white">Xuất dữ liệu</p>
            </div>
            <router-link :to="{ name: 'admin_sadboizz.cashbook.income_spend.add_bill_collect', query: { showopt: 'shop_ad_t' } }" custom v-slot="{ href, navigate, isActive }">
                <div @click="navigate" class="bg-blue-500 text-white dark:bg-blue-700 dark:hover:bg-blue-600 px-5 py-1 cursor-pointer hover:bg-blue-300">
                    <p class="ml-1">Tạo phiếu thu</p>
                </div>
            </router-link>
            
            <router-link :to="{ name: 'admin_sadboizz.cashbook.income_spend.add_bill_spend', query: { showopt: 'shop_ad_t' } }" custom v-slot="{ href, navigate, isActive }">
                <div @click="navigate" class="bg-blue-500 text-white dark:bg-blue-700 dark:hover:bg-blue-600 px-5 py-1 cursor-pointer hover:bg-blue-300">
                    <p class="ml-1">Tạo phiếu chi</p>
                </div>
            </router-link>
        </div>
    </div>

    <div class="flex items-center mt-5 gap-5">
        <div>
            <p class="mb-1 dark:text-white">Thời gian</p>
            <div class="flex flex-col" :class="isDark ? 'dark' : 'light'">
                <VueDatePicker
                    v-model="date_votes"
                    class="dark:bg-gray-800 bg-white mt-0.5 rounded-sm dark:text-white dark:border-gray-600 transition-all duration-500"
                    @update:modelValue="fetchListVotes('', page)"
                    :enable-time-picker="false"
                    format="dd-MM-yyyy"
                    :placeholder="getFutureDate(0)"
                />
            </div>
        </div>
    </div>

    <div class="mt-5 flex justify-around items-center bg-white transition-all duration-500 dark:bg-gray-800 py-2">
        <div class="text-center">
            <p class="font-bold text-[var(--color_text-gray)] dark:text-gray-300">Số dư đầu kỳ</p>
            <p class="text-2xl font-bold text-blue-400">{{ formatMoney(bill_collect_spend?.opening_balance) }}</p>
        </div>
        <div class="text-center">
            <p class="font-bold text-[var(--color_text-gray)] dark:text-gray-300">Tổng thu</p>
            <p class="text-2xl font-bold text-green-400">+ {{ formatMoney(bill_collect_spend?.money_in) }}</p>
        </div>
        <div class="text-center">
            <p class="font-bold text-[var(--color_text-gray)] dark:text-gray-300">Tổng chi</p>
            <p class="text-2xl font-bold text-red-400">- {{ formatMoney(bill_collect_spend?.money_out) }}</p>
        </div>
        <div class="text-center">
            <p class="font-bold text-[var(--color_text-gray)] dark:text-gray-300">Lợi nhuận</p>
            <p class="text-2xl font-bold text-blue-400">{{ formatMoney(bill_collect_spend?.profitable) }}</p>
        </div>
    </div>

    <div class="grid grid-cols-12 mt-4 transition-all duration-500 bg-white dark:bg-gray-800 pb-10">
        <div class="col-span-12 border-b-1 border-[var(--color_border)] dark:border-gray-700 flex items-center gap-5 p-5">
            <Menu as="div" class="relative block text-left mr-5 ">
                <MenuButton class="w-55">
                    <div class="bg-white dark:bg-gray-800 transition-all duration-500 border-1 border-[var(--color_border)] dark:border-gray-600 p-2 rounded-sm text-left flex items-center justify-between cursor-pointer text-black dark:text-white">
                        <span>{{ sortby || '-- Điền kiện xắp xếp --'}} </span>
                        <font-awesome-icon :icon="['fas', 'angle-down']" />
                    </div>
                </MenuButton>
                <MenuItems class="absolute left-0 mt-2 w-full p-1 origin-top-right bg-white dark:bg-gray-800 dark:text-white border dark:border-gray-600 rounded-md shadow-lg z-50">
                    <div class="py-1">
                        <MenuItem v-for="(condition, index) in condition_sort_order" :key="index" class="mb-1 cursor-pointer">
                            <p @click="change_sort(condition?.name)" class="block px-2 py-1 rounded-[0.2rem] hover:bg-gray-100 dark:hover:bg-gray-700 capitalize">{{ condition.title }}</p>
                        </MenuItem>
                    </div>
                </MenuItems>
            </Menu>
            <input @input="fetchFindBillCollectSpend" type="text" name="" id="" class="flex-1 border-1 transition-all duration-500 py-2 pl-2 rounded-[0.3rem] border-[var(--color_border)] dark:border-gray-600 dark:bg-gray-700 dark:text-white outline-none" placeholder="Tìm kiếm theo mã phiếu">
        </div>
        <div class="col-span-12 mt-5">
            <div class="grid grid-cols-18 gap-3 bg-gray-100 dark:bg-gray-600 transition-all duration-500 px-5 gap-y-5 py-4 text-[var(--color_text-gray)] dark:text-gray-300">
                <div class="col-span-3">Mã phiếu</div>
                <div class="col-span-2">Loại phiếu</div>
                <div class="col-span-4 text-right">Lý do</div>
                <div class="col-span-3 text-right">Ngày ghi nhận</div>
                <div class="col-span-3 text-right">Người nộp/nhận</div>
                <div class="col-span-3 text-right">Giá trị</div>
            </div>
            <div @scroll="handleScrollLoadVotes($event, 'vote')" class="h-100 overflow-y-auto custom-scrollbar">
                <div v-for="(vote, index) in list_vote" :key="index" :class="index%2 == 0 ? '': 'bg-gray-100 dark:bg-gray-600'" class="grid grid-cols-18 gap-3 transition-all duration-500 px-5 gap-y-5 py-4 text-[var(--color_text-gray)] dark:text-gray-300">
                    <div class="col-span-3 text-blue-500 dark:text-blue-300">{{ vote?.code }}</div>
                    <div class="col-span-2 dark:text-gray-30 text-right0">{{ vote?.type }}</div>
                    <div class="col-span-4 dark:text-gray-300 text-right">{{ vote?.reason }}</div>
                    <div class="col-span-3 dark:text-gray-300 text-right ">{{ vote?.created_at}} </div>
                    <div class="col-span-3 dark:text-gray-300 text-right">{{ vote?.name }}</div>
                    <div class="col-span-3 dark:text-gray-300 text-right">{{ formatMoney(vote?.money) }}</div>
                </div>
            </div>
        </div>

        <div class="col-span-12 ">
            <p class="dark:text-white px-5 dark:bg-gray-500 rounded-ssm py-2 bg-white mt-10">Danh sách đơn hàng giao thành công</p>
            <div class="grid grid-cols-18 gap-3 mt-2 bg-gray-100 dark:bg-gray-600 transition-all duration-500 px-5 gap-y-5 py-4 text-[var(--color_text-gray)] dark:text-gray-300">
                <div class="col-span-3">Mã đơn hàng</div>
                <div class="col-span-4">Giá nhập</div>
                <div class="col-span-3">Giảm giá</div>
                <div class="col-span-4">Giá bán</div>
                <div class="col-span-4 text-right">Lợi nhuận</div>
            </div>
            <div @scroll="handleScrollLoadVotes($event, 'order')" class="h-80 overflow-y-auto custom-scrollbar">
                <template v-for="(order, index) in list_order" :key="index">
                    <div :class="index%2 == 0 ? '': 'bg-gray-100 dark:bg-gray-600'" class=" grid grid-cols-18 gap-3  transition-all duration-500 px-5 gap-y-5 py-4 text-[var(--color_text-gray)] dark:text-gray-300">
                        <div class="col-span-3 text-blue-500 dark:text-blue-300">{{ order?.code }}</div>
                        <div class="col-span-4 dark:text-gray-300">{{ formatMoney(order?.import_price) }}</div>
                        <div class="col-span-3 dark:text-gray-300">{{ formatMoney(order?.discount) }}</div>
                        <div class="col-span-4 dark:text-gray-300 "> {{ formatMoney(order?.sale_price) }} </div>
                        <div class="col-span-4 dark:text-gray-300 text-right">{{ formatMoney(order?.profit_price) }}</div>
                        
                    </div>
                </template>
                
            </div>
        </div>
        

        
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
.tab-item {
    position: relative;
}

.tab-item::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--maincolor);
    transform: scaleX(0);
    transition: transform 0.3s ease-in-out;
    transform-origin: left;
}

.tab-item.active-tab::after {
    transform: scaleX(1);
}
</style>