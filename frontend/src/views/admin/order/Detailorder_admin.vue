<script setup>
    import { order } from '@/constant';
    import { formatMoney } from '@/composables'
    import { useToast } from 'vue-toastification'
    const toast = useToast();
    const route = useRoute();
    const store = useStore()
    const id = computed(() => route.query.index);

    const order_status = computed(() => store.state.admin.order.order_status)
    const detail_orders = computed(() => store.getters['admin/order/get_list_detail_order'])
    
    const detail_order = computed(() => detail_orders.value[id.value]);
    const fetchDetailOrder = async (id) => {
        const result = await store.dispatch('admin/order/' + order.get_detail_order, id)
        if(result.ok === 'error' ){
            toast.error(result.message)
        }
    }
    const  fetchEditOrder = async (id, data) => {
        const result = await store.dispatch('admin/order/' + order.edit_order, {id: id, data: data})
        if(result.ok === 'error' ){
            toast.error(result.message)
        }
    }
    function config_class(size){
        return `row-span-${size.length}`
    }
    onMounted(() => {
        if (!detail_order.value || Object.keys(detail_order.value).length === 0) {
            fetchDetailOrder(id.value)
            console.log('CALL API')
        } else {
            console.log('Lấy trong getter') // 👉 Object có dữ liệu
        }  
    })
    const handleEditOrder = async (status) => {
        var data= {};
        if(status== 'PENDING'){
            data= {
                status: 'LOCKING'
            }
        }
        else if (status== 'LOCKING') {
            data= {
                status: 'SHIPPING'
            }
        }
        else if (status== 'CANCEL'){
            data = {
                status: 'CANCEL'
            }
        }
        fetchEditOrder(id.value, data)
        
    }
</script>

