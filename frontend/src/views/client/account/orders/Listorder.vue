<script setup >
    
    import Order from '@/views/client/account/orders/orders.vue'
    import { orderClient } from '@/constant';
    const store = useStore()

    const fetchListOrder = async (user_id, page, count) => {
        const result = await store.dispatch('client/order/' + orderClient.get_list_order, {user_id, page, count })
    }
    const handleScrollLoadData = (event) => {
        const el = event.target;
        if (Math.abs(el.scrollTop + el.clientHeight - el.scrollHeight) < 1) {
            page.value++;
            fetchListOrder(user.value.id, page.value, 10)
        }
    };
    const user = computed(() => store.state.client.account.user )
    const list_order = computed(() => store.getters['client/order/get_list_order'] )
    const filter_status= (index, data) => {
        index_status.value=index
        store.commit('client/order/CHANGE_FILTER_STATUS', data) 
    }
    const status_filter = ref([
        {
            title: "Tất cả đơn hàng",
            name: ""
        },
        {
            title: "Chờ xác nhận",
            name: "PENDING"
        },
        {
            title: "Đang đóng gói",
            name: "LOCKING"
        },
        {
            title: "Đang vận chuyển",
            name: "SHIPPING"
        },
        {
            title: "Đã giao hàng",
            name: "SUCCESS"
        },
        {
            title: "Đã bị huỷ",
            name: "CANCEL"
        }
    ])
    const index_status = ref(0);
    const isCallApiOrder = computed(() => store.state.client.account.isCallApiOrder )
    const page = ref(1)
    onMounted(() => {
        if(isCallApiOrder.value) {
            fetchListOrder(user.value.id, page.value, 10)
        }
    })
    onUnmounted(() => {
        store.commit('client/account/CHANGE_CALL_API_ORDER', false)
    })
</script>

<template>
   
    <div class="bg-white dark:bg-gray-800  mt-5 p-4 pb-10 rounded-md">
        <!-- Thanh điều hướng đơn hàng -->
        <div class="flex overflow-x-scroll scrollbar-hide border-b-3 border-[var(--maincolor)] dark:border-gray-600 pb-3">
            <template v-for="(status, index) in status_filter" :key="index">
                <div @click="filter_status(index, status.name)" :class="index_status == index ? 'bg-orange-400 dark:bg-orange-900' : '' " class="hover:bg-orange-900 dark:text-gray-300 mr-4 shrink-0 py-2 px-6 cursor-pointer dark:hover:bg-orange-900">{{ status.title }}</div>
            </template>
        
        </div>

        <!-- Danh sách đơn hàng -->
        <div @scroll="handleScrollLoadData" class="mt-1 max-h-180 overflow-y-auto scrollbar-hide">
            <template v-for="(order, index) in list_order" :key="index">
                <Order :order="order" />
            </template>   
            
        </div>
    </div>
</template>

<style scoped>

</style>
