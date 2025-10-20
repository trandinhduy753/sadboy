<script setup>
    import { formatMoney } from '@/composables'
    const store = useStore();
    const router = useRouter();
    const detail_order = computed(() => store.state.client.order.detail_order)
    const user = computed(() => store.state.client.account.user )
    onMounted(() => {
        if (Object.keys(detail_order.value).length === 0) {
            //router.push({ name: 'cart_product' })
        }
    })
</script>

<template>
   
    <div class="dark:bg-gray-900 dark:text-gray-100 h-[100%] transition-all duration-500">
        <div class="grid grid-cols-12 max-w-7xl m-auto px-5 pt-5 gap-15 max-md:gap-0 pb-10">
            <div class="col-span-7 max-lg:col-span-12 text-gray-800 dark:text-gray-100">
                <h3 class="text-3xl font-bold">Chúng tôi đã nhận được đơn hàng của bạn</h3>
                <p class="text-2xl mt-1 italic">Mã đơn hàng của bạn là: <span class="underline">{{ detail_order?.code }}</span></p>
                <router-link :to="{name: 'account.orders.list', query: {redirect: 'bill-finish'}}">
                    <div class="bg-red-500 w-80 text-center py-2 text-white font-bold rounded-sm mt-2 cursor-pointer hover:shadow-lg hover:opacity-80 transition">
                        THEO DÕI ĐƠN HÀNG CỦA BẠN
                    </div>
                </router-link>
                <p class="mt-3 italic">Xác nhận đơn hàng của bạn đã được gửi đến 
                    <span class="underline">{{ user?.email }}</span>
                </p>
                <p class="mt-1 text-base italic">
                    <a href="" class="text-blue-700 dark:text-blue-400">Hoặc liên hệ chúng tôi để chỉnh sửa địa chỉ email của bạn</a> 
                    nếu nó không chính xác.
                </p>
                <p class="text-2xl mt-2">Phương thức vận chuyển</p>
                <p class="font-bold">Giao hàng tiểu chuẩn</p>
                <p class="text-2xl mt-2">Giao hàng đến</p>
                <p class="font-bold">
                   {{detail_order?.address}}
                </p>
                <div class="mt-5 bg-[var(--colorproduct)] dark:bg-gray-800 dark:text-gray-300 p-2 rounded">
                    <h4 class="text-2xl">Mua sắm thông minh, chất lượng đỉnh cao</h4>
                    <p>Chúng tôi luôn sử dụng nguyên vật liệu cao cấp để đảm bảo sản phẩm không chỉ bền bỉ mà còn mang lại trải nghiệm tốt nhất cho khách hàng.</p>
                </div>
                <div class="mt-5 bg-[var(--colorproduct)] dark:bg-gray-800 dark:text-gray-300 p-2 rounded">
                    <h4 class="text-2xl">Dễ dàng trả hàng, yên tâm mua sắm</h4>
                    <p>Nếu có bất kỳ vấn đề nào liên quan đến chất lượng sản phẩm, chúng tôi sẽ hỗ trợ giải quyết nhanh chóng và đảm bảo sự hài lòng.</p>
                    <a class="text-blue-700 dark:text-blue-400 mt-2 inline-block underline italic">Đọc chính sách giao hàng và trả hàng của chúng tôi</a>
                </div>
                <div class="border-2 border-dashed border-red-500 mt-10 pb-10 rounded-md">
                    <p class="-mt-3.5 ml-3 bg-white dark:bg-gray-800 w-60 text-center text-[1rem] font-bold uppercase">Cảm ơn bạn đã đặt hàng</p>
                    <p class="text-base font-semibold ml-5 mt-1 italic">Thank you. Here is your 10% discount for your next order.</p>
                    <div class="flex max-md:flex-col items-center ml-5 mt-5 max-md:justify-end">
                        <input type="text" class="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 pl-2 py-1 rounded w-80" value="DQNHDGNTC">
                        <router-link :to="{ name: 'cart_product'}">
                            <button class="max-md:w-[100%] max-md:mt-3 hover:bg-[var(--hoverred)] bg-[var(--maincolor)] dark:bg-[var(--dark_maincolor)] px-5 max-md:px-10 py-1 max-md:py-2 max-md:uppercase rounded ml-3 max-md:ml-0 text-white cursor-pointer transition">Mua ngay</button>
                        </router-link>
                        
                    </div>
                </div>
            </div>
            <div class="col-span-5 max-lg:col-span-12 mt-5 max-md:mt-5 max-lg:-mt-5">
                <template v-for="(cart, index) in detail_order?.products" :key="index">
                    <div class="bg-white dark:bg-gray-800 flex px-5 py-3 mb-4  items-center rounded-sm" >
                        <img :src="cart?.product?.img" class="w-30 h-30 rounded-ssm" alt="">
                        <div class="ml-5  flex-1">
                            <p class="font-bold text-[var(--color_text-gray)] dark:text-gray-300">{{ cart?.product?.name }}</p>
                            <div class="mt-2  ">
                                <div class="flex justify-between dark:text-gray-300  ">Số lượng : <span>{{ cart?.count }}</span></div>
                                <div class="flex justify-between dark:text-gray-300">Đơn giá: <span>{{ formatMoney(Number(cart?.price)) }}</span></div>
                                <div class="flex justify-between dark:text-gray-300">Kích thước: <span>{{ cart?.size }}</span></div>
                                <div class="flex justify-between dark:text-gray-300">Tổng tiền: <span class="text-red-500 font-bold">{{ formatMoney(Number(cart?.price * cart?.count)) }}</span> </div>
                            </div>
                        </div>
                    </div>
                </template>
                <div class="bg-white dark:bg-gray-800 px-5 py-3 rounded">
                    <p class="flex justify-between font-bold text-base mb-1">Tổng tiền hàng: <span>{{ formatMoney(detail_order?.subtotal) }}</span></p>
                    <p class="flex justify-between font-bold text-base mb-1">Phí vận chuyển: <span>{{ formatMoney(detail_order?.money_ship) }}</span></p>
                    <p class="flex justify-between font-bold text-base mb-1">Tiền voucher giảm giá: <span>{{ formatMoney(detail_order?.money_discount) }}</span></p>
                    <p class="flex justify-between font-bold text-base mb-1">Số tiền trả trước: <span>0 VNĐ</span></p>
                    <p class="flex justify-between font-bold text-base mb-1 text-red-500 dark:text-red-400">Tổng thanh toán: <span>{{ formatMoney(detail_order?.total) }}</span></p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