<template>
 
    <div class="bg-white dark:bg-gray-800 dark:text-white flex items-center transition-all duration-500 text-lg pl-1 border-l-5 mb-4 border-[var(--maincolor)] dark:border-[var(--dark_maincolor)] font-bold mt-2">
        <router-link :to="{name: 'admin_sadboizz.order'}">
            <font-awesome-icon :icon="['fas', 'arrow-left']"  class="mt-1 cursor-pointer text-2xl p-3 hover:text-[var(--maincolor)]  hover:scale-[1.2] transition-all duration-200  dark:text-gray-300 dark:hover:text-[var(--dark_maincolor)]" />
        </router-link>
        <p>Thông tin chi tiết của đơn hàng</p>
    </div>
    <div class="grid grid-cols-12 bg-white dark:bg-gray-800 transition-all duration-500 py-8 px-15 rounded-xl shadow-md mt-4">
        <div class="col-span-12 transition-all duration-500 mb-6 font-bold text-2xl border-b-2 pb-1 border-[var(--color_border)] dark:border-gray-700 dark:text-white">
            Mã đơn:
            <span class="ml-2 italic dark:text-gray-400">{{ detail_order?.code }}</span>
        </div>
        <div class="col-span-12 mb-2 transition-all duration-500 font-(family-name:--font-noto) dark:text-gray-300">
            <div class="border-b-2 border-[var(--color_border)]  pb-3 dark:border-gray-700">
                <h3 class="text-xl font-semibold mb-3 dark:text-white">Thông tin khách hàng</h3>
                <div class="mb-2 flex items-center">
                    <font-awesome-icon :icon="['fas', 'user']" class="dark:text-gray-400" />
                    <p class="capitalize ml-2">{{ detail_order?.name_user }}</p>
                </div>
                <div class="mb-2 italic flex items-center">
                    <font-awesome-icon :icon="['fas', 'location-dot']" class="dark:text-gray-400" />
                    <p class="ml-2">{{ detail_order?.address }}</p>
                </div>
                <div class="mb-2 flex items-center">
                    <font-awesome-icon :icon="['fas', 'phone']" class="dark:text-gray-400" />
                    <p class="ml-2">{{ detail_order?.phone }}</p>
                </div>
                <div class="mb-2 flex items-center">
                    <font-awesome-icon :icon="['fas', 'envelope']" class="dark:text-gray-400" />
                    <p class="ml-2">{{ detail_order?.email }}</p>
                </div>
            </div>
            <div class="mt-6 border-b-2 border-[var(--color_border)] pb-3 dark:border-gray-700">
                <h3 class="text-xl font-semibold mb-3 dark:text-white">Thông tin đơn hàng</h3>
                <div class="mb-2 flex items-center">
                    <p class="w-60">Tên đơn hàng:</p>
                    <p class="italic underline dark:text-gray-400">{{ detail_order?.name }}</p>
                </div>
                <div class="mb-2 flex items-center">
                    <p class="w-60">Ngày đặt hàng:</p>
                    <p class="italic underline underline-offset-4 dark:text-gray-400">{{ detail_order?.created_at }}</p>
                </div>
                <div class="mb-2 flex items-center">
                    <p class="w-60">Ngày giao hang dự kiến:</p>
                    <p class="italic underline underline-offset-4 dark:text-gray-400">{{ detail_order?.date_delivery }}</p>
                </div>
                <div class="mb-2 flex items-center italic">
                    <p class="w-60">Hình thức thanh toán: </p>
                    <p class="text-blue-500 dark:text-blue-400">{{ detail_order?.pay }}</p>
                </div>
                <div class="mb-2 flex items-center italic">
                    <p class="w-60">Mã giám giá đã dùng: </p>
                    <p class="italic text-red-500 dark:text-red-400">{{ detail_order?.discount_code }}</p>
                </div>
                <div class="mb-2 flex items-center">
                    <p class="w-60 italic">Trạng thái đơn hàng: </p>
                    <button @click="handleEditOrder(detail_order?.status)" :class="order_status[detail_order?.status]?.bg" class=" px-10 py-1 border rounded-sm hover:text-black transition-all duration-300 cursor-pointer  dark:hover:text-white">
                        {{ order_status[detail_order?.status]?.title }}
                    </button>
                    <button @click="handleEditOrder('CANCEL')" v-show="detail_order?.status == 'PENDING' || detail_order?.status == 'LOCKING'" class="bg-red-500 dark:bg-red-700 dark:text-gray-300 ml-5 px-10 py-1 border rounded-sm hover:text-black transition-all duration-300 cursor-pointer  dark:hover:text-white">
                        Huỷ đơn hàng
                    </button>
                </div>
                <div class="mb-2 flex items-center italic">
                    <p class="w-60">Đơn vị vận chuyển: </p>
                    <p class="underline dark:text-gray-400">{{ detail_order?.unit_shippng }}</p>
                </div>
                <div class="mb-2 flex items-center italic">
                    <p class="w-60">Ghi chú của khách hàng: </p>
                    <p class="dark:text-gray-300">{{ detail_order?.note }}</p>
                </div>
            </div>
        </div>
        <div class="col-span-12 border-t-2">
            <div v-for="(product, index) in detail_order?.products" :key="index" class="flex items-center gap-4 mt-4">
                <img :src="product?.img" class="w-20 h-20" alt="">
                <div class="flex flex-1 items-center justify-between ">
                    <div class="dark:text-gray-400">
                        <p>{{ product?.name }}</p>
                        <p>Size: {{ product?.size }}</p>
                        <p>Số lượng: x{{ product?.count }}</p>
                    </div>
                    <p class="dark:text-gray-300">{{ formatMoney(product?.price)  }}</p>
                </div>

            </div>
            
        </div>
        <div class="col-span-12 mt-10">
            <div class="flex border-t-1 items-center -mx-5 px-5 dark:border-gray-600">
                <p class="block w-[70%] text-right border-r-1 py-2 pr-4 dark:text-gray-300 dark:border-gray-600">Tạm tính: </p>
                <p class="block w-[30%] text-right dark:text-gray-300">{{ formatMoney(detail_order?.subtotal) }}</p>
            </div>
            <div class="flex border-t-1 items-center -mx-5 px-5 dark:border-gray-600">
                <p class="block w-[70%] text-right border-r-1 py-2 pr-4 dark:text-gray-300 dark:border-gray-600">Phí vận chuyển: </p>
                <p class="block w-[30%] text-right dark:text-gray-300"> {{ formatMoney(detail_order?.money_ship) }}</p>
            </div>
            <div class="flex border-t-1 items-center -mx-5 px-5 dark:border-gray-600">
                <p class="block w-[70%] text-right border-r-1 py-2 pr-4 dark:text-gray-300 dark:border-gray-600">Voucher từ shop: </p>
                <p class="block w-[30%] text-right dark:text-gray-300"> {{ formatMoney(detail_order?.money_discount) }}</p>
            </div>
            <div class="flex border-t-1 items-center -mx-5 px-5 dark:border-gray-600">
                <p class="block w-[70%] text-right border-r-1 py-2 pr-4 dark:text-gray-300 dark:border-gray-600">Đã thanh toán: </p>
                <p class="block w-[30%] text-right dark:text-gray-300"> {{ formatMoney(detail_order?.paid) }}</p>
            </div>
            <div class="flex border-t-1 items-center -mx-5 px-5 dark:border-gray-600">
                <p class="block w-[70%] text-right border-r-1 py-2 pr-4 dark:text-gray-300 dark:border-gray-600">Thành tiền: </p>
                <p class="block w-[30%] text-right  text-red-500 dark:text-red-800 font-bold text-xl"> {{ formatMoney(detail_order?.total) }}</p>
            </div>
        </div>
       
    </div>
</template>

<style scoped>

</style>
