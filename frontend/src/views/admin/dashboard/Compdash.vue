<script setup>

    import ApexCharts from 'vue3-apexcharts';
    import { formatMoney  } from '@/composables'
    const store = useStore();
    
    const fetchInfoDashboard = async () => {
        const result = store.dispatch('admin/get_dashboard_information')
    }
    
    const series_debt = computed(() => [
        {
            name: "Công nợ",
            data: dashboard.value?.debts,
        },
    ]);

    const chartOptions_debt = computed(() =>   {
        return {
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
        }
        
    });
    const series_order =computed(() =>[
        {
            name: 'Số lượng nhập',
            data: dashboard.value?.order_import_export?.order_import
        },
        {
            name: 'Số lượng xuất',
            data: dashboard.value?.order_import_export?.order_export
        }
    ])
    const chartOptions_order = computed(() =>{
        return {
            chart: {
                type: 'area',
                toolbar: { show: false }
            },
            dataLabels: { enabled: false },
            stroke: { curve: 'smooth' },
            xaxis: {
                categories: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']
            },
            colors: ['#2196f3', '#ffeb3b'],
            fill: {
                type: 'gradient',
                gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.6,
                opacityTo: 0.1,
                stops: [0, 90, 100]
                }
            },
            tooltip: {
                shared: true,
                intersect: false
            }
        }
        
    })
    const series_profit = computed(() => [
        {
            name: 'Doanh thu',
            data: dashboard.value?.profits,
        }
    ])

    const chartOptions_profit = computed(() => {
        return {
            chart: {
                type: 'bar',
                toolbar: { show: false }
            },
            plotOptions: {
                bar: {
                horizontal: false,
                columnWidth: '50%',
                endingShape: 'rounded'
                }
            },
            dataLabels: { enabled: false },
            xaxis: {
                categories: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']
            },
            colors: ['#ffeb3b', '#2196f3'],
            fill: {
                opacity: 1
            },
            tooltip: {
                shared: true,
                intersect: false
            }
        }
        
    })
    const dashboard = computed(() => store.getters['admin/get_dashboard'] )
    const order_status = computed(() => store.state.admin.order.order_status )
   
    onMounted(() => {
        if(Object.keys(dashboard.value).length === 0) {
            fetchInfoDashboard()
        }
        
    })
