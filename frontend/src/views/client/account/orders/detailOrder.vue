<script setup>
import { orderClient } from '@/constant'
import { formatMoney } from '@/composables'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
const store = useStore()
const route = useRoute()
const timeline = computed(() => {
  const details = detail_order.value?.status_detail ?? []
  
  if (isShowAllTime.value) {
    return details
  }

  if (details.length >= 5) {
    return details.slice(0, 5)
  }

  return details
})

//get_list_order_detail
const order_code = computed(() => route.params.code )
const fetchDetailOrder = async (user_id, order_code) => {
    const result = await store.dispatch('client/order/' + orderClient.detail_order, { user_id, order_code })
}

const detail_order = computed(() => store.getters['client/order/get_list_order_detail'][order_code.value] );
const user = computed(() => store.state.client.account.user )
const list_status = ref([
    {
        title: 'Đơn hàng đã đặt',
        icon: 'fa-solid fa-clipboard-list',
        status: 'PENDING'
    },
    {
        title: 'Đang chuẩn bị hàng',
        icon: 'fa-solid fa-money-bills',
        status: 'LOCKING'
    },
    {
        title: 'Đang giao hàng',
        icon: 'fa-solid fa-truck-fast',
        status: 'SHIPPING'
    },
    {
        title: 'Đã giao hàng',
        icon: 'fa-regular fa-star',
        status: 'SUCCESS'
    },
    {
        title: 'Đơn hàng đã bị huỷ',
        icon: 'fa-solid fa-xmark',
        status: 'CANCEL'
    },
])
const isShowAllTime = ref(false)
onMounted(() => {
    fetchDetailOrder(user.value?.id, order_code.value)
})
</script>

