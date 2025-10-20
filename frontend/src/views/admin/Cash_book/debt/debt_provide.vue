<script setup>
    import { formatDateTime, toMySQLDate, formatMoney, getCurrentDateTime, toMySQLTimestampLocal } from '@/composables'
    import ApexCharts from 'vue3-apexcharts';
    import { cash_book } from '@/constant'
    import { optionFindProvide } from '@/composables'
    import { useToast } from 'vue-toastification'
    const toast = useToast();
    const store = useStore()
    const {
        fetchListProvide,
        fetchFindProvide,
        load_add_provides
    } = optionFindProvide()

    const fetchDebtProvideInfo = async (date="") => {
        const date1 = date != "" ? date : toMySQLTimestampLocal(date_debt.value);
        const result = await store.dispatch('admin/cash_book/' + cash_book.get_debt_provide, date1 )
        if(result.ok === 'error' ){
            toast.error(result.message)
        }
    }
   
    const series_money = computed(() => [
        {
            name: "Công nợ",
            data: debt_provide_info.value.debt,
        },
    ]);
    const chartOptions_money = {
        chart: {
        type: "bar",
        toolbar: { show: false },
        },
        plotOptions: {
        bar: {
            borderRadius: 4,
            horizontal: false,
            columnWidth: "50%",
        },
        },
        dataLabels: {
        enabled: false,
        },
        tooltip: {
        enabled: true,
        y: {
            formatter: (val) => `${val} triệu VNĐ`
        }
        },
        xaxis: {
        categories: ["T1", "T2", "T3", "T4", "T5","T6","T7","T8","T9","T10","T11","T12"],
        },
        colors: ["#3B82F6"],
    };
    const series_order = computed( () => [
        {
            name: 'Đơn hàng',
            data: debt_provide_info.value.order,
        },
    ]);
    const chartOptions_order = ref({
        chart: {
        type: 'line',
        toolbar: {
            show: false,
        },
        zoom: {
            enabled: false,
        },
        },
        stroke: {
        curve: 'smooth',
        width: 2,
        colors: ['orange'],
        },
        markers: {
        size: 0,
        },
        tooltip: {
        enabled: true,
        x: {
            show: false,
        },
        y: {
            formatter: function (val) {
            return val;
            },
        },
        },
        grid: {
        show: false,
        },
        xaxis: {
        show: false,
        },
        yaxis: {
        show: false,
        },
    });
    
    const handle_change_show_comp = (data) => store.dispatch('change_show_comp', data)
    const debt_provide_info = computed(() => store.getters['admin/cash_book/get_debt_provide_info'] );
    const list_provide = computed(() => store.getters['admin/provide/get_list_provide_root'] );
    const change_sort = (sortby) => store.commit('admin/provide/CHANGE_SORT_BY', sortby);
    const sortby = computed(() => store.state.admin.cash_book.sortby);
    const date_debt = ref("")
    const condition_sort = ref([
        {
            title: "Tên NCC",
            name: "name",
            others: []
        },
        {
            title: "Tổng nợ",
            name: "money_total",
            others: []
        },
        {
            title: "Nợ phát sinh",
            name: "arises",
            others: []
        },
        {
            title: "Nợ đã trả",
            name: "paid",
            others: []
        },
        {
            title: "Nợ còn lại",
            name: "money_still",
            others: []
        }
    ])
    const find_provide_debt = ref("");
    const isCallApiDebt = computed(() => store.state.admin.cash_book.isCallApiDebt )
    onMounted(async () => {
        if(isCallApiDebt.value == true) {
            const [products, orders] = await Promise.all([
                fetchListProvide(0, 20),
                fetchDebtProvideInfo(getCurrentDateTime())
            ]);

            
        }  
    })
    onUnmounted(() => {
        store.commit('admin/cash_book/CHANGE_CALL_API_DEBT_PROVIDE', false)
    })
</script>