</script>
<template>

    <div class="bg-gray-100 dark:bg-gray-800 transition-all duration-500 p-2 font-(family-name:--font-noto)">
        <div class="bg-white dark:bg-gray-900 py-2 pl-3 transition-all duration-500 border-l-5 mb-4 border-[var(--maincolor)] font-bold dark:text-gray-200">Bảng điều khiển</div>
        <div class="grid grid-cols-12 gap-5 transition-all duration-500">
            <div class="col-span-4 transition-all duration-500 bg-white dark:bg-gray-900 dark:border dark:border-gray-700 rounded">
                <div class="flex items-center p-2 h-25 gap-2">
                    <div class="bg-green-100 dark:bg-green-900 w-20 h-20 flex items-center justify-center">
                        <font-awesome-icon :icon="['fas', 'user']" class="text-2xl text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                    <p class="uppercase text-red-700 dark:text-red-400 font-bold font-(family-name:--font-madini)">Tổng khách hàng</p>
                    <p class="font-bold mb-1 dark:text-gray-300">{{ dashboard?.total_user }} khách hàng</p>
                    <p class="text-sm border-t-1 border-[var(--color_border)] dark:border-gray-700 pt-2 dark:text-gray-400">Tổng số khách hàng</p>
                    </div>
                </div>
            </div>
            <div class="col-span-4 transition-all duration-500 bg-white dark:bg-gray-900 dark:border dark:border-gray-700 rounded">
                <div class="flex items-center p-2 h-25 gap-2">
                    <div class="bg-yellow-100 dark:bg-yellow-900 w-20 h-20 flex items-center justify-center">
                        <font-awesome-icon :icon="['fas', 'users-rectangle']" class="text-2xl text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                    <p class="uppercase text-red-700 dark:text-red-400 font-bold font-(family-name:--font-madini)">Tổng nhân viên</p>
                    <p class="font-bold mb-1 dark:text-gray-300">{{ dashboard?.total_employee }} nhân viên</p>
                    <p class="text-sm border-t-1 border-[var(--color_border)] dark:border-gray-700 pt-2 dark:text-gray-400">Tổng số nhân viên</p>
                    </div>
                </div>
            </div>
            <div class="col-span-4 transition-all duration-500 bg-white dark:bg-gray-900 dark:border dark:border-gray-700 rounded">
                <div class="flex items-center p-2 h-25 gap-2">
                    <div class="bg-purple-100 dark:bg-purple-900 w-20 h-20 flex items-center justify-center">
                        <font-awesome-icon :icon="['fas', 'car-side']" class="text-2xl text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                        <p class="uppercase text-red-700 dark:text-red-400 font-bold font-(family-name:--font-madini)">Tổng nhà cung cấp</p>
                        <p class="font-bold mb-1 dark:text-gray-300">{{ dashboard?.total_provide }} nhà cung cấp</p>
                        <p class="text-sm border-t-1 border-[var(--color_border)] dark:border-gray-700 pt-2 dark:text-gray-400">Tổng số nhà cung cấp</p>
                    </div>
                </div>
            </div>
            <div class="col-span-4 transition-all duration-500 bg-white dark:bg-gray-900 dark:border dark:border-gray-700 rounded">
                <div class="flex items-center p-2 h-25 gap-2">
                    <div class="bg-blue-100 dark:bg-blue-900 w-20 h-20 flex items-center justify-center">
                        <font-awesome-icon :icon="['fas', 'database']" class="text-2xl text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <p class="uppercase text-red-700 dark:text-red-400 font-bold font-(family-name:--font-madini)">Tổng số sản phẩm</p>
                        <p class="font-bold mb-1 dark:text-gray-300">{{ dashboard?.total_product }} sản phẩm</p>
                        <p class="text-sm border-t-1 border-[var(--color_border)] dark:border-gray-700 pt-2 dark:text-gray-400">Tổng số sản phẩm quản lý </p>
                    </div>
                </div>
            </div>
            <div class="col-span-4 transition-all duration-500 bg-white dark:bg-gray-900 dark:border dark:border-gray-700 rounded">
                <div class="flex items-center p-2 h-25 gap-2">
                    <div class="bg-orange-200 dark:bg-orange-900 w-20 h-20 flex items-center justify-center">
                        <font-awesome-icon :icon="['fas', 'bag-shopping']"  class="text-2xl text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                        <p class="uppercase text-red-700 dark:text-red-400 font-bold font-(family-name:--font-madini)">Tổng đơn hàng</p>
                        <p class="font-bold mb-1 dark:text-gray-300">{{ dashboard?.total_order }} đơn hàng</p>
                        <p class="text-sm border-t-1 border-[var(--color_border)] dark:border-gray-700 pt-2 dark:text-gray-400">Tổng số đơn hàng </p>
                    </div>
                </div>
            </div>
            <div class="col-span-4 transition-all duration-500 bg-white dark:bg-gray-900 dark:border dark:border-gray-700 rounded">
                <div class="flex items-center p-2 h-25 gap-2">
                    <div class="bg-red-200 dark:bg-red-900 w-20 h-20 flex items-center justify-center">
                        <font-awesome-icon :icon="['fas', 'circle-info']" class="text-2xl text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                        <p class="uppercase text-red-700 dark:text-red-400 font-bold font-(family-name:--font-madini)">Tổng mã giảm giá</p>
                        <p class="font-bold mb-1 dark:text-gray-300">{{ dashboard?.total_voucher }} sản phẩm</p>
                        <p class="text-sm border-t-1 border-[var(--color_border)] dark:border-gray-700 pt-2 dark:text-gray-400">Tổng mã giảm giá hiện có</p>
                    </div>
                </div>
            </div>
            <div class="col-span-7 transition-all duration-500 bg-white dark:bg-gray-900 dark:border dark:border-gray-700 rounded">
                <div class="p-2">
                    <p class="border-b-3 border-[var(--maincolor)] font-bold pb-2 dark:text-gray-200">Đơn hàng mới nhất</p>
                    <div class="grid grid-cols-12 mt-5 bg-gray-300 dark:bg-gray-700 px-1 py-2 mb-2 dark:text-gray-300">
                        <div class="col-span-3">ID đơn hàng</div>
                        <div class="col-span-3">Tên khách hàng</div>
                        <div class="col-span-3 text-right">Tổng tiền </div>
                        <div class="col-span-3 text-right">Trạng thái</div>
                    </div>
                    <div v-for="(order, index) in dashboard?.orders" :key="index" class="grid grid-cols-12 px-1 py-2 border-b-1 border-[var(--color_border)] dark:border-gray-700 mt-2 dark:text-gray-300">
                        <div class="col-span-3">{{ order?.code }}</div>
                        <div class="col-span-3 capitalize">{{ order?.name_user }}</div>
                        <div class="col-span-3 text-right text-red-500 italic dark:text-red-400">{{ formatMoney(order?.total) }} </div>
                        <div class="col-span-3 text-right ">
                            <p class=" inline text-[0.7rem] rounded-ssm px-2 py-1 " :class="order_status[order?.status]?.bg">{{ order_status[order?.status]?.title }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-span-5  row-span-3">
                <div class="bg-white dark:bg-gray-900 p-2 transition-all duration-500 rounded">
                    <p class="text-lg font-semibold mb-2 dark:text-gray-200">Công nợ theo thời gian</p>
                    <ApexCharts
                        width="100%"
                        height="300"
                        :options="chartOptions_debt"
                        :series="series_debt"
                    />
                </div>
            
                <div class="bg-white dark:bg-gray-900 transition-all duration-500 p-2 mt-5 rounded">
                    <p class="text-lg font-semibold mb-2 dark:text-gray-200">Lợi nhuận</p>
                    <ApexCharts
                    type="bar"
                    width="100%"
                    height="350"
                    :options="chartOptions_profit"
                    :series="series_profit"
                    />
                </div>
            </div>
            <div class="col-span-7 transition-all duration-500 bg-white dark:bg-gray-900 dark:border dark:border-gray-700 rounded">
                <div class="p-2">
                    <p class="border-b-3 border-[var(--maincolor)] font-bold pb-2 dark:text-gray-200">Khách hàng mới</p>
                    <div class="grid grid-cols-12 mt-5 bg-gray-300 dark:bg-gray-700 px-1 py-2 mb-2 dark:text-gray-300">
                        <div class="col-span-3">ID khách hàng</div>
                        <div class="col-span-3">Tên khách hàng</div>
                        <div class="col-span-3 text-right">Ngày sinh </div>
                        <div class="col-span-3 text-right">Số điện thoại</div>
                    </div>
                    <div class="h-60 overflow-y-auto custom-scrollbar dark:text-gray-300">
                        <div v-for="(user, index) in dashboard?.users" :key="index" class="grid grid-cols-12 px-1 py-2 border-b-1 border-[var(--color_border)] dark:border-gray-700 mt-2">
                            <div class="col-span-3">{{ user?.code }}</div>
                            <div class="col-span-3 capitalize">{{ user?.name }}</div>
                            <div class="col-span-3 text-right">{{ user?.date }} </div>
                            <div class="col-span-3 text-right ">{{ user?.phone }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-span-12">
                <div class="bg-white transition-all duration-500 dark:bg-gray-900 p-2 rounded">
                    <p class="text-lg font-semibold mb-2 dark:text-gray-200">Thông kê đơn hàng</p>
                    <ApexCharts
                    type="area"
                    width="100%"
                    height="350"
                    :options="chartOptions_order"
                    :series="series_order"
                    />
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>

</style>