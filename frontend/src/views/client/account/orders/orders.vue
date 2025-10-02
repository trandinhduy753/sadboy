<script setup>
import { truncateString } from '@/composables'
import { formatMoney } from '@/composables'
import Comment from '@/views/client/account/orders/comment.vue'
const store = useStore()
var props = defineProps({
    order: {
        type: Object,
        default: {}
    },
    
})
const order_status = computed(() => store.state.client.order.order_status )
const products = computed(() => {
    if (!props.order?.products) return [];

    if (props.order.products.length <= 2) {
        return props.order.products;
    }
    return props.order.products.slice(0, 2);
});
</script>

<template>
    <div class="mb-6 bg-gray-100 dark:bg-gray-500 p-5">
        <div class="text-end font-bold text-lg mb-2" >
            <p class="inline-block py-1 px-5 rounded-sm" :class="order_status[order?.status]?.bg">{{ order_status[order?.status]?.title }}</p> 
        </div>
        <div v-for="(product, index) in products" :key="index" class="flex  dark:border-gray-700 pb-4">
            <div class="w-35 h-25">
                <img :src="product?.img" class="w-full h-full" alt="">
            </div>
            <div class="ml-4">
                <p class="font-bold dark:text-white">{{ truncateString(product?.sort_description, 90) }}</p>
                <div class="flex justify-between items-center">
                    <div>
                        <p class="amount_product_amount dark:text-gray-300">Số lượng: <span>x{{ product?.count }}</span></p>
                        <p class="amount_product_size dark:text-gray-300">Kích thước: <span>{{ product?.size }}</span></p>
                    </div>
                    <p class="amount_product_money dark:text-gray-300">Đơn giá: <span>{{ formatMoney(product?.price) }}</span></p>
                </div>
            </div>
        </div>
       
        <div class="flex justify-between text-lg">
            <p class="dark:text-gray-100">Tổng cộng: </p>
            <p> 
                <span class="inline-block pr-4 border-r-1 dark:text-gray-100">{{ order?.count }} sản phẩm</span> 
                <span class="inline-block pl-4 text-orange-500 font-bold text-xl">{{ formatMoney(order?.total) }}</span>
            </p>
        </div>
        <div class="flex justify-start gap-5 mt-3 text-base">
            <router-link :to="{ name: 'account.orders.detail' , params: { code: order?.code } }">
                <p class="border-1 border-orange-500 dark:bg-white text-orange-500 py-1 px-4 rounded-sm cursor-pointer">
                    Chi tiết đơn hàng
                </p>
            </router-link>
        </div>
     
        <div v-if="order?.status == 'SUCCESS' " class="flex mt-5 pt-3 border-t-1 border-[var(--colorborder)] dark:border-white">
            <div class="group relative inline-block">
                <div class="relative border border-[var(--colorborder)] dark:border-gray-600  px-6 py-1.5 cursor-pointer mr-3 rounded-lg font-medium text-gray-800 dark:text-gray-200  transition-all duration-300  hover:scale-105 hover:border-emerald-500  dark:hover:border-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-800" > Mua lại <span class="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100  transition duration-500  bg-gradient-to-r from-emerald-400 to-emerald-600 dark:from-emerald-500 dark:to-emerald-700 blur-md"></span>
                </div>
            </div>

            <div class="group relative inline-block">
                <div class="relative border border-[var(--colorborder)] dark:border-gray-600  px-3 py-1.5 cursor-pointer mr-3 rounded-lg font-me text-gray-800 dark:text-gray-200  transition-all duration-300   hover:scale-105 hover:border-indigo-500  dark:hover:border-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800" >
                    Trả hàng/Hoàn tiền
                    <span class="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-indigo-400 to-indigo-600 dark:from-indigo-500 dark:to-indigo-700" ></span>
                </div>
            </div>
            <Comment :order="order">
                <div class="group relative flex-1 text-center">
                    <div class="relative z-10 bg-[var(--maincolor)] dark:bg-orange-600  py-2 px-4 rounded-md text-white font-semibold cursor-pointer transition-all duration-300   hover:scale-105 hover:bg-orange-500 dark:hover:bg-orange-700 shadow-md hover:shadow-lg" >
                        Đánh giá
                    </div>
                    <span class="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100  transition duration-500 blur-md bg-gradient-to-r from-orange-400 to-orange-600  dark:from-orange-500 dark:to-orange-700" ></span>
                </div>
            </Comment>
        </div> 
    </div>
</template>

<style scoped>

</style>

