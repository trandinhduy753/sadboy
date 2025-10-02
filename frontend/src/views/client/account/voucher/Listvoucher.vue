<script setup>
    import { accountClient } from '@/constant'
    const store = useStore()
    const fetchListVouchers = async (user_id, start, end) => {
        const result  = await store.dispatch('client/account/'+ accountClient.get_list_voucher, {user_id, start, end})
    }
    const handleScrollLoadData = (event) => {
        const el = event.target;
        if (Math.abs(el.scrollTop + el.clientHeight - el.scrollHeight) < 1) {
            //CALL ĐỂ THÊM DỮ LIỆU
            const start=vouchers.value.length;
            fetchListVouchers(user.value.id, start, start+5)
        }
    };
    const user = computed(() => store.state.client.account.user )
    const vouchers = computed(() => store.state.client.account.vouchers)
    onMounted(() => {
        if(vouchers.value.length ===0 ) {
            fetchListVouchers(user.value.id, 0, 20)
        }
        
    })

</script>

<template>
    <div class="bg-white dark:bg-gray-800 mt-5 p-6 pb-10 gap-5" >
        <div @scroll="handleScrollLoadData" class="grid grid-cols-12 gap-5 mt-1 max-h-180 overflow-y-auto scrollbar-hide">
            <template v-for="(voucher, index) in  vouchers" :key="index">
                <div class="col-span-6 flex mb-3 border-b-1 border-[var(--color_border)] dark:border-gray-600 pb-3">
                    <div class="w-25 h-25">
                        <img src="@/assets/images/img_discount/img_discount_view-1.webp" class="w-full h-full rounded-sm">
                    </div>
                    <div class="ml-4 -mt-1">
                        <p class="font-bold text-[1.1rem] dark:text-gray-100">Giảm 10% cho giá trị đơn hàng của bạn</p>
                        <p class="italic text-[var(--color_text-gray)] dark:text-gray-400">
                            Mã giảm giá: <span class="dark:text-gray-300 underline underline-offset-2">ACDFTDE</span>
                        </p>
                        <p class="italic text-[var(--color_text-gray)] dark:text-gray-400">
                            Sô lượt sử dụng còn lại: <span class="dark:text-gray-300 underline underline-offset-2">4</span>
                        </p>
                        <div class="flex items-center text-[var(--color_text-gray)] dark:text-gray-400 italic">
                            <font-awesome-icon :icon="['far', 'clock']" />
                            <p class="ml-1">Có hiệu lực đến ngày: 22-04-2024</p>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<style scoped>

</style>