<template>
    <div class="grid grid-cols-12 bg-white dark:bg-gray-900 h-[100%]  dark:text-gray-100 mt-5 max-md:mt-0 p-5 font-(family-name:--font-winky)">
        <div class="col-span-12 max-md:flex-col flex justify-between max-md:justify-start items-center max-md:items-start">
            <router-link :to="{ name: 'account.orders.list'}">
                <div class="flex items-center w-45 cursor-pointer text-xl gap-2">
                    <font-awesome-icon icon="fa-solid fa-angle-left" />
                    <p>TRỞ LẠI</p>
                </div>
                
            </router-link>
            <div class="flex max-md:mt-5">
                <p class="pr-5 max-md:pr-0 border-r-2 mr-5 border-black dark:border-gray-400 dark:text-gray-200">MÃ ĐƠN HÀNG: {{ detail_order?.order_code }}</p>
                <p class="uppercase text-[var(--maincolor)] dark:text-green-400">Đơn hàng đang vận chuyển</p>
            </div>
        </div>
        <div class="col-span-12 flex justify-between mt-10">
            <div v-for="(status_sad, index) in list_status" :key="index" class="relative flex flex-col items-center justify-center">
                <template v-if="detail_order?.status === status_sad?.status">
                    <div  class="absolute w-16 h-16 rounded-full bg-gradient-to-tr 
                            from-cyan-500 via-blue-500 to-purple-600 
                            blur-2xl opacity-50 animate-pulse-slow">
                    </div>
                    <div class="absolute w-23 h-20 top-1 rounded-full border-2 border-cyan-400 
                                animate-spin-slow shadow-[0_0_20px_rgb(0,255,255)]">
                    </div>
                    <div class="absolute inset-0">
                        <span class="particle"></span>
                        <span class="particle"></span>
                        <span class="particle"></span>
                        <span class="particle"></span>
                    </div>
                </template>
                <div :class="detail_order?.status === status_sad?.status ? 'relative w-18 h-18 flex items-center justify-center rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600  shadow-[0_0_25px_rgba(0,200,255,0.9)] animate-tilt' : ''">
                    <font-awesome-icon 
                    class="text-3xl dark:text-white text-blue-500" :class="detail_order?.status === status_sad?.status ? 'drop-shadow-[0_0_15px_rgb(0,255,255)] animate-heartbeat' : ' border-1 px-4 py-3 rounded-full'"
                    :icon="status_sad?.icon" 
                    />
                </div>
                <p :class="detail_order?.status === status_sad?.status ? 'mt-4 font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 animate-scan' : 'mt-2'">
                    {{  status_sad?.title }}
                </p>
        
            </div>
            
            
        </div>
        <div class="col-span-12 bg-amber-50 -m-5 p-5 my-10 dark:bg-gray-800 dark:text-gray-200">
            Cảm ơn bạn đã mua sắm ở NTC_ORANGE
        </div>
        <div class="col-span-12 flex max-md:flex-col p-5 border-t-2 -m-5 [border-image:repeating-linear-gradient(90deg,#22c55e_0_30px,transparent_40px_50px)_1]">
            <div>
                <p class="text-2xl font-bold dark:text-gray-100">Địa Chỉ Nhận Hàng</p>
                <p class="dark:text-gray-100">{{ detail_order?.address }}</p>
            </div>
            <div class="relative p-6">
                <div v-for="(item, index) in timeline" :key="index" class="flex items-start relative">
                    <div class="flex flex-col items-center mr-4">
                        <div
                            class="w-5 h-5 rounded-full border-2 flex items-center justify-center z-10"
                            :class="item?.active ? 'bg-green-500 border-green-500' : 'bg-white dark:bg-gray-700 border-gray-400 dark:border-gray-600'"
                            >
                            <span v-if="item?.active" class="text-white text-xs">✓</span>
                        </div>
                    </div>
                    <div class="pb-4">
                        <p class="text-sm font-medium">{{ dayjs(item?.time).fromNow() }}</p>
                        <p class="font-semibold" :class="item.active ? 'text-green-600' : 'text-gray-700 dark:text-gray-300'" >
                            {{ item?.status }}
                        </p>
                        <p class="text-gray-600 text-sm">{{ item?.note }}</p>
                    </div>
                </div>
                <p v-if="!isShowAllTime" @click="isShowAllTime = true" class="text-blue-500 bg-blue-200 inline-block py-1 px-10 rounded-sm cursor-pointer dark:bg-blue-900 dark:text-blue-300">Xem thêm</p>
                <p v-else  @click="isShowAllTime = false" class="text-blue-500 bg-blue-200 inline-block py-1 px-10 rounded-sm cursor-pointer dark:bg-blue-900 dark:text-blue-300">Rút ngọn</p>
            </div>
        </div>
        <div class="col-span-12 border-t-2">
            <div v-for="(product, index) in detail_order?.products" :key="index" class="flex items-center gap-4 mt-4">
                <img :src="product?.img" class="w-20 h-20 rounded-ssm" alt="">
                <div class="flex flex-1 items-center justify-between ">
                    <div class="dark:text-gray-400">
                        <p>{{ product?.name }}</p>
                        <p>Size: {{ product.size }}</p>
                        <p>Số lượng: x{{ product?.count }}</p>
                    </div>
                    <p>{{ formatMoney(product?.price) }}</p>
                </div>

            </div>
            
        </div>
        <div class="col-span-12 mt-10">
            <div class="flex border-t-1 items-center -mx-5 px-5 dark:border-gray-600">
                <p class="block w-[70%] text-right border-r-1 py-2 pr-4 dark:border-gray-600">Tổng tiền hàng: </p>
                <p class="block w-[30%] text-right"> {{ formatMoney(detail_order?.subtotal) }} </p>
            </div>
            <div class="flex border-t-1 items-center -mx-5 px-5 dark:border-gray-600">
                <p class="block w-[70%] text-right border-r-1 py-2 pr-4 dark:border-gray-600">Phí vận chuyển: </p>
                <p class="block w-[30%] text-right"> {{ formatMoney(detail_order?.money_ship) }} </p>
            </div>
            <div class="flex border-t-1 items-center -mx-5 px-5 dark:border-gray-600">
                <p class="block w-[70%] text-right border-r-1 py-2 pr-4 dark:border-gray-600">Voucher từ shop: </p>
                <p class="block w-[30%] text-right"> {{ formatMoney(detail_order?.money_discount) }} </p>
            </div>
            <div class="flex border-t-1 items-center -mx-5 px-5 dark:border-gray-600">
                <p class="block w-[70%] text-right border-r-1 py-2 pr-4 dark:border-gray-600">Đã thanh toán: </p>
                <p class="block w-[30%] text-right"> {{ formatMoney(detail_order?.paid) }} </p>
            </div>
            <div class="flex border-t-1 items-center -mx-5 px-5 dark:border-gray-600">
                <p class="block w-[70%] text-right border-r-1 py-2 pr-4 dark:border-gray-600">Thành tiền: </p>
                <p class="block w-[30%] text-right"> {{ formatMoney(detail_order?.total) }} </p>
            </div>
        </div>
        <div class="col-span-12 border-1 border-amber-200 dark:border-amber-600 -mx-5 py-2 pl-10">
            <div class="flex items-center ">
                <font-awesome-icon class="text-yellow-500 p-2 rounded-full border-1 mr-2 border-amber-400 dark:border-amber-600" icon="fa-regular fa-bell" />
                <p>Vui lòng thanh toán <span>{{ formatMoney(Number(detail_order?.total) - Number(detail_order?.paid)  ) }}</span> khi nhận hàng</p>
            </div>
            
        </div>
        <div class="col-span-12 mt-2 items-center bg-gray-100 flex border-y-1 -mx-5 px-5 dark:bg-gray-800 dark:border-gray-600">
            <p class="block w-[70%] text-right border-r-1 py-2 pr-4 dark:border-gray-600">Phước thức thanh toán: </p>
            <p class="block w-[30%] text-right">{{ detail_order?.pay }}</p>
        </div>
    </div>
</template>

<style scoped>
@keyframes spin-slow {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.animate-spin-slow { animation: spin-slow 12s linear infinite; }

@keyframes pulse-slow {
  0%,100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.2); opacity: 1; }
}
.animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  25% { transform: scale(1.25); }
  50% { transform: scale(0.9); }
  75% { transform: scale(1.1); }
}
.animate-heartbeat { animation: heartbeat 2s ease-in-out infinite; }

@keyframes tilt {
  0%,100% { transform: rotate3d(1, 1, 0, 10deg); }
  50% { transform: rotate3d(-1, -1, 0, 10deg); }
}
.animate-tilt { animation: tilt 8s ease-in-out infinite; }

/* Particles */
.particle {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 6px;
  height: 6px;
  background: cyan;
  border-radius: 50%;
  opacity: 0.8;
  animation: particle-float 4s linear infinite;
}
.particle:nth-child(2) {
  left: 30%; width: 4px; height: 4px; animation-duration: 3.5s;
}
.particle:nth-child(3) {
  left: 70%; width: 5px; height: 5px; animation-duration: 5s;
}
.particle:nth-child(4) {
  left: 40%; width: 3px; height: 3px; animation-duration: 4.5s;
}

@keyframes particle-float {
  0% { transform: translateY(0) scale(1); opacity: 1; }
  100% { transform: translateY(-120px) scale(0.5); opacity: 0; }
}

/* Text scan neon */
@keyframes scan {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.animate-scan {
  background-size: 200% auto;
  animation: scan 6s linear infinite;
}

</style>

