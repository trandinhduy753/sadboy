<script setup>
import { accountClient } from '@/constant'
const store = useStore();
const fetchListAnnounce = async (user_id, start, end) => {
    const result = await store.dispatch('client/account/' + accountClient.get_list_announce, {user_id, start, end})
}
const handleScrollLoadData = (event) => {
    const el = event.target;
    if (Math.abs(el.scrollTop + el.clientHeight - el.scrollHeight) < 1) {
        //CALL ĐỂ THÊM DỮ LIỆU
        const start=announces.value.length;
        fetchListAnnounce(user.value?.id, start, start+5)
    }
};
const user = computed(() => store.state.client.account.user )
const announces = computed(() => store.state.client.account.announces )

onMounted(() => {
    if(announces.value.length ===0 ){
        fetchListAnnounce(user.value?.id, 0, 20)
    }
    
})
</script>

<template>
    <div class="bg-white dark:bg-gray-800 mt-5 p-6 pb-10">
        <div @scroll="handleScrollLoadData" class="mt-1 max-h-180 overflow-y-auto scrollbar-hide">
            <template v-for="(announce, index) in announces" :key="index">
                <div class="flex border-b-1 pb-3 border-[var(--colorborder)] dark:border-gray-600 mb-6">
                    <div class="w-25 h-25">
                        <img src="@/assets/images/img_discount/img_discount_view-1.webp" class="w-full h-full rounded-sm">
                    </div>
                    <div class="ml-4 mt-2">
                        <p class="font-bold text-[1.1rem] text-gray-800 dark:text-gray-100">
                            Đơn hàng được giao thành công
                        </p>
                        <p class="italic text-[var(--color_text-gray)] dark:text-gray-400">
                            Mã đơn hàng <span class="dark:text-gray-300">#SP-111110102068190</span> đã được giao đến bạn
                        </p>
                        <div class="text-[var(--color_text-gray)] dark:text-gray-500 italic underline">
                            12:20 22/10/2003
                        </div>
                    </div>
                </div>
            </template>
        </div>
        
    </div>
    
</template>

<style scoped>

</style>