<template>

    <div class="grid grid-cols-12 gap-5 pt-3">
        <div class="col-span-4">
            <p class="text-2xl text-black dark:text-gray-300">Công nợ nhà cung cấp</p>
            <div class="mt-5">
                <p class="mb-1 text-black dark:text-gray-300">Thời gian</p>
                <VueDatePicker
                    class="dark:bg-gray-800 transition-all duration-500 bg-white mt-1 rounded-sm dark:text-white"
                    v-model="date_debt"
                    :enable-time-picker="false"
                    format="dd-MM-yyyy HH:mm:ss"
                    @update:modelValue="fetchDebtProvideInfo('',0, 20)"
                    :placeholder="getCurrentDateTime()"
                />
            </div>
        </div>

        <div class="col-span-12">
            <div class="flex items-center bg-white dark:bg-gray-800 transition-all duration-500 px-2 py-3">
                <p class="pb-2 border-b-2 border-[var(--maincolor)] mr-10 text-black dark:text-gray-300">Nhà cung cấp</p>
                <p @click="handle_change_show_comp('debt_ship')" class="pb-2 cursor-pointer border-[var(--maincolor)] mr-10 text-black dark:text-gray-300">Nhà vận chuyển</p>
            </div>
        </div>

        <div class="col-span-12 bg-white dark:bg-gray-800 transition-all duration-500 py-5">
            <div class="grid grid-cols-12">
                <div class="col-span-3 text-center">
                    <p class="font-bold text-[var(--color_text-gray)] dark:text-gray-300">Nợ phải trả đầu kỳ</p>
                    <p class="text-xl font-bold text-blue-400">{{ formatMoney(debt_provide_info?.initial_debt) }}</p>
                </div>
                <div class="col-span-3 text-center">
                    <p class="font-bold text-[var(--color_text-gray)] dark:text-gray-300">Nợ phát sinh</p>
                    <p class="text-xl font-bold text-red-400">+ {{ formatMoney(debt_provide_info?.debt_arises) }}</p>
                </div>
                <div class="col-span-3 text-center">
                    <p class="font-bold text-[var(--color_text-gray)] dark:text-gray-300">Nợ đã trả</p>
                    <p class="text-xl font-bold text-green-400">- {{ formatMoney(debt_provide_info?.debt_paid) }}</p>
                </div>
                <div class="col-span-3 text-center">
                    <p class="font-bold text-[var(--color_text-gray)] dark:text-gray-300">Nợ phải trả cuối kỳ</p>
                    <p class="text-xl font-bold text-blue-400">{{ formatMoney(debt_provide_info?.debt_final) }}</p>
                </div>
            </div>
        </div>

        <div class="col-span-7 bg-white dark:bg-gray-800 transition-all duration-500 px-5 py-3">
            <p class="text-lg font-semibold mb-2 text-black dark:text-gray-300">Công nợ theo thời gian</p>
            <ApexCharts
                width="100%"
                height="200"
                :options="chartOptions_money"
                :series="series_money"
            />
        </div>

        <div class="col-span-5 bg-white dark:bg-gray-800 transition-all duration-500 px-5 py-3">
            <p class="text-lg font-semibold mb-2 text-black dark:text-gray-300">Đơn hàng nhập theo thời gian</p>
            <ApexCharts type="line" :options="chartOptions_order" :series="series_order"></ApexCharts>
        </div>

        <div class="col-span-12 px-5 bg-white dark:bg-gray-800 transition-all duration-500 mt-5 py-5">
            <div class="border-b-2 border-[var(--maincolor)] pb-2 text-black dark:text-gray-300">Danh sách</div>
            <div class="mt-5 flex items-center justify-between">
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
                                <p v-if="condition.others.length == 0" @click="change_sort(condition.name)" class="block px-2 py-1 rounded-[0.2rem] hover:bg-gray-100 dark:hover:bg-gray-700 capitalize">{{ condition.title }}</p>
                            </MenuItem>
                        </div>
                    </MenuItems>
                </Menu>
                <div class="w-full ml-3">
                    <input v-model="find_provide_debt" @input="fetchFindProvide($event)" type="text"  class="border transition-all duration-500 border-[var(--color_border)] dark:border-gray-700 w-full rounded-[0.2rem] pl-2 py-2 text-sm bg-white dark:bg-gray-800 text-black dark:text-gray-300"  placeholder="Tìm kiếm nhà cung cấp" >
                </div>
            </div>

            <div class="grid grid-cols-17 gap-2 text-sm mt-5 text-black bg-gray-100 dark:bg-gray-700 py-4 px-2 dark:text-gray-300">
                <div class="col-span-5">Tên nhà cung cấp</div>
                <div class="col-span-3 text-right">Tổng nợ</div>
                <div class="col-span-3 text-right">Nợ phát sinh</div>
                <div class="col-span-3 text-right">Nợ đã trả</div>
                <div class="col-span-3 text-right">Nợ còn lại</div>
            </div>
            <div @scroll="load_add_provides" class="max-h-100 overflow-y-auto ">
                <div v-for="(provide, index) in list_provide" :key="index" :class="index %2 == 0 ? '' : 'bg-gray-100 dark:bg-gray-700'" class="grid grid-cols-17 gap-2 text-sm py-4 px-2 transition-all duration-500 "  >
                    <router-link :to="{name: 'admin_sadboizz.cashbook.debt.detail.provide', query: { showopt: 'shop_ad_t', index: provide?.id} }" custom v-slot="{ href, navigate, isActive }">
                        <div @click="navigate" class="col-span-5 text-blue-500 dark:text-blue-400 cursor-pointer">{{ provide?.name }}</div>
                    </router-link>
                    <div class="col-span-3 text-right text-blue-700 dark:text-blue-400">{{ formatMoney(provide?.initial_debt) }}1</div>
                    <div class="col-span-3 text-right text-red-500 dark:text-red-400">{{ formatMoney(provide?.debt_arises) }}</div>
                    <div class="col-span-3 text-right text-green-500 dark:text-green-400">{{ formatMoney(provide?.debt_paid) }}</div>
                    <div class="col-span-3 text-right text-blue-700 dark:text-blue-400">{{ formatMoney(provide?.debt_final) }}</div>
                </div>
            </div>
            <!-- chẵn trắng, lẻ xám -->
            
        </div>

    </div>
  
</template>

<style scoped>

</style>
